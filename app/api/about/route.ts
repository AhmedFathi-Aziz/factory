import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTokenFromHeader, verifyJWT } from '@/lib/utils';

export async function GET() {
  const about = await prisma.about.findUnique({ where: { id: 1 } });
  if (!about) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(about);
}

export async function PUT(req: NextRequest) {
  // JWT auth
  const token = getTokenFromHeader(req);
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const valid = verifyJWT(token);
  if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  const updated = await prisma.about.update({
    where: { id: 1 },
    data: {
      title: data.title,
      titleAr: data.titleAr,
      subtitle: data.subtitle,
      subtitleAr: data.subtitleAr,
      mission: data.mission,
      missionAr: data.missionAr,
      vision: data.vision,
      visionAr: data.visionAr,
      values: data.values,
      valuesAr: data.valuesAr,
      story: data.story,
      storyAr: data.storyAr,
      experience: data.experience,
      experienceAr: data.experienceAr,
      production: data.production,
      productionAr: data.productionAr,
      clients: data.clients,
      clientsAr: data.clientsAr,
      scope: data.scope,
      scopeAr: data.scopeAr,
      quality: data.quality,
      qualityAr: data.qualityAr,
    },
  });
  return NextResponse.json(updated);
} 