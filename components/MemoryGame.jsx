import React, { useState, useEffect } from "react";

const MemoryGame = ({ taskIndex, onComplete }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const cardValues = ["A", "B", "C", "D", "E", "F"];
    const shuffledCards = [...cardValues, ...cardValues] // Duplicate cards for matching
      .sort(() => Math.random() - 0.5) // Shuffle
      .map((value, index) => ({
        value,
        id: index,
        flipped: false,
        matched: false,
      }));
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (index) => {
    if (disabled || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    setFlippedIndices((prev) => [...prev, index]);

    if (flippedIndices.length === 1) {
      const [firstIndex] = flippedIndices;
      if (newCards[firstIndex].value === newCards[index].value) {
        setMatchedPairs((prev) => prev + 1);
        newCards[firstIndex].matched = true;
        newCards[index].matched = true;
        if (matchedPairs + 1 === cards.length / 2) {
          // Fix here
          onComplete("win", taskIndex); // Complete game on match
        }
      } else {
        setDisabled(true);
        setTimeout(() => {
          newCards[firstIndex].flipped = false;
          newCards[index].flipped = false;
          setCards([...newCards]);
          setDisabled(false);
        }, 1000);
      }
      setFlippedIndices([]);
    }
  };
  const closeGame = () => {
    // Reset the game state
    setCards([]);
    setFlippedIndices([]);
    setMatchedPairs(0);
    setDisabled(false);

    // Notify that the game is closed
    onComplete("close", taskIndex);
  };


  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center z-20">
      <h2 className="text-2xl font-bold mb-4">Memory Game</h2>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <button
            key={index}
            className="w-16 h-16 bg-gray-700 text-xl font-bold flex items-center justify-center"
            onClick={() => handleCardClick(index)}
            disabled={card.flipped || card.matched}
          >
            {card.flipped || card.matched ? card.value : "?"}
          </button>
        ))}
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={closeGame}
        >
          Close Game
        </button>
      </div>
    </div>
  );
};

export default MemoryGame;
