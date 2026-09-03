// Static placeholder data for the announcements/content wireframe pass —
// out of scope for the jobs/application flow. Replace with real Prisma
// queries when the announcements pages are wired up.

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

export const MOCK_ANNOUNCEMENTS: MockAnnouncement[] = [
  {
    id: "ann-1",
    title: "New batch of engineering roles now open across Abu Dhabi",
    excerpt:
      "We've partnered with three new energy sector clients to fill process, HSE, and maintenance roles this quarter.",
    content:
      "We've partnered with three new energy sector clients to fill process, HSE, and maintenance roles this quarter. Interested candidates are encouraged to update their profiles and apply directly through the jobs board.",
    type: "job-update",
    publishedAt: "2026-08-12",
  },
  {
    id: "ann-2",
    title: "Walk-in interview day — Dubai office, 28 August",
    excerpt:
      "Join us for an on-site walk-in interview session for logistics and site support roles. Bring an updated CV and ID.",
    content:
      "Join us for an on-site walk-in interview session for logistics and site support roles at our Dubai office on 28 August, 10am - 3pm. Bring an updated CV and a valid Emirates ID or passport.",
    type: "event",
    publishedAt: "2026-08-09",
  },
  {
    id: "ann-3",
    title: "Office hours update for the upcoming public holiday",
    excerpt:
      "Our offices will have adjusted working hours next week. Applications and support requests submitted online will still be processed.",
    content:
      "Our offices will have adjusted working hours next week due to the upcoming public holiday. Applications and support requests submitted online will still be processed, with responses resuming on the next business day.",
    type: "notice",
    publishedAt: "2026-08-03",
  },
];
