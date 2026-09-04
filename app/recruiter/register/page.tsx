import Link from "next/link";
import { RecruiterRegisterForm } from "@/components/auth/recruiter-register-form";

export const metadata = {
  title: "Register as a Recruiter | MAP Petro Emirates",
};

export default function RecruiterRegisterPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-semibold text-slate-900">
          Register as a Recruiter
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Create an account to submit hiring requirements to MAP Petro
          Emirates and track their progress.
        </p>

        <div className="mt-6">
          <RecruiterRegisterForm />
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link
            href="/recruiter/login"
            className="font-medium text-primary-700 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
