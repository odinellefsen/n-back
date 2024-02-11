'use client'
import Image from "next/image";
import {FlipCard} from "@/components/FlipCard";
import {useState} from "react";

export default function Home() {
  const [isLocked, setIsLocked] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full px-6 py-4 flex justify-center items-center shadow-md">
        <div className="flex justify-start items-center w-full max-w-2xl mx-auto">
          <Image src="/icons/logo.svg" alt="Logo" width={40} height={40} className="text-[#4281A4]" />
          <h1 className="text-2xl font-bold" style={{ fontFamily: '"Banana Grotesk"', marginLeft: '8px' }}>
            n-back
          </h1>
        </div>
      </header>
      <div className="flex flex-1 items-center justify-center p-24">
        {/* Container for all FlipCards including the standalone one */}
        <div className="p-10 flex items-center gap-4 overflow-x-auto no-scrollbar" style={{ maxWidth: '100%' }}>
          {/* Standalone FlipCard with extra margin for visual separation */}
          <div className="mr-20"> {/* Adjust right margin as needed */}
            <FlipCard />
          </div>
          
          {/* The rest of the FlipCards */}
          <FlipCard className="card" />
          <FlipCard className="card" />
          <FlipCard className="card" />
          <FlipCard className="card" />
          <FlipCard className="card" />
          {/* Add more FlipCard components as needed */}
        </div>
      </div>
    </div>
  );
}
