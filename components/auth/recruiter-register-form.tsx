"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { buttonClasses } from "@/components/ui/button";
import { registerRecruiter } from "@/app/recruiter/register/actions";

const FIELD_CLASS =
  "w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500";

const LABEL_CLASS = "block text-sm font-medium text-neutral-700";

export function RecruiterRegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    if (formData.get("password") !== formData.get("confirmPassword")) {
      setError("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      const result = await registerRecruiter(formData);
      if (result.error) {
        setError(result.error);
        return;
      }

      const email = String(formData.get("email"));
      const password = String(formData.get("password"));
      const signInResult = await signIn("recruiter", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        router.push("/recruiter/login?registered=1");
        return;
      }

      router.push("/recruiter/dashboard");
      router.refresh();
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
          <label htmlFor="companyName" className={LABEL_CLASS}>
            Company Name
          </label>
          <input id="companyName" name="companyName" required className={FIELD_CLASS} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contactPersonName" className={LABEL_CLASS}>
            Contact Person Name
          </label>
          <input
            id="contactPersonName"
            name="contactPersonName"
            required
            className={FIELD_CLASS}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className={LABEL_CLASS}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={FIELD_CLASS} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="phone" className={LABEL_CLASS}>
            Phone
          </label>
          <input id="phone" name="phone" required className={FIELD_CLASS} />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="industry" className={LABEL_CLASS}>
          Industry <span className="text-neutral-400">(optional)</span>
        </label>
        <input
          id="industry"
          name="industry"
          placeholder="e.g. Oil & Gas, Construction, Logistics"
          className={FIELD_CLASS}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="password" className={LABEL_CLASS}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className={FIELD_CLASS}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className={LABEL_CLASS}>
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
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
        className={buttonClasses({ size: "lg", className: "w-full" })}
      >
        {isPending ? "Creating account…" : "Create Recruiter Account"}
      </button>
    </form>
  );
}
