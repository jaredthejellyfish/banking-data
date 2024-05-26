import React from 'react';

import type { Account } from '@/lib/supabase/types';

import AccountsSection from './accounts-section';

type Props = Readonly<{
  accounts: Account[] | null;
}>;

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function Accounts({ accounts }: Props) {
  const allSubtypes =
    accounts?.map((account) => capitalize(account.subtype)) ?? [];

  return (
    <div className="flex flex-col gap-y-0.5">
      <span className="font-semibold text-lg">Accounts</span>
      <div className="rounded-xl bg-neutral-800 sm:max-w-md sm:min-w-[400px]">
        <ul>
          {allSubtypes.map((subtype, index) => {
            const filteredAccounts = accounts?.filter(
              (account) => account.subtype === subtype.toLowerCase(),
            );

            if (!filteredAccounts) return null;

            const balance = filteredAccounts.reduce(
              (acc, account) => acc + (account.balance ?? 0),
              0,
            );

            return (
              <AccountsSection
                key={subtype}
                name={subtype}
                balance={balance}
                accounts={filteredAccounts}
                position={
                  index === 0
                    ? 'top'
                    : index === allSubtypes.length - 1
                      ? 'bottom'
                      : null
                }
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Accounts;
