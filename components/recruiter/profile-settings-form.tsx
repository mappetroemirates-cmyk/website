"use client";

import { useState, useTransition } from "react";
import { CheckCircle2 } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { updateRecruiterProfile } from "@/app/recruiter/dashboard/settings/actions";
import type { Recruiter } from "@prisma/client";

const FIELD_CLASS =
  "w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500";

const LABEL_CLASS = "block text-sm font-medium text-neutral-700";

export function RecruiterProfileSettingsForm({ recruiter }: { recruiter: Recruiter }) {
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateRecruiterProfile(formData);
      if (result.error) {
        setStatus("error");
        setError(result.error);
        return;
      }
      setStatus("saved");
      setError(null);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "saved" && (
        <div className="flex items-center gap-2 rounded-md border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          Profile updated.
        </div>
      )}
      {status === "error" && error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 text-lg font-semibold text-neutral-500">
          {recruiter.companyName.charAt(0).toUpperCase()}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="logo" className={LABEL_CLASS}>
            Company Logo
          </label>
          <input
            id="logo"
            name="logo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="text-sm text-neutral-600 file:mr-3 file:rounded file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-700"
          />
          <p className="text-xs text-neutral-400">JPEG, PNG, or WebP, up to 2MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="companyName" className={LABEL_CLASS}>
            Company Name
          </label>
          <input
            id="companyName"
            name="companyName"
            required
            defaultValue={recruiter.companyName}
            className={FIELD_CLASS}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contactPersonName" className={LABEL_CLASS}>
            Contact Person Name
          </label>
          <input
            id="contactPersonName"
            name="contactPersonName"
            required
            defaultValue={recruiter.contactPersonName}
            className={FIELD_CLASS}
          />
        </div>
        <div className="space-y-1.5">
          <label className={LABEL_CLASS}>Email</label>
          <input
            value={recruiter.email}
            disabled
            className={`${FIELD_CLASS} cursor-not-allowed bg-neutral-50 text-neutral-400`}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="phone" className={LABEL_CLASS}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            required
            defaultValue={recruiter.phone}
            className={FIELD_CLASS}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="industry" className={LABEL_CLASS}>
          Industry <span className="text-neutral-400">(optional)</span>
        </label>
        <input
          id="industry"
          name="industry"
          defaultValue={recruiter.industry ?? ""}
          className={FIELD_CLASS}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={buttonClasses({ className: "w-full sm:w-auto" })}
      >
        {isPending ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
