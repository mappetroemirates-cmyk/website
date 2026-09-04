import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { RecruiterProfileSettingsForm } from "@/components/recruiter/profile-settings-form";
import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { changeRecruiterPassword } from "./actions";

export const metadata = { title: "Account Settings | MAP Petro Emirates" };
export const dynamic = "force-dynamic";

export default async function RecruiterSettingsPage() {
  const session = await auth();
  const recruiter = await prisma.recruiter.findUniqueOrThrow({
    where: { id: session!.user.id },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm text-slate-500">
        <Link href="/recruiter/dashboard" className="hover:text-primary-700">
          Dashboard
        </Link>{" "}
        / Account Settings
      </p>
      <h1 className="mt-1 font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
        Account Settings
      </h1>
      <p className="mt-2 text-slate-600">
        Update your company profile or change your password.
      </p>

      <div className="mt-8 space-y-8">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-neutral-900">
            Company Profile
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            This is how our team identifies your account.
          </p>
          <div className="mt-6">
            <RecruiterProfileSettingsForm recruiter={recruiter} />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-neutral-900">
            Change Password
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Choose a new password of at least 8 characters.
          </p>
          <div className="mt-6">
            <ChangePasswordForm action={changeRecruiterPassword} />
          </div>
        </div>
      </div>
    </div>
  );
}
