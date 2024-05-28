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

    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError ?? !user) throw new Error('User not authenticated');

    const { data: existingAccounts, error: existingAccountsError } =
      await supabase.from('accounts').select('*').eq('user_id', user.id);

    if (existingAccountsError) throw existingAccountsError;

    if (existingAccounts.length > 0) {
      const { error } = await supabase
        .from('accounts')
        .delete()
        .eq('user_id', user.id);

      if (error) throw new Error('Error deleting existing accounts');
    }

    const { data } = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const { error } = await supabase.from('user_tokens').upsert(
      {
        user_id: user.id,
        token: data.access_token,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    );

    if (error) {
      console.error(error);
      throw new Error('Error upserting user token');
    }

    const { data: balancesData } = await plaidClient.accountsBalanceGet({
      access_token: data.access_token,
    });

    const accounts = metadata.accounts.map((account) => ({
      id: account.id,
      user_id: user.id,
      balance:
        balancesData.accounts.find(
          (balanceData) => balanceData.account_id === account.id,
        )?.balances.current ?? null,
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

    if (results.filter(({ error }) => error).length > 0) {
      console.error(results);
      throw new Error('Error upserting accounts');
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false });
  }
}
