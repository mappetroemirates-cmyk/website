import { notFound } from "next/navigation";
import { Briefcase, Calendar, MapPin, Wallet } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { JOB_TYPE_LABEL, splitList } from "@/lib/jobs";
import { ApplyButton } from "@/components/jobs/apply-button";

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) notFound();

  const session = await auth();
  let alreadyApplied = false;
  if (session?.user?.id) {
    const existing = await prisma.application.findUnique({
      where: {
        candidateId_jobId: { candidateId: session.user.id, jobId: job.id },
      },
      select: { id: true },
    });
    alreadyApplied = !!existing;
  }

  const skills = splitList(job.requiredSkills);
  const qualifications = splitList(job.qualifications);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
        <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
          {JOB_TYPE_LABEL[job.jobType]}
        </span>

        <h1 className="mt-4 font-display text-3xl font-semibold text-neutral-900">
          {job.title}
        </h1>
        <p className="mt-1 text-lg font-medium text-neutral-500">
          {job.companyName}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {job.location}
          </span>
          {job.salary && (
            <span className="flex items-center gap-1.5">
              <Wallet className="h-4 w-4" aria-hidden="true" />
              {job.salary}
            </span>
          )}
          {job.experienceRequired && (
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" aria-hidden="true" />
              {job.experienceRequired}
            </span>
          )}
          {job.applicationDeadline && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Apply by {formatDate(job.applicationDeadline)}
            </span>
          )}
        </div>

        <div className="mt-8">
          <ApplyButton jobId={job.id} alreadyApplied={alreadyApplied} />
        </div>

        <div className="mt-8 space-y-6 border-t border-neutral-100 pt-8">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              Description
            </h2>
            <p className="mt-2 whitespace-pre-line text-neutral-600">
              {job.description}
            </p>
          </div>

          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-neutral-900">
                Required Skills
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {qualifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-neutral-900">
                Qualifications
              </h2>
              <ul className="mt-2 list-inside list-disc space-y-1 text-neutral-600">
                {qualifications.map((qualification) => (
                  <li key={qualification}>{qualification}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
