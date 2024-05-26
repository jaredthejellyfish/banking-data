import type { SupabaseClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import React from 'react';

import { plaidClient } from '@/lib/plaid/client';
import { createClient } from '@/lib/supabase/server';
import type { Account, Database } from '@/lib/supabase/types';

type Props = {
  params: {
    id: string;
  };
};

const getAccount = async (
  id: string,
  userId: string,
  supabase: SupabaseClient<Database>,
): Promise<{ data: Account | null; error: boolean }> => {
  try {
    const { data: account } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', id)
      .single();

    if (
      !account ||
      new Date(account?.updated_at ?? 0) < new Date(Date.now() - 60 * 60 * 1000)
    ) {
      const { data: accessToken, error: accessTokenError } = await supabase
        .from('user_tokens')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (accessTokenError) {
        console.error(accessTokenError);
        throw new Error('Access token not found');
      }

      const { data: updatedAccount } = await plaidClient.accountsGet({
        access_token: accessToken.token,
      });

      const { data: balancesData } = await plaidClient.accountsBalanceGet({
        access_token: accessToken.token,
      });

      const updatedAccountData = updatedAccount.accounts.find(
        (updatedAccount) => updatedAccount.account_id === id,
      );

      const balancesDataForAccount = balancesData.accounts.find(
        (balanceData) => balanceData.account_id === id,
      );

      if (
        !updatedAccountData ||
        !balancesDataForAccount ||
        updatedAccountData.mask === null ||
        updatedAccountData.name === null ||
        updatedAccountData.subtype === null ||
        updatedAccountData.type === null
      )
        throw new Error('Account not found');

      const updateAccountDataAsAccount: Account = {
        id: id,
        balance: balancesDataForAccount?.balances.current ?? null,
        mask: updatedAccountData.mask,
        name: updatedAccountData.name,
        subtype: updatedAccountData.subtype,
        type: updatedAccountData.type,
        updated_at: new Date().toISOString(),
        institution: account?.institution ?? null,
        created_at: account?.created_at ?? new Date().toISOString(),
        user_id: userId,
        verification_status: updatedAccountData?.verification_status ?? null,
      };
      if (updatedAccountData) {
        await supabase
          .from('accounts')
          .upsert(updateAccountDataAsAccount, { onConflict: 'id' })
          .eq('account_id', id);
        return { error: false, data: updateAccountDataAsAccount };
      }
    }
    return { error: false, data: account };
  } catch {
    return { error: true, data: null };
  }
};

async function Account({ params: { id } }: Props) {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error ?? !user) {
    redirect('/welcome');
  }

  const { data: account } = await getAccount(id, user.id, supabase);

  return (
    <div>
      Account <pre>{JSON.stringify(account, null, 2)}</pre>
    </div>
  );
}

export default Account;
