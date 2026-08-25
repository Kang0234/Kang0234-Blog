export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const posts = await prisma.post.findMany({ select: { tags: true } });
  const tagCount = new Map<string, number>();
  posts.forEach((p) => p.tags.split(',').filter(Boolean).forEach((t) => tagCount.set(t, (tagCount.get(t) || 0) + 1)));
  const tags = Array.from(tagCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
  return NextResponse.json({ tags });
}
