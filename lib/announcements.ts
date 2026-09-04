import { prisma } from "@/lib/prisma";
import type { MockAnnouncement } from "@/lib/mock-data";

const TYPE_MAP: Record<string, MockAnnouncement["type"]> = {
  job_update: "job-update",
  event: "event",
  notice: "notice",
};

export async function getAnnouncements(limit?: number): Promise<MockAnnouncement[]> {
  const rows = await prisma.announcement.findMany({
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    excerpt:
      row.content.length > 160 ? `${row.content.slice(0, 160)}…` : row.content,
    content: row.content,
    type: TYPE_MAP[row.type] ?? "notice",
    publishedAt: row.publishedAt.toISOString().slice(0, 10),
  }));
}
