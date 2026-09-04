import type { HiringRequestStatus } from "@prisma/client";

export const HIRING_REQUEST_STATUS_LABEL: Record<HiringRequestStatus, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  in_progress: "In Progress",
  fulfilled: "Fulfilled",
  closed: "Closed",
};

export const HIRING_REQUEST_STATUS_BADGE_CLASS: Record<HiringRequestStatus, string> = {
  submitted: "bg-primary-50 text-primary-700",
  under_review: "bg-amber-50 text-amber-700",
  in_progress: "bg-violet-50 text-violet-700",
  fulfilled: "bg-emerald-50 text-emerald-700",
  closed: "bg-neutral-100 text-neutral-600",
};

export const HIRING_REQUEST_STATUS_ORDER: HiringRequestStatus[] = [
  "submitted",
  "under_review",
  "in_progress",
  "fulfilled",
  "closed",
];
