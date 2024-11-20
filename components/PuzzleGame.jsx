import React, { useState } from "react";

const PuzzleGame = ({ taskIndex, onComplete, onClose }) => {
  const initialBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, null], // The empty space
  ];

  const [board, setBoard] = useState(initialBoard);
  const [gameOver, setGameOver] = useState(false); // Track if the game is over

  const isCompleted = () => {
    const flatBoard = board.flat();
    return flatBoard.every((num, index) => num === initialBoard.flat()[index]);
  };

  const swapTiles = (x1, y1, x2, y2) => {
    const newBoard = [...board.map((row) => [...row])];
    [newBoard[x1][y1], newBoard[x2][y2]] = [newBoard[x2][y2], newBoard[x1][y1]];
    setBoard(newBoard);
  };

  const handleTileClick = (x, y) => {
    if (gameOver) return; // Prevent any further moves after game is over

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    const emptyTile = findEmptyTile();
    for (let [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx === emptyTile[0] && ny === emptyTile[1]) {
        swapTiles(x, y, emptyTile[0], emptyTile[1]);
        if (isCompleted()) {
          setGameOver(true); // Mark game as over if completed
          onComplete("win", taskIndex); // Notify that the puzzle is solved
        }
        return;
      }
    }
  };

  const findEmptyTile = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) return [i, j];
      }
    }
  };

  const closeGame = () => {
    // Reset the board to the initial state
    setBoard(initialBoard);
    setGameOver(false); // Reset gameOver state
    onClose(); // Notify the parent to close the game
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center relative">
      <h2 className="text-2xl font-bold mb-4">Puzzle Game</h2>
      <div className="grid grid-cols-3 gap-4">
        {board.map((row, i) =>
          row.map((tile, j) => (
            <button
              key={`${i}-${j}`}
              className="w-16 h-16 bg-gray-700 text-xl font-bold flex items-center justify-center"
              onClick={() => handleTileClick(i, j)}
              disabled={tile === null || gameOver} // Disable tile if empty or game is over
            >
              {tile}
            </button>
          ))
        )}
      </div>

      {/* Close button */}
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

export default PuzzleGame;
