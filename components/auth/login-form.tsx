"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { buttonClasses } from "@/components/ui/button";

const FIELD_CLASS =
  "w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const justRegistered = searchParams.get("registered") === "1";
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {justRegistered && (
        <div className="rounded-md border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-700">
          Account created. Please log in.
        </div>
      )}
      {error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
          Email
        </label>
        <input id="email" name="email" type="email" required className={FIELD_CLASS} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
          Password
        </label>
        <input id="password" name="password" type="password" required className={FIELD_CLASS} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={buttonClasses({ size: "lg", className: "w-full" })}
      >
        {isPending ? "Logging in…" : "Log In"}
      </button>
    </form>
  );
}
