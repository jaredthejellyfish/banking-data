import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cookieStore = cookies();

    const access_token = cookieStore.get('access_token');
    const item_id = cookieStore.get('item_id');

    if (access_token?.value && item_id?.value) {
      return NextResponse.json({ result: true });
    }
    throw new Error('No cookies found');
  } catch (error) {
    return NextResponse.json({ result: false });
  }
}
