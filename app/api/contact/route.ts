import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/lib/site";

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_CONTENT_LENGTH = 20_000;

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(10).max(4_000),
  company: z.string().trim().max(120).optional().default("")
});

const globalStore = globalThis as typeof globalThis & {
  __olsonContactRate?: Map<string, RateLimitRecord>;
};

const contactRateStore = globalStore.__olsonContactRate ?? new Map<string, RateLimitRecord>();
globalStore.__olsonContactRate = contactRateStore;

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  return realIp?.trim() || "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const current = contactRateStore.get(ip);

  if (!current || now > current.resetAt) {
    contactRateStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return false;
  }

  current.count += 1;
  contactRateStore.set(ip, current);
  return true;
}

function buildAllowedOrigins() {
  const origins = new Set([siteConfig.url, "http://localhost:3000", "http://127.0.0.1:3000"]);
  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }
  return origins;
}

function hasAllowedOrigin(request: NextRequest) {
  const allowedOrigins = buildAllowedOrigins();
  const origin = request.headers.get("origin");
  if (origin) {
    return allowedOrigins.has(origin);
  }

  const referer = request.headers.get("referer");
  if (referer) {
    for (const allowedOrigin of allowedOrigins) {
      if (referer.startsWith(`${allowedOrigin}/`) || referer === allowedOrigin) {
        return true;
      }
    }
  }

  return false;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  const declaredLength = Number(request.headers.get("content-length") ?? 0);

  if (!contentType.includes("application/json")) {
    return NextResponse.json({ message: "Unsupported content type." }, { status: 415 });
  }

  if (declaredLength > MAX_CONTENT_LENGTH) {
    return NextResponse.json({ message: "Request body is too large." }, { status: 413 });
  }

  if (!hasAllowedOrigin(request)) {
    return NextResponse.json({ message: "Origin not allowed." }, { status: 403 });
  }

  const ip = getClientIp(request);

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
  }

  let rawPayload: unknown;

  try {
    rawPayload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const parsedPayload = contactSchema.safeParse(rawPayload);
  if (!parsedPayload.success) {
    return NextResponse.json({ message: "Please check your form fields and try again." }, { status: 400 });
  }

  const payload = parsedPayload.data;

  if (payload.company && payload.company.trim().length > 0) {
    return NextResponse.json({ message: "Request ignored." }, { status: 200 });
  }

  const name = payload.name;
  const email = payload.email.toLowerCase();
  const phone = payload.phone;
  const message = payload.message;

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_TO_EMAIL;
  const contactFrom = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !contactTo || !contactFrom) {
    return NextResponse.json(
      { message: "Contact service is not configured yet. Please call our office directly." },
      { status: 503 }
    );
  }

  const subject = `New contact request from ${name}`;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Not provided");
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const html = `
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Phone:</strong> ${safePhone}</p>
    <p><strong>Message:</strong><br />${safeMessage}</p>
    <p><strong>IP:</strong> ${escapeHtml(ip)}</p>
  `;

  const text = `New Contact Request\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nIP: ${ip}\n\nMessage:\n${message}`;

  let resendResponse: Response;

  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(8_000),
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: contactFrom,
        to: [contactTo],
        reply_to: email,
        subject,
        html,
        text
      })
    });
  } catch {
    return NextResponse.json({ message: "Unable to send your request at this time." }, { status: 502 });
  }

  if (!resendResponse.ok) {
    return NextResponse.json({ message: "Unable to send your request at this time." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
