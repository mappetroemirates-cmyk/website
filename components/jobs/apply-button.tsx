"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { buttonClasses } from "@/components/ui/button";
import { applyToJob } from "@/app/(public)/jobs/[id]/actions";

export function ApplyButton({
  jobId,
  alreadyApplied,
}: {
  jobId: string;
  alreadyApplied: boolean;
}) {
  const { status } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState(alreadyApplied);

  if (status === "loading") {
    return (
      <button disabled className={buttonClasses({ size: "lg" })}>
        Loading…
      </button>
    );
  }

  if (status !== "authenticated") {
    return (
      <Link
        href={`/login?callbackUrl=/jobs/${jobId}`}
        className={buttonClasses({ size: "lg" })}
      >
        Login to Apply
      </Link>
    );
  }

  if (applied) {
    return (
      <button disabled className={buttonClasses({ size: "lg", variant: "outline" })}>
        Already Applied
      </button>
    );
  }

  function handleApply() {
    setError(null);
    startTransition(async () => {
      const result = await applyToJob(jobId);
      if (result.error) {
        setError(result.error);
        return;
      }
      setApplied(true);
      router.refresh();
    });
  }

  return (
    <div>
      <button
        onClick={handleApply}
        disabled={isPending}
        className={buttonClasses({ size: "lg" })}
      >
        {isPending ? "Submitting…" : "Apply Now"}
      </button>
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
    </div>
  );
}
