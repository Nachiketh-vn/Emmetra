import React, { useState } from "react";

const NumberGuessingGame = ({ taskIndex, onComplete }) => {
  const [randomNumber] = useState(Math.floor(Math.random() * 100) + 1); // Random number between 1 and 100
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleGuess = () => {
    const userGuess = parseInt(guess, 10);
    if (isNaN(userGuess)) {
      setMessage("Please enter a valid number.");
      return;
    }

    setAttempts((prev) => prev + 1);

    if (userGuess === randomNumber) {
      setMessage(`🎉 Correct! You guessed it in ${attempts + 1} attempts.`);
      onComplete("win", taskIndex); // Notify parent of completion
    } else if (userGuess < randomNumber) {
      setMessage("Too low! Try again.");
    } else {
      setMessage("Too high! Try again.");
    }

    setGuess(""); // Clear input field
  };

  const closeGame = () => {
    setMessage("Game closed without completion.");
    onComplete("close", taskIndex); // Notify parent of closure
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center z-20">
      <h2 className="text-2xl font-bold mb-4">Number Guessing Game</h2>
      <p className="text-gray-400 mb-4">Guess the number between 1 and 100!</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="px-4 py-2 text-black rounded-md"
        placeholder="Enter your guess"
      />
      <button
        onClick={handleGuess}
        className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Guess
      </button>
      <button
        onClick={closeGame}
        className="ml-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
      >
        Close Game
      </button>
      <p className="mt-4 text-gray-300">{message}</p>
      <p className="text-gray-500">Attempts: {attempts}</p>
    </div>
  );
};

export default NumberGuessingGame;
