'use client'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import {FlipCard} from "@/components/FlipCard";

const N_BACK = 5; // Define the n-back level, e.g., 3 for a 3-back game
const INITIAL_CARDS_COUNT = 20; // Total number of cards to generate for the game

export default function Home() {
  const [cards, setCards] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGuessingTime, setIsGuessingTime] = useState(false); // New state to track if it's time for guessing
  const [leavingCardIndex, setLeavingCardIndex] = useState<number | null>(null); // Track the index of the card leaving

  // Generate a random sequence of single-digit numbers
  useEffect(() => {
    const initialSequence = Array.from({ length: INITIAL_CARDS_COUNT }, () => Math.floor(Math.random() * 10));
    setCards(initialSequence);
  }, []);

  const handleContinue = () => {
    // Advance the game to the next card and reset the leaving card state
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setLeavingCardIndex(null); // Reset the leaving card index on continue

    // Toggle the guessing state based on the game progress
    if (nextIndex >= N_BACK) {
      setIsGuessingTime(true);
    }
  };

  const handleGuess = (guess: 'same' | 'notSame') => {
    // Correctly identifying the card for comparison
    const comparisonIndex = currentIndex - N_BACK;
    const correctGuess = cards[currentIndex] === cards[comparisonIndex];
  
    if ((guess === 'same' && correctGuess) || (guess === 'notSame' && !correctGuess)) {
      alert('Correct!');
      
      // When a guess is correct, identify the card to animate out.
      // This logic assumes the displayed order is reversed from the logical 'cards' array.
      // Calculate the visual index for the card being removed in a reversed display.
      const totalCardsShown = currentIndex + 1; // Total cards including the current one
      const visualIndexForAnimation = N_BACK - 1; // In a reversed display, this is constant.
  
      setLeavingCardIndex(visualIndexForAnimation); // Use this for applying the animation class
    } else {
      alert('Incorrect. Game Over.');
      // Handle incorrect guess, potentially resetting the game
    }
  
    // Proceed to the next card after the guess
    setIsGuessingTime(false); // Reset guessing time for the next cycle
    setTimeout(() => {
      handleContinue(); // Continue to the next card after a delay for animation
    }, 1000); // Match this with your CSS animation duration
  };
  

  return (
    <div className="flex flex-col justify-center min-h-screen w-full">
      <header className="absolute top-0 w-full px-6 py-4 flex justify-center items-center shadow-md">
        <div className="flex justify-start items-center w-full max-w-2xl mx-auto">
          <Image src="/icons/logo.svg" alt="Logo" width={40} height={40} className="text-[#4281A4]" />
          <h1 className="text-2xl font-bold" style={{ fontFamily: '"Banana Grotesk"', marginLeft: '8px' }}>
            n-back
          </h1>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center w-full px-4 py-4">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar" style={{ maxWidth: '100%' }}>
          {/* Display the current card */}
          {cards.slice(currentIndex, currentIndex + 1).map((cardNum, index) => (
            <FlipCard key={`shown-${index}`} isFlipped={false} cardNum={cardNum} />
          ))}
          {/* face down cards section */}
          {cards.slice(Math.max(0, currentIndex - N_BACK), currentIndex).reverse().map((cardNum, index) => (
            <FlipCard
              key={`hidden-${index}`}
              isFlipped={true}
              cardNum={cardNum}
              // Ensure the class is applied based on the adjusted visual index for animation
              className={index === leavingCardIndex ? 'card-leaving' : ''}
            />
          ))}

        </div>
        {/* Conditionally render guess buttons only when it's time to guess */}
        {isGuessingTime && (
          <div className="mt-12 flex justify-center w-full">
            <button className="bg-green-500 text-white px-10 py-4 rounded text-2xl min-w-[180px]" onClick={() => handleGuess('same')}>Same</button>
            <button className="bg-red-500 text-white px-10 py-4 rounded text-2xl min-w-[180px] ml-4" onClick={() => handleGuess('notSame')}>Not Same</button>
          </div>
        )}
        { isGuessingTime == false && (
          <button className="bg-blue-500 text-white px-10 py-4 rounded text-2xl min-w-[180px] ml-4 mt-4" onClick={handleContinue}>Continue</button>
        )
        }
      </div>
    </div>
  );
}
