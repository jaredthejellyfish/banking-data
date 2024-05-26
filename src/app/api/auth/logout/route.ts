import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createClient } from '@l/supabase/server';

// Creating a handler to a GET request to route /auth/confirm
export async function GET(req: NextRequest) {
  const supabase = createClient();
  const cookieStore = cookies();

  cookieStore.delete('progress');

  await supabase.auth.signOut();

  const url = req.nextUrl.clone();

  url.pathname = '/';

  return NextResponse.redirect(url);
}
