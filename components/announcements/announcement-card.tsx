import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import { ANNOUNCEMENT_TYPE_LABEL, type MockAnnouncement } from "@/lib/mock-data";

const TYPE_BADGE: Record<MockAnnouncement["type"], string> = {
  "job-update": "bg-primary-50 text-primary-700",
  event: "bg-accent-50 text-accent-700",
  notice: "bg-neutral-100 text-neutral-700",
};

export function AnnouncementCard({
  announcement,
}: {
  announcement: MockAnnouncement;
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${TYPE_BADGE[announcement.type]}`}
        >
          {ANNOUNCEMENT_TYPE_LABEL[announcement.type]}
        </span>
        <span className="text-xs text-neutral-400">
          {formatDate(announcement.publishedAt)}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold text-neutral-900">
        {announcement.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-neutral-600">
        {announcement.excerpt}
      </p>
      <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary-700">
        Read more
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </div>
    </div>
  );
}
