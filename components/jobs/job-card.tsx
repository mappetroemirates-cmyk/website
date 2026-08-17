import { Briefcase, Clock, MapPin } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { JOB_TYPE_LABEL, type MockJob } from "@/lib/mock-data";

const JOB_TYPE_BADGE: Record<MockJob["jobType"], string> = {
  "full-time": "bg-primary-50 text-primary-700",
  "part-time": "bg-accent-50 text-accent-700",
  contract: "bg-neutral-100 text-neutral-700",
};

export function JobCard({ job }: { job: MockJob }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-600 text-white">
          <Briefcase className="h-5 w-5" aria-hidden="true" />
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${JOB_TYPE_BADGE[job.jobType]}`}
        >
          {JOB_TYPE_LABEL[job.jobType]}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold text-neutral-900">{job.title}</h3>
      <p className="mt-1 text-sm font-medium text-neutral-500">
        {job.companyName}
      </p>

      <div className="mt-3 flex items-center gap-1.5 text-sm text-neutral-500">
        <MapPin className="h-4 w-4" aria-hidden="true" />
        {job.location}
      </div>

      <p className="mt-4 line-clamp-2 text-sm text-neutral-600">
        {job.description}
      </p>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
        <span className="flex items-center gap-1.5 text-xs text-neutral-400">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          Apply by {formatDate(job.applicationDeadline)}
        </span>
        <LinkButton href={`/jobs/${job.id}`} size="sm">
          View Details
        </LinkButton>
      </div>
    </div>
  );
}
