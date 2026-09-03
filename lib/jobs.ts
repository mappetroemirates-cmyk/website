import type { JobType } from "@prisma/client";

export const JOB_TYPE_LABEL: Record<JobType, string> = {
  full_time: "Full-Time",
  part_time: "Part-Time",
  contract: "Contract",
};

export const JOB_TYPE_BADGE_CLASS: Record<JobType, string> = {
  full_time: "bg-primary-50 text-primary-700",
  part_time: "bg-accent-50 text-accent-700",
  contract: "bg-neutral-100 text-neutral-700",
};

export const JOB_TYPE_OPTIONS: { value: JobType; label: string }[] = [
  { value: "full_time", label: "Full-Time" },
  { value: "part_time", label: "Part-Time" },
  { value: "contract", label: "Contract" },
];

export function splitList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
