import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const timeout = (ms: number) => new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
  try {
    const products = await Promise.race([
      prisma.product.findMany(),
      timeout(5000)
    ])
    // Parse JSON fields before sending
    const parsed = products.map(p => ({
      ...p,
      features: JSON.parse(p.features || '[]'),
      featuresAr: JSON.parse(p.featuresAr || '[]'),
      certifications: JSON.parse(p.certifications || '[]'),
      certificationsAr: JSON.parse(p.certificationsAr || '[]'),
    }))
    return NextResponse.json(parsed)
  } catch (err) {
    console.error('API /api/products GET error:', err);
    if (err instanceof Error && err.message === 'timeout') {
      return NextResponse.json({ error: 'Request timed out' }, { status: 504 })
    }
    return NextResponse.json({ error: 'Internal server error', details: String(err) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
  const data = await req.json();
    // Validate required fields
    const required = ['title', 'titleAr', 'description', 'descriptionAr', 'protein'];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
  const product = await prisma.product.create({
    data: {
        title: data.title,
        titleAr: data.titleAr,
        description: data.description,
        descriptionAr: data.descriptionAr,
        protein: data.protein,
      features: JSON.stringify(data.features || []),
      featuresAr: JSON.stringify(data.featuresAr || []),
      certifications: JSON.stringify(data.certifications || []),
      certificationsAr: JSON.stringify(data.certificationsAr || []),
    },
  });
  return NextResponse.json(product);
  } catch (err) {
    console.error('API /api/products POST error:', err);
    return NextResponse.json({ error: 'Failed to create product', details: String(err) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
  const data = await req.json();
  const { id, ...rest } = data;
    if (!id) {
      return NextResponse.json({ error: 'Missing product id' }, { status: 400 });
    }
  const product = await prisma.product.update({
    where: { id },
    data: {
        title: rest.title,
        titleAr: rest.titleAr,
        description: rest.description,
        descriptionAr: rest.descriptionAr,
        protein: rest.protein,
      features: JSON.stringify(rest.features || []),
      featuresAr: JSON.stringify(rest.featuresAr || []),
      certifications: JSON.stringify(rest.certifications || []),
      certificationsAr: JSON.stringify(rest.certificationsAr || []),
    },
  });
  return NextResponse.json(product);
  } catch (err) {
    console.error('API /api/products PUT error:', err);
    return NextResponse.json({ error: 'Failed to update product', details: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
  const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing product id' }, { status: 400 });
    }
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API /api/products DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete product', details: String(err) }, { status: 500 });
  }
} 