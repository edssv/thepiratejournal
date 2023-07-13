import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  if (tag) revalidateTag(tag);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
