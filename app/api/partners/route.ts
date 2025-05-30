import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      where: { status: 'active' },
      orderBy: { id: 'desc' },
    });
    return NextResponse.json(partners);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch partners', details: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, industry, logo, country, status, description } = data;
    if (!name || !industry || !logo || !country || !status || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const partner = await prisma.partner.create({
      data: { name, industry, logo, country, status, description },
    });
    return NextResponse.json(partner);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create partner', details: String(err) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, name, industry, logo, country, status, description } = data;
    if (!id) {
      return NextResponse.json({ error: 'Missing partner id' }, { status: 400 });
    }
    const partner = await prisma.partner.update({
      where: { id: Number(id) },
      data: { name, industry, logo, country, status, description },
    });
    return NextResponse.json(partner);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update partner', details: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;
    if (!id) {
      return NextResponse.json({ error: 'Missing partner id' }, { status: 400 });
    }
    await prisma.partner.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete partner', details: String(err) }, { status: 500 });
  }
} 