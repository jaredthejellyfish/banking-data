import Link from 'next/link';

import LandingNav from '@/components/landing-nav';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col space justify-between items-center relative">
      <LandingNav />
      <div className="flex items-center flex-col justify-center gap-y-5 sm:mb-12 animate-in zoom-in duration-1000 mb-[70%]">
        <h1 className="z-20 text-4xl sm:text-6xl xl:text-7xl font-semibold text-center">
          Effortles money flow, <br />
          <span className="bg-gradient-to-br from-[#8f00b3] to-[#FF6600] bg-clip-text text-transparent">
            simplified control.
          </span>
        </h1>
        <span className="block sm:w-[550px] text-center text-neutral-300/80 px-4 sm:p-0 sm:text-lg font-medium">
          Streamline your finances with ease. Automate and control your money
          distribution seamlessly, without any coding required. Experience a new
          level of financial efficiency.
        </span>
        <Link
          href="/welcome"
          className="border pr-6 pl-6 flex-row items-center justify-center py-2 rounded-md border-white hover:bg-white group hover:text-black transition-all gap-x-2 duration-300 sm:hidden flex"
        >
          <span>Get Started</span>
        </Link>
      </div>

      <div className="w-full sm:flex items-center justify-around pb-9 pt-10 animate-in slide-in-from-bottom fade-in duration-1000 h-12 sm:h-auto gap-x-8 px-10 opacity-0 bg-gradient-to-b from-transparent to-black/30 bg-opacity-20 sm:opacity-90 hidden">
        <div className="flex flex-col max-w-sm ">
          <span className="font-bold text-">Automated Transfers</span>
          <span className="text-neutral-200/80 text-sm">
            Set personalized rules for your financial distribution, allowing you
            to tailor the flow of funds to match your unique needs.
          </span>
        </div>

        <div className="flex flex-col max-w-sm ">
          <span className="font-bold text-">Customizable Rules</span>
          <span className="text-neutral-200/80 text-sm">
            Set personalized rules for your financial distribution, allowing you
            to tailor the flow of funds to match your unique needs.
          </span>
        </div>
        <div className="flex flex-col max-w-sm ">
          <span className="font-bold text-">Real-Time Tracking</span>
          <span className="text-neutral-200/80 text-sm">
            Stay informed with real-time updates and insights into your
            financial movements, giving you complete control and peace of mind.
          </span>
        </div>
      </div>

      <div className="absolute top-0 bottom-0 right-0 left-0 -z-10 overflow-hidden sm:blur-[160px] blur-3xl">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute size-[700px] -z-10 -left-20 -bottom-10 blob1"
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
          className="absolute size-[700px] right-0 -z-10 blob3 fill-blue-700/80"
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
