import Link from "next/link";
import { HiringRequestForm } from "@/components/recruiter/hiring-request-form";

export const metadata = {
  title: "Submit a Hiring Request | MAP Petro Emirates",
};

export default function NewHiringRequestPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm text-slate-500">
        <Link href="/recruiter/dashboard" className="hover:text-primary-700">
          Dashboard
        </Link>{" "}
        / New Hiring Request
      </p>
      <h1 className="mt-1 font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
        Submit a Hiring Request
      </h1>
      <p className="mt-2 text-slate-600">
        Tell us what you need and our team will follow up to turn it into a
        live job listing.
      </p>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <HiringRequestForm />
      </div>
    </div>
  );
}
