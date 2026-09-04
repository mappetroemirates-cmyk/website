"use server";

import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
  uploadToR2,
  PHOTO_ALLOWED_MIME_TYPES,
  PHOTO_MAX_SIZE_BYTES,
} from "@/lib/r2";
import type { SettingsFormState } from "@/app/(candidate)/dashboard/settings/actions";

const profileSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required."),
  contactPersonName: z.string().trim().min(1, "Contact person name is required."),
  phone: z.string().trim().min(1, "Phone number is required."),
  industry: z.string().trim().optional(),
});

export async function updateRecruiterProfile(
  formData: FormData
): Promise<SettingsFormState> {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "recruiter") {
    return { error: "You must be signed in as a recruiter." };
  }

  const parsed = profileSchema.safeParse({
    companyName: formData.get("companyName"),
    contactPersonName: formData.get("contactPersonName"),
    phone: formData.get("phone"),
    industry: formData.get("industry") || undefined,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  let logoUrl: string | undefined;
  const logo = formData.get("logo");
  if (logo instanceof File && logo.size > 0) {
    if (!PHOTO_ALLOWED_MIME_TYPES.includes(logo.type as (typeof PHOTO_ALLOWED_MIME_TYPES)[number])) {
      return { error: "Logo must be a JPEG, PNG, or WebP image." };
    }
    if (logo.size > PHOTO_MAX_SIZE_BYTES) {
      return { error: "Logo must be 2MB or smaller." };
    }
    const key = `logos/${randomUUID()}-${logo.name}`;
    await uploadToR2(key, Buffer.from(await logo.arrayBuffer()), logo.type);
    logoUrl = key;
  }

  const { industry, ...rest } = parsed.data;

  await prisma.recruiter.update({
    where: { id: session.user.id },
    data: {
      ...rest,
      industry: industry || null,
      ...(logoUrl ? { logoUrl } : {}),
    },
  });

  revalidatePath("/recruiter/dashboard");
  revalidatePath("/recruiter/dashboard/settings");
  return { success: true };
}

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z.string().min(8, "New password must be at least 8 characters."),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match.",
    path: ["confirmNewPassword"],
  });

export async function changeRecruiterPassword(
  formData: FormData
): Promise<SettingsFormState> {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "recruiter") {
    return { error: "You must be signed in as a recruiter." };
  }

  const parsed = passwordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmNewPassword: formData.get("confirmNewPassword"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  const recruiter = await prisma.recruiter.findUniqueOrThrow({
    where: { id: session.user.id },
  });

  const currentValid = await bcrypt.compare(
    parsed.data.currentPassword,
    recruiter.password
  );
  if (!currentValid) {
    return { error: "Current password is incorrect." };
  }

  const newHash = await bcrypt.hash(parsed.data.newPassword, 10);
  await prisma.recruiter.update({
    where: { id: session.user.id },
    data: { password: newHash },
  });

  return { success: true };
}
