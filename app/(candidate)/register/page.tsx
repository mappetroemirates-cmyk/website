import Link from "next/link";
import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata = {
  title: "Register | MAP Petro Emirates",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Create Your Candidate Account
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Fill in your profile and upload your resume to start applying for jobs.
        </p>

        <div className="mt-6">
          <Suspense fallback={null}>
            <RegisterForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary-700 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
