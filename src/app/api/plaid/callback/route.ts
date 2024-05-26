import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { PlaidLinkOnSuccessMetadata } from 'react-plaid-link';

import { plaidClient } from '@/lib/plaid/client';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { publicToken, metadata } = (await req.json()) as {
      publicToken: string;
      metadata: PlaidLinkOnSuccessMetadata;
    };

    console.log('publicToken', publicToken);

    console.log('metadata', metadata);

    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError ?? !user) throw new Error('User not authenticated');

    const cookieStore = cookies();

    const { data } = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const { error } = await supabase.from('user_tokens').upsert(
      {
        id: undefined,
        expires: null,
        token: data.access_token,
        updated_at: new Date().toISOString(),
        user_id: user.id,
      },
      { onConflict: 'token' },
    );

    if (error) throw error;

    const accounts = metadata.accounts.map((account) => ({
      id: account.id,
      user_id: user.id,
      name: account.name,
      mask: account.mask,
      type: account.type,
      subtype: account.subtype,
      verification_status: account.verification_status,
      institution: `${metadata.institution?.name}%${metadata.institution?.institution_id}`,
    }));

    const results = (
      await Promise.all(
        accounts.map((account) =>
          supabase.from('accounts').upsert(account, { onConflict: 'id' }),
        ),
      )
    ).filter(({ error }) => (error ? true : false));

    if (results.filter(({ error }) => error).length > 0)
      throw new Error('Error upserting accounts');

    cookieStore.set('access_token', data.access_token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
    });

    cookieStore.set('item_id', data.item_id, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false });
  }
}
