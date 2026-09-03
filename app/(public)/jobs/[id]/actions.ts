"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export interface ApplyResult {
  error?: string;
  success?: boolean;
}

export async function applyToJob(jobId: string): Promise<ApplyResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to apply." };
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: { isActive: true },
  });
  if (!job || !job.isActive) {
    return { error: "This job is no longer accepting applications." };
  }

  try {
    await prisma.application.create({
      data: { candidateId: session.user.id, jobId },
    });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      err.code === "P2002"
    ) {
      return { error: "You have already applied to this job." };
    }
    throw err;
  }

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/dashboard");
  return { success: true };
}
