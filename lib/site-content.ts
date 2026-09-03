import { prisma } from "@/lib/prisma";

export async function getSiteContent(): Promise<Record<string, string>> {
  const rows = await prisma.siteContent.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}
