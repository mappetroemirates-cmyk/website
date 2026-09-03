import { Megaphone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AnnouncementCard } from "@/components/announcements/announcement-card";
import type { MockAnnouncement } from "@/lib/mock-data";

export const metadata = {
  title: "Announcements | MAP Petro Emirates",
};
export const dynamic = "force-dynamic";

const TYPE_MAP: Record<string, MockAnnouncement["type"]> = {
  job_update: "job-update",
  event: "event",
  notice: "notice",
};

export default async function AnnouncementsPage() {
  const rows = await prisma.announcement.findMany({
    orderBy: { publishedAt: "desc" },
  });

  const announcements: MockAnnouncement[] = rows.map((row) => ({
    id: row.id,
    title: row.title,
    excerpt:
      row.content.length > 160 ? `${row.content.slice(0, 160)}…` : row.content,
    content: row.content,
    type: TYPE_MAP[row.type] ?? "notice",
    publishedAt: row.publishedAt.toISOString().slice(0, 10),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-neutral-900">
        Announcements &amp; News
      </h1>
      <p className="mt-2 text-neutral-600">
        Company news, hiring events, and important notices.
      </p>

      {announcements.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 bg-white p-12 text-center">
          <Megaphone className="h-8 w-8 text-neutral-300" aria-hidden="true" />
          <p className="text-sm font-medium text-neutral-600">
            No announcements published yet.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      )}
    </div>
  );
}
