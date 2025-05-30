import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const news = await prisma.news.findMany({ orderBy: { date: 'desc' } });
    return NextResponse.json(news);
  } catch (err) {
    console.error('API /api/news GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch news', details: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const item = await prisma.news.create({
      data: {
        title: data.title,
        titleAr: data.titleAr,
        content: data.content,
        contentAr: data.contentAr,
        category: data.category,
        categoryAr: data.categoryAr,
        date: new Date(data.date),
        status: data.status || 'published',
        featured: !!data.featured,
      },
    });
    return NextResponse.json(item);
  } catch (err) {
    console.error('API /api/news POST error:', err);
    return NextResponse.json({ error: 'Failed to create news', details: String(err) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const item = await prisma.news.update({
      where: { id: data.id },
      data: {
        title: data.title,
        titleAr: data.titleAr,
        content: data.content,
        contentAr: data.contentAr,
        category: data.category,
        categoryAr: data.categoryAr,
        date: new Date(data.date),
        status: data.status || 'published',
        featured: !!data.featured,
      },
    });
    return NextResponse.json(item);
  } catch (err) {
    console.error('API /api/news PUT error:', err);
    return NextResponse.json({ error: 'Failed to update news', details: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    await prisma.news.delete({ where: { id: data.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API /api/news DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete news', details: String(err) }, { status: 500 });
  }
} 