'use client'
import React, {useEffect, useState} from 'react';

interface FlipCardProps {
    className?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({ className }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardNum, setCardNum] = useState<number>(0); // Initialize with 0 or any placeholder value

  useEffect(() => {
    // Generate and set the random number only once when the component mounts
    // This ensures the number is consistent between SSR and CSR on initial load
    setCardNum(Math.floor(Math.random() * 9));
  }, []);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const CardBack = () => (
    <div className="flip-card-back flex items-center justify-center text-white p-4 rounded-sm bg-blue-500">
      <div className="text-center">
        <div className="flex justify-start items-center w-full max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-black" style={{ fontFamily: '"Banana Grotesk"', marginLeft: '8px' }}>
                n-back
            </h1>
        </div>
      </div>
    </div>
  );

 
  return (
    <div className={`perspective ${className}`}>
      <div
        className={`rounded flip-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleClick}
      >
        <div className="select-none flip-card-inner border border-2 border-gray-500 rounded-[17px]">
          <div className="flip-card-front flex items-center justify-center text-white p-4">
            {/* Front content here */}
            <h2 className="text-[#ff7f00] text-4xl font-bold">{cardNum}</h2>
          </div>
          <CardBack />
        </div>
      </div>
    </div>
  );
};
