export const metadata = {
  title: "My Dashboard | MAP Petro Emirates",
};

export default function CandidateDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900">
        My Dashboard
      </h1>
      <p className="mt-2 text-slate-600">
        Your profile and applied jobs will appear here once authentication
        and the apply flow are wired up.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-400 lg:col-span-1">
          Profile summary placeholder
        </div>
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-400 lg:col-span-2">
          Applied jobs &amp; status placeholder
        </div>
      </div>
    </div>
  );
}
