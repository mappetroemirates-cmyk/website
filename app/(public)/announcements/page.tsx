export const metadata = {
  title: "Announcements | MAP Petro Emirates",
};

export default function AnnouncementsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900">
        Announcements &amp; News
      </h1>
      <p className="mt-2 text-slate-600">
        Company news, hiring events, and important notices.
      </p>

      <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        Announcements will be listed here once content is published by an
        administrator.
      </div>
    </div>
  );
}
