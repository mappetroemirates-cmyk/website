"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required."),
  contactPersonName: z.string().trim().min(1, "Contact person name is required."),
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  phone: z.string().trim().min(1, "Phone number is required."),
  industry: z.string().trim().optional(),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export interface RecruiterRegisterResult {
  error?: string;
}

export async function registerRecruiter(
  formData: FormData
): Promise<RecruiterRegisterResult> {
  const parsed = registerSchema.safeParse({
    companyName: formData.get("companyName"),
    contactPersonName: formData.get("contactPersonName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    industry: formData.get("industry") || undefined,
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  if (formData.get("password") !== formData.get("confirmPassword")) {
    return { error: "Passwords do not match." };
  }

  const { email, password, industry, ...profile } = parsed.data;

  const existing = await prisma.recruiter.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.recruiter.create({
    data: {
      ...profile,
      email,
      password: passwordHash,
      industry: industry || null,
    },
  });

  return {};
}
