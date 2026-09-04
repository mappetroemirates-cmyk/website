import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { JOB_TYPE_LABEL } from "@/lib/jobs";
import { STATUS_LABEL, STATUS_BADGE_CLASS } from "@/lib/status";

export const metadata = {
  title: "My Dashboard | MAP Petro Emirates",
};

export const dynamic = "force-dynamic";

export default async function CandidateDashboardPage() {
  const session = await auth();
  const candidateId = session!.user.id;

  const candidate = await prisma.candidate.findUniqueOrThrow({
    where: { id: candidateId },
  });

  const applications = await prisma.application.findMany({
    where: { candidateId },
    include: { job: true },
    orderBy: { appliedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-slate-900">
        My Dashboard
      </h1>
      <p className="mt-2 text-slate-600">
        Welcome back, {candidate.fullName}.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-1">
          <h2 className="text-lg font-bold text-neutral-900">Profile</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-neutral-400">Email</dt>
              <dd className="text-neutral-700">{candidate.email}</dd>
            </div>
            <div>
              <dt className="text-neutral-400">Phone</dt>
              <dd className="text-neutral-700">{candidate.phone}</dd>
            </div>
            <div>
              <dt className="text-neutral-400">Location</dt>
              <dd className="text-neutral-700">{candidate.location}</dd>
            </div>
            <div>
              <dt className="text-neutral-400">Education</dt>
              <dd className="whitespace-pre-line text-neutral-700">
                {candidate.education}
              </dd>
            </div>
            <div>
              <dt className="text-neutral-400">Work Experience</dt>
              <dd className="whitespace-pre-line text-neutral-700">
                {candidate.workExperience}
              </dd>
            </div>
            <div>
              <dt className="text-neutral-400">Skills</dt>
              <dd className="text-neutral-700">{candidate.skills}</dd>
            </div>
            <div>
              <dt className="text-neutral-400">Resume</dt>
              <dd className="text-neutral-700">
                {candidate.resumeUrl ? "Uploaded" : "Not uploaded"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold text-neutral-900">
            Applied Jobs
          </h2>

          {applications.length === 0 ? (
            <div className="mt-4 rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-400">
              You haven&rsquo;t applied to any jobs yet.{" "}
              <Link href="/jobs" className="font-medium text-primary-700 hover:underline">
                Browse open positions
              </Link>
              .
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-neutral-100">
              {applications.map((application) => (
                <li
                  key={application.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-4"
                >
                  <div>
                    <Link
                      href={`/jobs/${application.jobId}`}
                      className="font-semibold text-neutral-900 hover:text-primary-700"
                    >
                      {application.job.title}
                    </Link>
                    <p className="text-sm text-neutral-500">
                      {application.job.companyName} &middot;{" "}
                      {JOB_TYPE_LABEL[application.job.jobType]}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-400">
                      Applied {formatDate(application.appliedAt)}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_BADGE_CLASS[application.status]}`}
                  >
                    {STATUS_LABEL[application.status]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
