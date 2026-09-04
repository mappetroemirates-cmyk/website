import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Recruiter Sign In | MAP Petro Emirates",
};

export default function RecruiterLoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-semibold text-slate-900">
          Recruiter Sign In
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          For companies hiring through MAP Petro Emirates — sign in to submit
          and track hiring requests.
        </p>

        <div className="mt-6">
          <Suspense fallback={null}>
            <LoginForm providerId="recruiter" defaultCallbackUrl="/recruiter/dashboard" />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Don&rsquo;t have an account?{" "}
          <Link
            href="/recruiter/register"
            className="font-medium text-primary-700 hover:underline"
          >
            Register as a Recruiter
          </Link>
        </p>
      </div>
    </div>
  );
}
