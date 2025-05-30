import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const timeout = (ms: number) => new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
  try {
    const gallery = await Promise.race([
      prisma.gallery.findMany({ orderBy: { createdAt: 'desc' } }),
      timeout(5000)
    ])
    return NextResponse.json(gallery)
  } catch (err) {
    if (err instanceof Error && err.message === 'timeout') {
      return NextResponse.json({ error: 'Request timed out' }, { status: 504 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const item = await prisma.gallery.create({
    data: {
      imageUrl: data.imageUrl,
      caption: data.caption,
      captionAr: data.captionAr,
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.gallery.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const { id, imageUrl, caption, captionAr } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const updated = await prisma.gallery.update({
    where: { id },
    data: { imageUrl, caption, captionAr },
  });
  return NextResponse.json(updated);
} 