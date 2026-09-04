"use client";

import { useState, useTransition } from "react";
import { buttonClasses } from "@/components/ui/button";
import { JOB_TYPE_OPTIONS } from "@/lib/jobs";
import { submitHiringRequest } from "@/app/recruiter/dashboard/actions";

const FIELD_CLASS =
  "w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500";

const LABEL_CLASS = "block text-sm font-medium text-neutral-700";

export function HiringRequestForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitHiringRequest(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="department" className={LABEL_CLASS}>
            Department
          </label>
          <input
            id="department"
            name="department"
            required
            placeholder="e.g. Logistics"
            className={FIELD_CLASS}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="roleTitle" className={LABEL_CLASS}>
            Role Title
          </label>
          <input
            id="roleTitle"
            name="roleTitle"
            required
            placeholder="e.g. Warehouse Supervisor"
            className={FIELD_CLASS}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="numberOfPositions" className={LABEL_CLASS}>
            Number of Positions Needed
          </label>
          <input
            id="numberOfPositions"
            name="numberOfPositions"
            type="number"
            min={1}
            required
            defaultValue={1}
            className={FIELD_CLASS}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="jobType" className={LABEL_CLASS}>
            Job Type
          </label>
          <select id="jobType" name="jobType" required className={FIELD_CLASS}>
            {JOB_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="experienceRequired" className={LABEL_CLASS}>
            Experience Required
          </label>
          <input
            id="experienceRequired"
            name="experienceRequired"
            required
            placeholder="e.g. 5+ years"
            className={FIELD_CLASS}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="preferredStartDate" className={LABEL_CLASS}>
            Preferred Start Date <span className="text-neutral-400">(optional)</span>
          </label>
          <input
            id="preferredStartDate"
            name="preferredStartDate"
            type="date"
            className={FIELD_CLASS}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="additionalNotes" className={LABEL_CLASS}>
          Additional Notes <span className="text-neutral-400">(optional)</span>
        </label>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          rows={4}
          placeholder="Anything else we should know about this role?"
          className={FIELD_CLASS}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={buttonClasses({ size: "lg", className: "w-full sm:w-auto" })}
      >
        {isPending ? "Submitting…" : "Submit Request"}
      </button>
    </form>
  );
}
