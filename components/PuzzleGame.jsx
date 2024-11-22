"use client"
import React, { useState } from "react";

const SudokuGame = ({ taskIndex, onComplete }) => {
  const initialBoard = 
  // [
    // [5, 3, null, null, 7, null, null, null, null],
    // [6, null, null, 1, 9, 5, null, null, null],
    // [null, 9, 8, null, null, null, null, 6, null],
    // [8, null, null, null, 6, null, null, null, 3],
    // [4, null, null, 8, null, 3, null, null, 1],
    // [7, null, null, null, 2, null, null, null, 6],
    // [null, 6, null, null, null, null, 2, 8, null],
    // [null, null, null, 4, 1, 9, null, null, 5],
    // [null, null, null, null, 8, null, null, 7, 9],
  // ];
  [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [null, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ];
  

  const solutionBoard = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ];

  const [board, setBoard] = useState(initialBoard);

  const handleChange = (row, col, value) => {
    const newBoard = [...board.map((row) => [...row])];
    const parsedValue = parseInt(value, 10);

    if (parsedValue >= 1 && parsedValue <= 9) {
      newBoard[row][col] = parsedValue;
    } else {
      newBoard[row][col] = null;
    }

    setBoard(newBoard);

    if (JSON.stringify(newBoard) === JSON.stringify(solutionBoard)) {
      onComplete("win", taskIndex);
    }
  };

  const closeGame = () => {
    setBoard(initialBoard); // Reset the board
    onComplete("close", taskIndex); // Notify the parent component
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center z-20">
      <h2 className="text-2xl font-bold mb-4">Sudoku Game</h2>
      <div className="grid grid-cols-9 gap-1">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength="1"
              value={cell || ""}
              disabled={initialBoard[rowIndex][colIndex] !== null}
              className="w-10 h-10 text-center text-black border border-gray-500 text-lg"
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
            />
          ))
        )}
      </div>
      <p className="text-gray-400 mt-4 text-center w-[40vw]">
        Fill the grid so that each row, column, and 3x3 box contains numbers
        1-9.{" "}
        <span className="text-gray-300 font-semibold">
          (The Game will Close Automatically if the Sudoku is Correctly filled)
        </span>
      </p>
      <div className="flex space-x-4 mt-4">
        <button
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          onClick={closeGame}
        >
          Close Game
        </button>
      </div>
    </div>
  );
};

export default SudokuGame;
