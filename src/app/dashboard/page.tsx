import { format, formatDistanceToNow } from 'date-fns';
import { redirect } from 'next/navigation';
import React from 'react';

import getAccounts from '@u/getAccounts';
import syncTransactions from '@u/syncTransactions';

import Accounts from '@/components/accounts';
import Graph from '@/components/graph';
import { createClient } from '@/lib/supabase/server';
import type { Transaction } from '@/lib/supabase/types';
import { cn } from '@/lib/utils';

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();
  let greeting;

  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good night';
  }

  return greeting;
}

function formatAmount(amount: number) {
  const greaterThanZero = amount > 0;
  const amountWithoutSign = greaterThanZero ? amount : -amount;

  return `${greaterThanZero ? '+' : '-'} $${amountWithoutSign.toFixed(2)}`;
}

const transactionsForGraph = (transactions: Transaction[]) => {
  return transactions.map((transaction) => ({
    date: new Date(transaction.date).toISOString(),
    amount: transaction.amount,
  }));
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
  const { data: transactions } = await syncTransactions(user.id, supabase);
  const { data: accounts } = await getAccounts(user.id, supabase);

  return (
    <main className="px-8 py-4 flex flex-col justify-center gap-y-4">
      <h1 className="text-2xl font-semibold">
        {getGreeting()}, {user.email}
      </h1>
      <div className="flex flex-col sm:flex-row w-full gap-x-4 gap-y-2">
        <Graph data={transactionsForGraph(transactions)} />

        <Accounts accounts={accounts} />
      </div>

      <div className="relative overflow-x-auto">
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
            {transactions.map((transaction) => (
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
                <td
                  className={cn(
                    'px-6 py-4',
                    transaction.amount < 0 ? 'text-red-500' : 'text-green-500',
                  )}
                >
                  {formatAmount(transaction.amount)}
                </td>
                <td className="px-6 py-4">
                  {new Date(transaction.date) <
                  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    ? format(new Date(transaction.date), 'MMM d, yyyy')
                    : formatDistanceToNow(new Date(transaction.date), {
                        addSuffix: true,
                        includeSeconds: true,
                      })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default DashboardPage;
