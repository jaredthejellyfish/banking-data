import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { plaidClient } from '@/lib/plaid/client';

export async function GET() {
  try {
    const cookieStore = cookies();

    const access_token = cookieStore.get('access_token');

    if (!access_token?.value) throw new Error('No access token found');

    const accounts_response = await plaidClient.accountsGet({
      access_token: access_token.value,
    });

    if (accounts_response.data.accounts.length > 0)
      return NextResponse.json({ result: true });

    throw new Error('No cookies found');
  } catch (error) {
    return NextResponse.json({ result: false });
  }
}
