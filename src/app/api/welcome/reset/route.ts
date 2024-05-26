import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const url = req.nextUrl.clone();

  cookieStore.set('progress', '1');

  const redirectUrl = url.searchParams.get('redirect') ?? '/';
  revalidatePath("/welcome", 'layout');

  return NextResponse.redirect(
    new URL(redirectUrl, url.toString()).toString(),
    {
      status: 302,
    },
  );
}
