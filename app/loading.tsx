'use client';

import Image from 'next/image';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="animate-pulse transform origin-center">
        <Image 
          src="/assets/png/Nexia-International-Logo.png" 
          alt="Loading" 
          width={200} 
          height={200}
          className="opacity-80 w-[200px] h-[200px] object-contain"
        />
      </div>
    </div>
  );
};

export default Loading;