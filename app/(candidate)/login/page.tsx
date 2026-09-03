import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Candidate Login | MAP Petro Emirates",
};

export default function CandidateLoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Candidate Login</h1>
        <p className="mt-2 text-sm text-slate-500">
          Log in to apply for jobs and track your application status.
        </p>

        <div className="mt-6">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Don&rsquo;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary-700 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
