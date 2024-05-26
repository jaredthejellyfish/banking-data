import { NextResponse } from 'next/server';

import { plaidClient } from '@/lib/plaid/client';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError ?? !user) throw new Error('User not authenticated');

    const { data: accessToken, error: accessTokenError } = await supabase
      .from('user_tokens')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (accessTokenError ?? !accessToken?.token)
      throw new Error('No access token found');

    const accounts_response = await plaidClient.accountsGet({
      access_token: accessToken.token,
    });

    if (accounts_response.data.accounts.length > 0)
      return NextResponse.json({ result: true });

    throw new Error('No cookies found');
  } catch (error) {
    console.error(error);
    return NextResponse.json({ result: false });
  }
}
