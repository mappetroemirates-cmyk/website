"use client";

import { useState, useTransition } from "react";
import { CheckCircle2 } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { updateCandidateProfile } from "@/app/(candidate)/dashboard/settings/actions";
import type { Candidate } from "@prisma/client";

const FIELD_CLASS =
  "w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500";

const LABEL_CLASS = "block text-sm font-medium text-neutral-700";

export function ProfileSettingsForm({ candidate }: { candidate: Candidate }) {
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateCandidateProfile(formData);
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
          {candidate.fullName.charAt(0).toUpperCase()}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="profilePhoto" className={LABEL_CLASS}>
            Profile Photo
          </label>
          <input
            id="profilePhoto"
            name="profilePhoto"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="text-sm text-neutral-600 file:mr-3 file:rounded file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-700"
          />
          <p className="text-xs text-neutral-400">JPEG, PNG, or WebP, up to 2MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="fullName" className={LABEL_CLASS}>
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            defaultValue={candidate.fullName}
            className={FIELD_CLASS}
          />
        </div>
        <div className="space-y-1.5">
          <label className={LABEL_CLASS}>Email</label>
          <input
            value={candidate.email}
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
            defaultValue={candidate.phone ?? ""}
            className={FIELD_CLASS}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="location" className={LABEL_CLASS}>
            Location
          </label>
          <input
            id="location"
            name="location"
            required
            defaultValue={candidate.location ?? ""}
            className={FIELD_CLASS}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="education" className={LABEL_CLASS}>
          Education
        </label>
        <textarea
          id="education"
          name="education"
          required
          rows={2}
          defaultValue={candidate.education ?? ""}
          className={FIELD_CLASS}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="workExperience" className={LABEL_CLASS}>
          Work Experience
        </label>
        <textarea
          id="workExperience"
          name="workExperience"
          required
          rows={3}
          defaultValue={candidate.workExperience ?? ""}
          className={FIELD_CLASS}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="skills" className={LABEL_CLASS}>
          Skills
        </label>
        <textarea
          id="skills"
          name="skills"
          required
          rows={2}
          defaultValue={candidate.skills ?? ""}
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
