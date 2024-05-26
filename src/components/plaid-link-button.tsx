'use client';

import React, {
  startTransition,
  useCallback,
  useEffect,
  useState,
} from 'react';
import type { PlaidLinkOnSuccess } from 'react-plaid-link';
import { usePlaidLink } from 'react-plaid-link';

import incrementProgress from '@/app/welcome/views/action/action';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import cn from '@/lib/utils/cn';

type Props = {
  className?: string;
};

export default function PlaidLinkButton({ className }: Props) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch('/api/plaid/link', {
        method: 'POST',
      });

      const { linkToken } = (await response.json()) as {
        linkToken: string | null;
      };
      setToken(linkToken);
    };
    createLinkToken().catch(console.error);
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (publicToken, metadata) => {
      const res = await fetch('/api/plaid/callback', {
        method: 'POST',
        body: JSON.stringify({ publicToken, metadata }),
      });

      const { ok } = (await res.json()) as { ok: boolean };

      if (ok) {
        startTransition(async () => {
          await incrementProgress();
        });
      } else {
        console.error('Failed to connect bank account');
      }
    },
    [],
  );

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => void open()}
          disabled={!ready}
          className={cn(
            'w-[240px] border flex flex-row items-center justify-center pr-3 pl-1.5 py-2 rounded-md border-white disabled:opacity-70 hover:bg-white group hover:text-black transition-all gap-x-2 duration-300',
            className,
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="800"
            width="800"
            viewBox="50 -30 400 400"
            className="size-7"
          >
            <path
              className="fill-white group-hover:fill-black transition-all"
              d="M370.987 264.145l-43.522-43.521 34.207-34.205 23.267 23.268zm-9.315-118.773l-34.207-34.205 43.522-43.52 13.952 54.46zM296.008 33.171l54.457 13.95-43.521 43.523-34.205-34.205zM231.693 56.44l-34.206 34.204-43.52-43.521 54.458-13.952zM133.44 67.643l43.524 43.525-34.204 34.204-23.272-23.272zm9.32 118.774l34.204 34.204-43.524 43.524-13.952-54.457zm65.663 112.203l-54.46-13.952 43.524-43.523 34.205 34.206zm77.997-77.997l-34.205 34.205-34.206-34.205 34.206-34.206zm20.523-88.934l34.205 34.206-34.205 34.205-34.206-34.205zm-75.251 34.206L197.487 200.1l-34.204-34.205 34.204-34.204zm-13.681-54.727l34.205-34.205 34.204 34.204-34.205 34.205zm54.726 164.183l34.206-34.204 43.52 43.521-54.458 13.95zM391.6 305.28l26.51-103.47-35.915-35.914 35.912-35.917-26.508-103.471L288.128 0l-35.912 35.916L216.297.001l-103.47 26.51-26.508 103.47 35.918 35.914-35.918 35.917 26.508 103.47 103.472 26.509 35.916-35.918 35.914 35.916zm97.661"
            />
          </svg>

          <span>Connect with Plaid</span>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
}
