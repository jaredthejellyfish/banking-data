import type { SupabaseClient } from '@supabase/supabase-js';

import { plaidClient } from '@/lib/plaid/client';
import type { Account, Database } from '@/lib/supabase/types';

export default async function getAccounts(
  userId: string,
  supabase: SupabaseClient<Database>,
): Promise<{ data: Account[] | null; error: boolean }> {
  try {
    const { data: accounts, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw new Error('Error fetching accounts');
    }

    const needUpdate = accounts.some(
      (account) =>
        new Date(account.updated_at) > new Date(Date.now() - 1000 * 60 * 60),
    );

    if (!needUpdate || accounts.length > 0) {
      return { error: false, data: accounts };
    }

    const { data: accessToken, error: accessTokenError } = await supabase
      .from('user_tokens')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (accessTokenError) {
      console.error(accessTokenError);
      throw new Error('Access token not found');
    }

    const { data: updatedAccounts } = await plaidClient.accountsGet({
      access_token: accessToken.token,
    });

    const { data: balancesData } = await plaidClient.accountsBalanceGet({
      access_token: accessToken.token,
    });

    const accountsToUpdate = updatedAccounts.accounts.map((updatedAccount) => {
      const balancesDataForAccount = balancesData.accounts.find(
        (balanceData) => balanceData.account_id === updatedAccount.account_id,
      );

      if (
        !balancesDataForAccount ||
        updatedAccount.mask === null ||
        updatedAccount.name === null ||
        updatedAccount.subtype === null ||
        updatedAccount.type === null
      )
        throw new Error('Account not found');

      return {
        id: updatedAccount.account_id,
        balance: balancesDataForAccount.balances.current,
        mask: updatedAccount.mask,
        name: updatedAccount.name,
        subtype: updatedAccount.subtype,
        type: updatedAccount.type,
        updated_at: new Date().toISOString(),
        institution:
          accounts.find((account) => account.id === updatedAccount.account_id)
            ?.institution ?? null,
        user_id: userId,
        verification_status: updatedAccount.verification_status,
      };
    });

    const { error: updateError, data: updatedAccountsFromDB } = await supabase
      .from('accounts')
      .upsert(accountsToUpdate, { ignoreDuplicates: true })
      .select();

    if (updateError) {
      console.error(updateError);
      throw new Error('Error updating accounts');
    }

    return { error: false, data: updatedAccountsFromDB };
  } catch {
    return { error: true, data: null };
  }
}
