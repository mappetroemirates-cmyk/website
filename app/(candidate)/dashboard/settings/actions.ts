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

export interface SettingsFormState {
  error?: string;
  success?: boolean;
}

const profileSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),
  phone: z.string().trim().min(1, "Phone number is required."),
  location: z.string().trim().min(1, "Location is required."),
  education: z.string().trim().min(1, "Education is required."),
  workExperience: z.string().trim().min(1, "Work experience is required."),
  skills: z.string().trim().min(1, "Skills are required."),
});

export async function updateCandidateProfile(
  formData: FormData
): Promise<SettingsFormState> {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "candidate") {
    return { error: "You must be signed in as a candidate." };
  }

  const parsed = profileSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    location: formData.get("location"),
    education: formData.get("education"),
    workExperience: formData.get("workExperience"),
    skills: formData.get("skills"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  let profilePhotoUrl: string | undefined;
  const photo = formData.get("profilePhoto");
  if (photo instanceof File && photo.size > 0) {
    if (!PHOTO_ALLOWED_MIME_TYPES.includes(photo.type as (typeof PHOTO_ALLOWED_MIME_TYPES)[number])) {
      return { error: "Profile photo must be a JPEG, PNG, or WebP image." };
    }
    if (photo.size > PHOTO_MAX_SIZE_BYTES) {
      return { error: "Profile photo must be 2MB or smaller." };
    }
    const key = `photos/${randomUUID()}-${photo.name}`;
    await uploadToR2(key, Buffer.from(await photo.arrayBuffer()), photo.type);
    profilePhotoUrl = key;
  }

  await prisma.candidate.update({
    where: { id: session.user.id },
    data: {
      ...parsed.data,
      ...(profilePhotoUrl ? { profilePhotoUrl } : {}),
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");
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

export async function changeCandidatePassword(
  formData: FormData
): Promise<SettingsFormState> {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "candidate") {
    return { error: "You must be signed in as a candidate." };
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

  const candidate = await prisma.candidate.findUniqueOrThrow({
    where: { id: session.user.id },
  });

  const currentValid = await bcrypt.compare(
    parsed.data.currentPassword,
    candidate.password
  );
  if (!currentValid) {
    return { error: "Current password is incorrect." };
  }

  const newHash = await bcrypt.hash(parsed.data.newPassword, 10);
  await prisma.candidate.update({
    where: { id: session.user.id },
    data: { password: newHash },
  });

  return { success: true };
}
