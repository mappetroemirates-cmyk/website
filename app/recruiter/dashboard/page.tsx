import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { buttonClasses } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { JOB_TYPE_LABEL } from "@/lib/jobs";
import {
  HIRING_REQUEST_STATUS_LABEL,
  HIRING_REQUEST_STATUS_BADGE_CLASS,
} from "@/lib/hiring-request-status";

export const metadata = {
  title: "Recruiter Dashboard | MAP Petro Emirates",
};
export const dynamic = "force-dynamic";

export default async function RecruiterDashboardPage() {
  const session = await auth();
  const recruiterId = session!.user.id;

  const recruiter = await prisma.recruiter.findUniqueOrThrow({
    where: { id: recruiterId },
  });

  const hiringRequests = await prisma.hiringRequest.findMany({
    where: { recruiterId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-slate-900">
            Welcome, {recruiter.contactPersonName}
          </h1>
          <p className="mt-2 text-slate-600">{recruiter.companyName}</p>
          <Link
            href="/recruiter/dashboard/settings"
            className="mt-1 inline-block text-sm font-medium text-primary-700 hover:underline"
          >
            Account Settings
          </Link>
        </div>
        <Link href="/recruiter/dashboard/new" className={buttonClasses({ size: "lg" })}>
          Submit a Hiring Request
        </Link>
      </div>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-100 p-6">
          <h2 className="text-lg font-bold text-neutral-900">
            Your Hiring Requests
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Requirements you&rsquo;ve submitted and their current status.
          </p>
        </div>

        {hiringRequests.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
              <ClipboardList className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold text-neutral-700">
              You haven&rsquo;t submitted any hiring requests yet.
            </p>
            <p className="max-w-sm text-sm text-neutral-500">
              Tell us what roles you need to fill and our team will follow up.
            </p>
            <Link
              href="/recruiter/dashboard/new"
              className={buttonClasses({ className: "mt-2" })}
            >
              Submit Your First Request
            </Link>
          </div>
        ) : (
          <>
            {/* Mobile / small tablet: stacked cards */}
            <div className="divide-y divide-neutral-100 sm:hidden">
              {hiringRequests.map((request) => (
                <div key={request.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="min-w-0 truncate font-medium text-slate-900">
                      {request.roleTitle}
                    </p>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${HIRING_REQUEST_STATUS_BADGE_CLASS[request.status]}`}
                    >
                      {HIRING_REQUEST_STATUS_LABEL[request.status]}
                    </span>
                  </div>
                  <dl className="mt-3 space-y-1.5 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-neutral-500">Department</dt>
                      <dd className="text-neutral-700">{request.department}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-neutral-500">Positions</dt>
                      <dd className="text-neutral-700">{request.numberOfPositions}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-neutral-500">Submitted</dt>
                      <dd className="text-neutral-700">
                        {formatDate(request.createdAt)}
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>

            {/* Tablet / desktop: table */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    <th className="px-6 py-3">Department</th>
                    <th className="px-6 py-3">Role Title</th>
                    <th className="px-6 py-3">Positions Needed</th>
                    <th className="px-6 py-3">Job Type</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {hiringRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-3.5 text-neutral-700">
                        {request.department}
                      </td>
                      <td className="px-6 py-3.5 font-medium text-neutral-900">
                        {request.roleTitle}
                      </td>
                      <td className="px-6 py-3.5 text-neutral-700">
                        {request.numberOfPositions}
                      </td>
                      <td className="px-6 py-3.5 text-neutral-700">
                        {JOB_TYPE_LABEL[request.jobType]}
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${HIRING_REQUEST_STATUS_BADGE_CLASS[request.status]}`}
                        >
                          {HIRING_REQUEST_STATUS_LABEL[request.status]}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-neutral-700">
                        {formatDate(request.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
