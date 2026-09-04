"use client";

import { useState, useTransition } from "react";
import { CheckCircle2 } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import type { SettingsFormState } from "@/app/(candidate)/dashboard/settings/actions";

const FIELD_CLASS =
  "w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500";

const LABEL_CLASS = "block text-sm font-medium text-neutral-700";

export function ChangePasswordForm({
  action,
}: {
  action: (formData: FormData) => Promise<SettingsFormState>;
}) {
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await action(formData);
      if (result.error) {
        setStatus("error");
        setError(result.error);
        return;
      }
      setStatus("saved");
      setError(null);
      form.reset();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "saved" && (
        <div className="flex items-center gap-2 rounded-md border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          Password updated.
        </div>
      )}
      {status === "error" && error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="currentPassword" className={LABEL_CLASS}>
          Current Password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          className={FIELD_CLASS}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="newPassword" className={LABEL_CLASS}>
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            required
            minLength={8}
            className={FIELD_CLASS}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="confirmNewPassword" className={LABEL_CLASS}>
            Confirm New Password
          </label>
          <input
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            required
            minLength={8}
            className={FIELD_CLASS}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={buttonClasses({ variant: "outline", className: "w-full sm:w-auto" })}
      >
        {isPending ? "Updating…" : "Change Password"}
      </button>
    </form>
  );
}
