import type { ApplicationStatus } from "@prisma/client";

export const STATUS_LABEL: Record<ApplicationStatus, string> = {
  applied: "Applied",
  under_review: "Under Review",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  hired: "Hired",
};

export const STATUS_BADGE_CLASS: Record<ApplicationStatus, string> = {
  applied: "bg-primary-50 text-primary-700",
  under_review: "bg-amber-50 text-amber-700",
  shortlisted: "bg-violet-50 text-violet-700",
  rejected: "bg-rose-50 text-rose-700",
  hired: "bg-emerald-50 text-emerald-700",
};
