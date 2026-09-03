import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { JobCard } from "@/components/jobs/job-card";
import { JOB_TYPE_OPTIONS } from "@/lib/jobs";

export const metadata = {
  title: "Jobs | MAP Petro Emirates",
};

export const dynamic = "force-dynamic";

interface JobsPageProps {
  searchParams: { q?: string; location?: string; type?: string };
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const q = searchParams.q?.trim() ?? "";
  const location = searchParams.location?.trim() ?? "";
  const type = searchParams.type?.trim() ?? "";

  const where: Prisma.JobWhereInput = { isActive: true };

  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { companyName: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }
  if (location) {
    where.location = { contains: location, mode: "insensitive" };
  }
  if (type) {
    where.jobType = type as Prisma.JobWhereInput["jobType"];
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900">
        Job Opportunities
      </h1>
      <p className="mt-2 text-slate-600">
        Search and filter open positions by keyword, location, and job type.
      </p>

      <form
        method="get"
        className="mt-8 grid grid-cols-1 gap-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:grid-cols-4"
      >
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Keyword (title, company, description)"
          className="rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:col-span-2"
        />
        <input
          type="text"
          name="location"
          defaultValue={location}
          placeholder="Location"
          className="rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        <select
          name="type"
          defaultValue={type}
          className="rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="">All Job Types</option>
          {JOB_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 sm:col-span-4 sm:w-fit"
        >
          Search
        </button>
      </form>

      {jobs.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          No open positions match your search right now.
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
