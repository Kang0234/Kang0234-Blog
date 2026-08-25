export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import xss from 'xss';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: '文章不存在' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: '未授权' }, { status: 401 });

  const body = await req.json();
  const { title, content, summary, tags } = body;

  const post = await prisma.post.update({
    where: { id: params.id },
    data: {
      title: title ? xss(title.slice(0, 255)) : undefined,
      content: content ? content.slice(0, 50000) : undefined,
      summary: summary !== undefined ? (summary ? xss(summary.slice(0, 500)) : null) : undefined,
      tags: tags !== undefined ? xss(tags.slice(0, 100)) : undefined,
    },
  });

  await prisma.adminLog.create({ data: { action: 'update_post', detail: post.id } });
  return NextResponse.json(post);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: '未授权' }, { status: 401 });

  await prisma.post.delete({ where: { id: params.id } });
  await prisma.adminLog.create({ data: { action: 'delete_post', detail: params.id } });
  return NextResponse.json({ success: true });
}
