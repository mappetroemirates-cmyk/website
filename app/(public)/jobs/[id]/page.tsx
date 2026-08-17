export default function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        Job detail view for job <span className="font-mono">{id}</span> and
        the &ldquo;Apply Now&rdquo; flow will be wired up in the next steps.
      </div>
    </div>
  );
}
