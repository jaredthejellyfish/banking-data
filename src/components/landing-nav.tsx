'use client';

import { useCycle } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

import logo from '@p/logo.png';

import { cn } from '@/lib/utils';

const sections = [
  { title: 'About', href: '/about' },
  { title: 'Team', href: '/team' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Resources', href: '/resources' },
];

function LandingNav() {
  const [isOpen, toggleOpen] = useCycle(false, true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      <nav className="w-full pt-5 md:px-[8%] flex flex-row items-center justify-between px-8">
        <Link href={'/'}>
          <Image
            src={logo}
            width={64}
            height={64}
            alt="logo"
            className="size-16 sm:size-24 rounded-full"
          />
        </Link>
        <div className="font-semibold flex-row items-center justify-between gap-x-6 sm:gap-x-10 xl:gap-x-20 lg:text-lg sm:flex hidden">
          {sections.map((section) => (
            <Link key={section.title} href={section.href}>
              {section.title}
            </Link>
          ))}
        </div>
        <Link
          href="/welcome"
          className="border pr-6 pl-6 flex-row items-center justify-center py-2 rounded-md group transition-all gap-x-2 duration-300 sm:flex hidden  bg-gradient-to-bl from-[#8f00b3] to-[#FF6600] hover:scale-105"
        >
          <span>Start</span>
        </Link>

        <button onClick={() => toggleOpen()} className="sm:hidden block size-9">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="#fff" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
        </button>
      </nav>
      <div
        className={cn(
          'bg-black absolute top-0 left-0 right-0 bottom-0 z-50 sm:pointer-events-none max-h-[100vh] transition-all',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <div className="relative flex items-center justify-center h-full flex-col gap-y-8">
          <button
            className="absolute top-9 right-8 text-black size-9"
            onClick={() => toggleOpen()}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="#000" d="M4 6h16v2H4z" />
              <path
                fill="#fff"
                d="M7.05 5.636 18.364 16.95l-1.414 1.414L5.636 7.05z"
              />
              <path
                fill="#fff"
                d="M5.636 16.95 16.95 5.636l1.414 1.414L7.05 18.364z"
              />
            </svg>
          </button>
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              onClick={() => toggleOpen()}
              className="text-white z-50 text-xl font-semibold"
            >
              {section.title}
            </Link>
          ))}
        </div>
        <div className="absolute top-0 bottom-0 right-0 left-0 -z-10 overflow-hidden blur-3xl">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute size-[700px] -z-10 -left-20 -bottom-10 blob1"
          >
            <defs>
              <linearGradient
                id="gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: '#8f00b3', stopOpacity: 1 }}
                />
                <stop
                  offset="65%"
                  style={{ stopColor: '#FF6600', stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              d="M32.7,-53.6C43,-44.3,52.5,-36.3,62.2,-25.4C72,-14.4,82.1,-0.6,80.7,11.8C79.2,24.2,66.2,35.1,54.7,46.3C43.3,57.4,33.4,68.8,20.8,74.1C8.1,79.3,-7.3,78.5,-21.8,74.2C-36.2,69.9,-49.6,62.2,-53.6,50.4C-57.7,38.6,-52.5,22.7,-53.4,8.4C-54.4,-5.9,-61.5,-18.6,-57.6,-25.9C-53.7,-33.3,-38.8,-35.2,-27.4,-44C-15.9,-52.8,-8,-68.3,1.6,-70.9C11.2,-73.4,22.4,-62.9,32.7,-53.6Z"
              transform="translate(100 100)"
              fill="url(#gradient1)"
            />
          </svg>

          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute size-[60%] -top-10 left-2 -z-10 blob2"
          >
            <defs>
              <linearGradient
                id="gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: '#0066ff', stopOpacity: 1 }}
                />
                <stop
                  offset="80%"
                  style={{ stopColor: '#ffff99', stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              d="M41.2,-63.6C48.6,-59.5,46.2,-39.8,51.2,-24.6C56.1,-9.5,68.3,1,67.9,10.3C67.4,19.6,54.3,27.7,42.9,32.7C31.6,37.7,21.9,39.7,12.1,43.6C2.4,47.5,-7.5,53.3,-20.8,56.1C-34.1,59,-50.9,58.8,-60.5,50.7C-70.1,42.7,-72.6,26.7,-76.3,10.1C-80,-6.5,-84.9,-23.7,-75.7,-30.8C-66.6,-37.8,-43.4,-34.7,-28.5,-35.4C-13.5,-36.1,-6.8,-40.5,5.1,-48.5C17,-56.4,33.9,-67.8,41.2,-63.6Z"
              transform="translate(100 100)"
              fill="url(#gradient2)"
            />
          </svg>

          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute size-[700px] right-0 -z-10 blob3 fill-blue-700/80"
          >
            <defs>
              <linearGradient
                id="gradient3"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: '#990099', stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: '#00cc99', stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              d="M37.9,-49.3C52.7,-49.5,70.6,-45,77.8,-34.1C85,-23.3,81.4,-6,77.4,10C73.4,26.1,68.9,41,58,46C47.1,51.1,29.6,46.2,15.6,47.9C1.6,49.6,-8.9,57.9,-19.2,58.2C-29.5,58.5,-39.5,50.7,-43.7,40.7C-47.9,30.8,-46.3,18.6,-44,8.7C-41.7,-1.2,-38.7,-8.7,-37.3,-19.1C-35.8,-29.5,-35.9,-42.7,-29.9,-46.6C-24,-50.4,-12,-44.9,-0.2,-44.6C11.6,-44.2,23.1,-49.1,37.9,-49.3Z"
              transform="translate(100 100)"
              fill="url(#gradient3)"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default LandingNav;
