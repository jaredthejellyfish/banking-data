import type { SupabaseClient } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

import USBank from '@p/us-bank-logo.png';

import { plaidClient } from '@/lib/plaid/client';
import { createClient } from '@/lib/supabase/server';
import type { Account, Database } from '@/lib/supabase/types';

const institutions = [
  {
    name: 'U.S. Bank',
    id: 'ins_127990',
    logo: USBank,
  },
];

const getAccounts = async (
  userId: string,
  supabase: SupabaseClient<Database>,
): Promise<{ data: Account[] | null; error: boolean }> => {
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
};

async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error ?? !user) {
    redirect('/welcome');
  }

  const { data: userAccounts } = await getAccounts(user.id, supabase);

  return (
    <main className="flex flex-col">
      <span>Accounts</span>
      <div className="flex flex-row gap-x-3">
        {userAccounts?.map((account) => (
          <Link
            href={`/accounts/${account.id}`}
            key={account.id}
            className="flex flex-row border gap-x-3 p-4 rounded-xl items-center justify-center"
          >
            <Image
              src={
                institutions.find((i) => i.id === account.institution)?.logo ??
                USBank
              }
              alt={
                account.institution?.split('%')[0] ?? "account's institution"
              }
              width={60}
              height={60}
              className="bg-white rounded-full p-1"
            />
            <div className="flex-col flex max-w-lg w-full">
              <span>{account.name}</span>
              <span>{account.type}</span>
              <span>
                {account.mask} | {account.subtype}
              </span>
              <span>{account.balance}</span>
              <span>{account.institution?.split('%')[0]}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default DashboardPage;
