// Shared shape for announcements as rendered on the public site. Real data
// comes from lib/announcements.ts (Prisma); kept here since it's the type
// AnnouncementCard and other display components are written against.

export interface MockAnnouncement {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  type: "job-update" | "event" | "notice";
  publishedAt: string;
}

export const ANNOUNCEMENT_TYPE_LABEL: Record<MockAnnouncement["type"], string> = {
  "job-update": "Job Update",
  event: "Event",
  notice: "Notice",
};
