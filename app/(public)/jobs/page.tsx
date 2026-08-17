export const metadata = {
  title: "Jobs | MAP Petro Emirates",
};

export default function JobsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900">
        Job Opportunities
      </h1>
      <p className="mt-2 text-slate-600">
        Search and filter open positions by keyword, location, and job type.
      </p>

      <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        Job search, filters, and live listings will be wired up in the next
        step (job listing &amp; detail pages).
      </div>
    </div>
  );
}
