'use client';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import { institutions } from '@/lib/data/institutions';
import type { Account } from '@/lib/supabase/types';
import { cn } from '@/lib/utils';

type Props = {
  name: string;
  balance: number;
  accounts: Account[];
  position: 'top' | 'bottom' | null;
};

function AccountsSection({ name, balance, accounts, position }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className="flex flex-col">
      <ul
        className={cn(
          'flex flex-row gap-x-3 w-full justify-between p-3 cursor-pointer',
          position === 'top'
            ? 'hover:bg-red-500 rounded-t-xl'
            : position === 'bottom'
              ? isOpen
                ? 'rounded-b-none hover:bg-red-500'
                : 'hover:bg-red-500 rounded-b-xl'
              : '',
        )}
        onClick={() => setIsOpen((o) => !o)}
      >
        <li>{name}</li>
        <li className="ml-auto">${balance}</li>
        <li>
          <ChevronDown />
        </li>
      </ul>
      <ul
        className={cn(
          'h-0 opacity-0 pointer-events-none transition-transform',
          isOpen && 'h-auto opacity-100 pointer-events-auto',
        )}
      >
        {accounts.map((account) => {
          const logo = institutions.find(
            (i) => i.id === account.institution?.split('%')[1] ?? '',
          )?.logo;

          return (
            <li
              key={account.id}
              className={cn(
                'flex flex-row gap-x-3 p-2 items-center justify-between border-y-neutral-700 border border-transparent',
                position === 'bottom' && isOpen && 'border-b-transparent',
              )}
            >
              {logo ? (
                <Image
                  src={logo}
                  alt={
                    account.institution?.split('%')[0] ??
                    "account's institution"
                  }
                  width={40}
                  height={40}
                  className="bg-white rounded-full p-0"
                />
              ) : (
                <div className="size-[40px] bg-white rounded-full items-center justify-center flex text-black text-xs">
                  N/A
                </div>
              )}
              <div className="flex flex-col">
                <span>{account.name}</span>
                <span className="text-sm opacity-60 flex flex-row items-center justify-start">
                  •• {account.mask} | {account.institution?.split('%')[0]}
                </span>
              </div>
              <span className="ml-auto">${account.balance}</span>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export default AccountsSection;
