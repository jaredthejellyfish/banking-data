'use client';

import { Check, ChevronRight, LoaderCircle, Radio, X } from 'lucide-react';
import React, { startTransition, useState } from 'react';

import incrementProgress from '@/app/welcome/views/action/action';
import { cn } from '@/lib/utils';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const testCookies = async () => {
  const res = await fetch('/api/plaid/test/cookies');
  const { result } = (await res.json()) as { result: boolean };

  return result;
};
const testTransactions = async () => {
  const res = await fetch('/api/plaid/test/transactions');
  const { result } = (await res.json()) as { result: boolean };

  return result;
};

type Props = {
  setIsSuccess: (isSuccess: boolean) => void;
};

function TestPlaidButton({ setIsSuccess: parentSetIsSuccess }: Props) {
  const [text, setText] = useState('Test the connection');
  const [showLoader, setShowLoader] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleClick = async () => {
    if (isSuccess) {
      startTransition(async () => {
        await incrementProgress();
      });

      return;
    }

    showLoader && setShowLoader(false);
    showCheck && setShowCheck(false);
    isSuccess && setIsSuccess(false);

    try {
      setIsLoading(true);

      setShowLoader(true);
      setText('Testing Auth...');

      const test1 = await testCookies();
      if (!test1) throw new Error('Failed to test cookies');

      await delay(1000);

      setShowLoader(false);
      setShowCheck(true);
      setText('Success');

      await delay(2000);

      setShowCheck(false);
      setShowLoader(true);

      setText('Testing Plaid...');

      const test2 = await testTransactions();
      if (!test2) throw new Error('Failed to test transactions');

      await delay(1000);

      setShowLoader(false);
      setShowCheck(true);
      setText('Success');

      await delay(2000);

      setIsSuccess(true);
      setIsLoading(false);
      setShowCheck(false);
      parentSetIsSuccess(true);
      setText('Next');

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setShowLoader(false);
      setShowCheck(false);
      setIsSuccess(false);
      setIsError(true);
      setText('Error');
    }
  };

  return (
    <div className="w-full">
      <button
        className="border pr-6 pl-6 flex w-[250px] flex-row items-center justify-center py-2 rounded-md border-white hover:bg-white group hover:text-black transition-all gap-x-2 duration-300"
        onClick={handleClick}
        disabled={isLoading}
      >
        <Radio
          className={cn(
            'w-6 h-6 mr-2',
            (isLoading || isSuccess || isError) && 'hidden',
          )}
        />
        <LoaderCircle
          className={cn(
            'w-6 h-6 animate-spin mr-2 text-blue-500',
            !showLoader && 'hidden',
          )}
        />
        <Check
          className={cn('w-6 h-6 mr-2 text-green-500', !showCheck && 'hidden')}
        />
        <X className={cn('w-6 h-6 mr-2 text-red-500', !isError && 'hidden')} />
        {text}
        <ChevronRight className={cn('w-6 h-6', !isSuccess && 'hidden')} />
      </button>
    </div>
  );
}

export default TestPlaidButton;
