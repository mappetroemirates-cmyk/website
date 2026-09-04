"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { submitContactMessage } from "@/app/(public)/contact/actions";

const FIELD_CLASS =
  "mt-1 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await submitContactMessage(formData);
      if (result.error) {
        setStatus("error");
        setError(result.error);
        return;
      }
      setStatus("sent");
      setError(null);
      form.reset();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {status === "sent" && (
        <div className="rounded-md border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-700">
          Thanks — your message has been sent. We&apos;ll get back to you soon.
        </div>
      )}
      {status === "error" && error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700">Name</label>
        <input name="name" type="text" required placeholder="Your name" className={FIELD_CLASS} />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={FIELD_CLASS}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Message</label>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="How can we help?"
          className={FIELD_CLASS}
        />
      </div>
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
