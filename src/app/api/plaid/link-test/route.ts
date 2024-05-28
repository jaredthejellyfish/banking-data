import moment from 'moment';
import { NextResponse } from 'next/server';
import { CountryCode, type LinkTokenCreateRequest, Products } from 'plaid';

import { env } from '@/env';
import { plaidClient } from '@/lib/plaid/client';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError ?? !user) throw new Error('User not authenticated');

  const request: LinkTokenCreateRequest = {
    user: {
      client_user_id: user.id,
      email_address: user.email,
    },
    products: [Products.Transfer, Products.Statements, Products.Transactions],
    client_name: 'Money Transfer App',
    language: 'en',
    country_codes: [CountryCode.Us],
    redirect_uri: env.PLAID_REDIRECT_URI,
    statements: {
      end_date: moment().format('YYYY-MM-DD'),
      start_date: moment().subtract(30, 'days').format('YYYY-MM-DD'),
    },
    auth: {
      automated_microdeposits_enabled: true,
    },
  };

  try {
    const response = await plaidClient.linkTokenCreate(request);

    const linkToken = response.data.link_token;

    return NextResponse.json({ linkToken });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ linkToken: null });
  }
}
