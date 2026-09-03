"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { buttonClasses } from "@/components/ui/button";
import { registerCandidate } from "@/app/(candidate)/register/actions";

const FIELD_CLASS =
  "w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500";

const LABEL_CLASS = "block text-sm font-medium text-neutral-700";

export function RegisterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (formData.get("password") !== formData.get("confirmPassword")) {
      setError("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      const result = await registerCandidate(formData);
      if (result.error) {
        setError(result.error);
        return;
      }

      const email = String(formData.get("email"));
      const password = String(formData.get("password"));
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        router.push("/login?registered=1");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="fullName" className={LABEL_CLASS}>
            Full Name
          </label>
          <input id="fullName" name="fullName" required className={FIELD_CLASS} />
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
        <div className="space-y-1.5">
          <label htmlFor="location" className={LABEL_CLASS}>
            Location
          </label>
          <input id="location" name="location" required className={FIELD_CLASS} />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="education" className={LABEL_CLASS}>
          Education
        </label>
        <textarea id="education" name="education" required rows={2} className={FIELD_CLASS} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="workExperience" className={LABEL_CLASS}>
          Work Experience
        </label>
        <textarea id="workExperience" name="workExperience" required rows={3} className={FIELD_CLASS} />
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
          placeholder="Comma-separated list"
          className={FIELD_CLASS}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="resume" className={LABEL_CLASS}>
            Resume / CV
          </label>
          <input
            id="resume"
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx"
            className={`${FIELD_CLASS} file:mr-3 file:rounded file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-700`}
          />
          <p className="text-xs text-neutral-400">PDF or Word, up to 5MB.</p>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="profilePhoto" className={LABEL_CLASS}>
            Profile Photo
          </label>
          <input
            id="profilePhoto"
            name="profilePhoto"
            type="file"
            required
            accept="image/jpeg,image/png,image/webp"
            className={`${FIELD_CLASS} file:mr-3 file:rounded file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-700`}
          />
          <p className="text-xs text-neutral-400">JPEG, PNG, or WebP, up to 2MB.</p>
        </div>
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
        {isPending ? "Creating account…" : "Create Account"}
      </button>
    </form>
  );
}
