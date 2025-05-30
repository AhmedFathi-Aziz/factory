import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTokenFromHeader, verifyJWT } from '@/lib/utils';

export async function GET() {
  const info = await prisma.contactInfo.findUnique({ where: { id: 1 } });
  if (!info) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(info);
}

export async function PUT(req: NextRequest) {
  // JWT auth
  const token = getTokenFromHeader(req);
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const valid = verifyJWT(token);
  if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  const updated = await prisma.contactInfo.update({
    where: { id: 1 },
    data: {
      mobile: data.mobile,
      telephone: data.telephone,
      fax: data.fax,
      address: data.address,
      email: data.email,
      website: data.website,
    },
  });
  return NextResponse.json(updated);
} 