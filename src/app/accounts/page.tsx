import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

import getAccounts from '@u/getAccounts';

import USBank from '@p/us-bank-logo.png';

import { createClient } from '@/lib/supabase/server';

const institutions = [
  {
    name: 'U.S. Bank',
    id: 'ins_127990',
    logo: USBank,
  },
];

async function AccountsPage() {
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

export default AccountsPage;
