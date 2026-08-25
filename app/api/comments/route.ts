export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import xss from 'xss';

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get('postId');
  if (!postId) return NextResponse.json({ comments: [] });

  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json({ comments });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { postId, guestName, content } = body;

  if (!postId || !guestName?.trim() || !content?.trim()) {
    return NextResponse.json({ error: '参数不完整' }, { status: 400 });
  }

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return NextResponse.json({ error: '文章不存在' }, { status: 404 });

  const comment = await prisma.comment.create({
    data: {
      postId,
      guestName: xss(guestName.slice(0, 50)),
      content: xss(content.slice(0, 2000)),
    },
  });

  return NextResponse.json(comment);
}
