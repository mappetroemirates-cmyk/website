"use server";

import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  uploadToR2,
  RESUME_ALLOWED_MIME_TYPES,
  RESUME_MAX_SIZE_BYTES,
  PHOTO_ALLOWED_MIME_TYPES,
  PHOTO_MAX_SIZE_BYTES,
} from "@/lib/r2";

const registerSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  phone: z.string().trim().min(1, "Phone number is required."),
  location: z.string().trim().min(1, "Location is required."),
  education: z.string().trim().min(1, "Education is required."),
  workExperience: z.string().trim().min(1, "Work experience is required."),
  skills: z.string().trim().min(1, "Skills are required."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export interface RegisterResult {
  error?: string;
}

export async function registerCandidate(
  formData: FormData
): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    location: formData.get("location"),
    education: formData.get("education"),
    workExperience: formData.get("workExperience"),
    skills: formData.get("skills"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  if (formData.get("password") !== formData.get("confirmPassword")) {
    return { error: "Passwords do not match." };
  }

  const resume = formData.get("resume");
  if (!(resume instanceof File) || resume.size === 0) {
    return { error: "Resume/CV is required." };
  }
  if (!RESUME_ALLOWED_MIME_TYPES.includes(resume.type as (typeof RESUME_ALLOWED_MIME_TYPES)[number])) {
    return { error: "Resume must be a PDF or Word document." };
  }
  if (resume.size > RESUME_MAX_SIZE_BYTES) {
    return { error: "Resume must be 5MB or smaller." };
  }

  const photo = formData.get("profilePhoto");
  if (!(photo instanceof File) || photo.size === 0) {
    return { error: "Profile photo is required." };
  }
  if (!PHOTO_ALLOWED_MIME_TYPES.includes(photo.type as (typeof PHOTO_ALLOWED_MIME_TYPES)[number])) {
    return { error: "Profile photo must be a JPEG, PNG, or WebP image." };
  }
  if (photo.size > PHOTO_MAX_SIZE_BYTES) {
    return { error: "Profile photo must be 2MB or smaller." };
  }

  const { email, password, ...profile } = parsed.data;

  const existing = await prisma.candidate.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const resumeKey = `resumes/${randomUUID()}-${resume.name}`;
  const photoKey = `photos/${randomUUID()}-${photo.name}`;

  await uploadToR2(resumeKey, Buffer.from(await resume.arrayBuffer()), resume.type);
  await uploadToR2(photoKey, Buffer.from(await photo.arrayBuffer()), photo.type);

  await prisma.candidate.create({
    data: {
      ...profile,
      email,
      password: passwordHash,
      resumeUrl: resumeKey,
      profilePhotoUrl: photoKey,
    },
  });

  return {};
}
