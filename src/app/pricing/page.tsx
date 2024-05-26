import { Check } from 'lucide-react';
import React from 'react';

import LandingNav from '@/components/landing-nav';

function PricingPage() {
  return (
    <main className="flex min-h-screen flex-col space justify-between items-center relative">
      <LandingNav />
      <div className="md:p-10 p-3 pt-10 rounded-xl bg-gradient-radial from-black/30 to-transparent via-transparent">
        <div>
          <h1 className="text-center md:text-6xl text-5xl font-semibold">
            Worry about your money, <br />
            <span className="bg-gradient-to-br from-[#8f00b3] to-[#FF6600] bg-clip-text text-transparent">
              not your time.
            </span>
          </h1>
          <h2 className="text-center my-4 text-neutral-300 md:text-lg">
            We wanted pricing to be as simple as possible. No calculator needed.
          </h2>
        </div>
        <div className="flex flex-col xl:flex-row items-center justify-around gap-x-8 gap-y-4 animate-in zoom-in duration-1000 fade-in">
          <div className="bg-white text-black bg-opacity-80 px-8 py-6 rounded-xl flex flex-col gap-y-2 shadow-xl w-full xl:w-[350px] md:min-h-[560px] md:hover:scale-105 transition-all">
            <span className="text-lg font-semibold">Simple</span>
            <p className="text-sm my-4">
              Automate your fund transfers and stay updated effortlessly.
            </p>

            <span className="text-4xl">
              $0
              <span className="text-base">/month</span>
            </span>

            <button className="p-3 my-5 rounded-md border border-purple-500 text-purple-500">
              Get Started
            </button>
            <div className="flex flex-col gap-y-3 mb-5">
              <span className="flex-row flex items-center gap-x-3 text-sm">
                <Check size={16} className="text-purple-600" />
                <p>Automated fund transfers to up to 3 accounts</p>
              </span>
              <span className="flex-row flex items-center gap-x-3 text-sm">
                <Check size={16} className="text-purple-600" />
                <p>Customizable financial distribution rules</p>
              </span>
              <span className="flex-row flex items-center gap-x-3 text-sm">
                <Check size={16} className="text-purple-600" />
                <p>Real-time tracking and notifications</p>
              </span>
            </div>
            <span className="text-xs mt-auto mb-2">
              * Plan only supports 10 transactions per month.
            </span>
          </div>

          <div className="bg-white text-black bg-opacity-80 px-8 py-6 rounded-xl flex flex-col gap-y-2 border-4 border-purple-500 shadow-xl w-full xl:w-[350px] md:min-h-[560px] md:hover:scale-105 transition-all">
            <span className="text-lg font-semibold">Premium</span>
            <p className="text-sm my-4">
              Gain advanced control over your finances with enhanced features
              and support.
            </p>

            <span className="text-4xl">
              $9.99
              <span className="text-base">/month</span>
            </span>

            <button className="p-3 my-5 rounded-md border border-transparent text-white bg-purple-500">
              Get Started
            </button>
            <div className="flex flex-col gap-y-3 mb-5">
              <span className="flex-row flex items-center gap-x-3 text-sm">
                <Check size={16} className="text-purple-600" />
                <p>Automated fund transfers to up to 10 accounts.</p>
              </span>
              <span className="flex-row flex items-center gap-x-3 text-sm">
                <Check size={16} className="text-purple-600" />
                <p>Advanced customizable financial distribution rules.</p>
              </span>
              <span className="flex-row flex items-center gap-x-3 text-sm">
                <Check size={16} className="text-purple-600" />
                <p>Real-time tracking with detailed insights.</p>
              </span>
              <span className="flex-row flex items-center gap-x-3 text-sm">
                <Check size={16} className="text-purple-600" />
                <p>Priority customer support.</p>
              </span>
              <span className="flex-row flex items-center gap-x-3 text-sm">
                <Check size={16} className="text-purple-600" />
                <p>Integration with external financial apps.</p>
              </span>
            </div>
          </div>

          <div className="bg-white text-black bg-opacity-80 px-8 py-6 rounded-xl flex flex-col gap-y-2 shadow-xl w-full xl:w-[350px] md:min-h-[560px] md:hover:scale-105 transition-all">
            <span className="text-lg font-semibold">Enterprise</span>
            <p className="text-sm my-4">
              Experience unlimited financial automation and premium support for
              your business needs.
            </p>

            <span className="text-4xl">
              $29.99
              <span className="text-base">/month</span>
            </span>

            <button className="p-3 my-5 rounded-md border border-purple-500 text-purple-500">
              Get Started
            </button>
            <div className="flex flex-col gap-y-3 mb-5">
              <span className="flex-row flex items-center gap-x-3 text-sm">
                <Check size={16} className="text-purple-600" />
                <p>
                  Unlimited automated fund transfers to any number of accounts
                </p>
              </span>
              <span className="flex-row flex items-center gap-x-3 text-sm">
                <Check size={16} className="text-purple-600" />
                <p>Comprehensive customizable financial distribution rules</p>
              </span>
              <span className="flex-row flex items-center gap-x-3 text-sm">
                <Check size={16} className="text-purple-600" />
                <p>Real-time tracking with in-depth analytics and reporting</p>
              </span>
              <span className="flex-row flex items-center gap-x-3 text-sm">
                <Check size={16} className="text-purple-600" />
                <p>Dedicated account manager</p>
              </span>
            </div>
            <span className="text-xs">
              * All features from the Premium plan are also included
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-0 bottom-0 right-0 left-0 -z-10 overflow-hidden sm:blur-[160px] blur-3xl">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute size-[700px] -z-10 left-20 -bottom-10 blob1"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
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
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
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
          className="absolute size-[700px] right-0 -z-10 blob3 "
        >
          <defs>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
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
    </main>
  );
}

export default PricingPage;
