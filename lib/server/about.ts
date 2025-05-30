import { prisma } from "@/lib/prisma";

export async function getServerAboutInfo() {
  // Always fetch the About info with id 1
  return prisma.about.findUnique({ where: { id: 1 } });
} 