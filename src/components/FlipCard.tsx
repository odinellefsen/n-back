'use client'
import React from 'react';

interface FlipCardProps {
    className?: string;
    isFlipped: boolean;
    cardNum: number; // Ensures the card number is passed as a prop for display
}

export const FlipCard: React.FC<FlipCardProps> = ({ className, isFlipped, cardNum }) => {
  // Conditional rendering for the card's content based on isFlipped state
  const renderCardContent = () => {
    if (isFlipped) {
      return (
        <div className="flip-card-back flex items-center justify-center text-white p-4 rounded-sm bg-blue-500">
          {/* Placeholder or design for the back of the card */}
          <div className="text-center">
            {/* Optionally, show some content or leave blank */}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flip-card-front flex items-center justify-center text-white p-4 rounded-sm bg-green-500">
          <h2 className="text-4xl font-bold">{cardNum}</h2>
        </div>
      );
    }
  };

  return (
    <div className={`py-10 perspective ${className}`}>
      <div className={`rounded flip-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="select-none flip-card-inner border border-2 border-gray-500 rounded-[17px]">
          {renderCardContent()}
        </div>
      </div>
    </div>
  );
};
