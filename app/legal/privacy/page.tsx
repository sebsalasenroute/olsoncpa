import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Olson & Company website visitors and calculator users.",
  path: "/legal/privacy"
});

export default function PrivacyPage() {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h1 className="text-3xl font-semibold text-slate-900">Privacy Policy</h1>
      <div className="mt-4 space-y-4 text-sm text-slate-700">
        <p>
          Olson & Company collects only the information needed to respond to inquiries and provide accounting services.
        </p>
        <p>
          Calculator inputs are processed in your browser for estimate purposes. Do not submit sensitive personal
          information through website forms unless specifically requested through secure channels.
        </p>
        <p>
          We may update this policy as services evolve. Contact our office for questions regarding privacy practices.
        </p>
      </div>
    </article>
  );
}
