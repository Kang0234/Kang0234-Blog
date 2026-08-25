import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import xss from 'xss';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q');
  const tag = req.nextUrl.searchParams.get('tag');

  let where: any = {};
  if (q) where.title = { contains: q };
  if (tag) where.tags = { contains: tag };

  const posts = await prisma.post.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: '未授权' }, { status: 401 });

  const body = await req.json();
  const { title, content, summary, tags } = body;

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: '标题和内容不能为空' }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      title: xss(title.slice(0, 255)),
      content: content.slice(0, 50000),
      summary: summary ? xss(summary.slice(0, 500)) : null,
      tags: tags ? xss(tags.slice(0, 100)) : '',
    },
  });

  await prisma.adminLog.create({ data: { action: 'create_post', detail: post.id } });
  return NextResponse.json(post);
}
