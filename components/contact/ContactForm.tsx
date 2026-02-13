"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string; // honeypot
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  company: ""
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setFeedback("Please complete name, email, and message.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Unable to send your request.");
      }

      setStatus("success");
      setFeedback("Thanks. Your request was sent successfully. We will respond shortly.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Unable to send your request.");
    }
  };

  return (
    <form className="mt-6 space-y-3" aria-label="Contact form" onSubmit={onSubmit} noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="contact-name">
          Name
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
        </label>
        <label className="text-sm font-medium text-slate-700" htmlFor="contact-email">
          Email
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
        </label>
      </div>

      <label className="text-sm font-medium text-slate-700" htmlFor="contact-phone">
        Phone
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          value={form.phone}
          onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
        />
      </label>

      <label className="text-sm font-medium text-slate-700" htmlFor="contact-message">
        Message
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          className="mt-1 h-32 w-full rounded-md border border-slate-300 px-3 py-2"
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
        />
      </label>

      <label className="sr-only" aria-hidden="true" htmlFor="contact-company">
        Company
      </label>
      <input
        id="contact-company"
        name="company"
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={form.company}
        onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="tap-target inline-flex min-w-[12rem] items-center justify-center rounded-md bg-sky-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Submit Request"}
      </button>

      {feedback ? (
        <p
          className={`text-sm ${status === "success" ? "text-emerald-700" : "text-rose-700"}`}
          role="status"
          aria-live="polite"
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
