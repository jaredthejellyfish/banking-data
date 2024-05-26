import { redirect } from 'next/navigation';
import React from 'react';

import getAccount from '@u/getAccount';
import syncTransactionsForAccount from '@u/syncTransactionsForAccount';

import { createClient } from '@/lib/supabase/server';

type Props = {
  params: {
    id: string;
  };
};

async function AccountPage({ params: { id } }: Props) {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error ?? !user) {
    redirect('/welcome');
  }

  const { data: account } = await getAccount(id, user.id, supabase);
  const transactions = await syncTransactionsForAccount(user.id, id, supabase);

  return (
    <div>
      Account <pre>{JSON.stringify(account, null, 2)}</pre>
      <div className="relative overflow-x-auto px-8">
        <table className="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400 rounded-xl overflow-hidden">
          <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400">
            <tr className="bg-neutral-900">
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.data.map((transaction) => (
              <tr
                className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700"
                key={transaction.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap dark:text-white"
                >
                  {transaction.name}
                </th>
                <td className="px-6 py-4">{transaction.amount}</td>
                <td className="px-6 py-4">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountPage;
