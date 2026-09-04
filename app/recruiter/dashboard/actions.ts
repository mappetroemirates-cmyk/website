"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { JobType } from "@prisma/client";

const requestSchema = z.object({
  department: z.string().trim().min(1, "Department is required."),
  roleTitle: z.string().trim().min(1, "Role title is required."),
  numberOfPositions: z.coerce.number().int().min(1, "Enter at least 1 position."),
  jobType: z.nativeEnum(JobType, { message: "Please select a valid job type." }),
  experienceRequired: z.string().trim().min(1, "Experience required is required."),
  preferredStartDate: z.string().trim().optional(),
  additionalNotes: z.string().trim().optional(),
});

export interface HiringRequestFormState {
  error?: string;
}

export async function submitHiringRequest(
  formData: FormData
): Promise<HiringRequestFormState> {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "recruiter") {
    return { error: "You must be signed in as a recruiter to submit a request." };
  }

  const parsed = requestSchema.safeParse({
    department: formData.get("department"),
    roleTitle: formData.get("roleTitle"),
    numberOfPositions: formData.get("numberOfPositions"),
    jobType: formData.get("jobType"),
    experienceRequired: formData.get("experienceRequired"),
    preferredStartDate: formData.get("preferredStartDate") || undefined,
    additionalNotes: formData.get("additionalNotes") || undefined,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  const { preferredStartDate, additionalNotes, ...rest } = parsed.data;

  await prisma.hiringRequest.create({
    data: {
      ...rest,
      recruiterId: session.user.id,
      preferredStartDate: preferredStartDate ? new Date(preferredStartDate) : null,
      additionalNotes: additionalNotes || null,
    },
  });

  redirect("/recruiter/dashboard");
}
