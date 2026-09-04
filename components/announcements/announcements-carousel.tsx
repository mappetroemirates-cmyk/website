"use client";

import { useRef, useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { formatDate } from "@/lib/format";
import { ANNOUNCEMENT_TYPE_LABEL, type MockAnnouncement } from "@/lib/mock-data";

export function AnnouncementsCarousel({
  announcements,
}: {
  announcements: MockAnnouncement[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el || announcements.length === 0) return;
    const cardWidth = el.scrollWidth / announcements.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActive(Math.max(0, Math.min(index, announcements.length - 1)));
  }

  function scrollToIndex(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / announcements.length;
    el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {announcements.map((announcement, i) => {
          const featured = i === active;
          return (
            <div
              key={announcement.id}
              className={`w-[280px] shrink-0 snap-start rounded-xl p-6 transition-colors duration-300 sm:w-[340px] ${
                featured
                  ? "bg-primary-900 text-white"
                  : "border border-neutral-200 bg-white text-neutral-900"
              }`}
            >
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  featured
                    ? "bg-white/10 text-accent-300"
                    : "bg-primary-50 text-primary-700"
                }`}
              >
                {ANNOUNCEMENT_TYPE_LABEL[announcement.type]}
              </span>

              <h3 className="mt-4 line-clamp-2 text-lg font-bold leading-snug">
                {announcement.title}
              </h3>
              <p
                className={`mt-2 line-clamp-3 text-sm leading-6 ${
                  featured ? "text-primary-100" : "text-neutral-600"
                }`}
              >
                {announcement.excerpt}
              </p>

              <div className="mt-6 flex items-center justify-between gap-3">
                <span
                  className={`flex items-center gap-1.5 text-xs ${
                    featured ? "text-primary-300" : "text-neutral-400"
                  }`}
                >
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatDate(announcement.publishedAt)}
                </span>
                <span
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    featured
                      ? "bg-accent-500 text-white hover:bg-accent-400"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  Read more
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {announcements.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {announcements.map((announcement, i) => (
            <button
              key={announcement.id}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-accent-500" : "w-1.5 bg-neutral-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
