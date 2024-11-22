import React, { useState, useEffect } from "react";

const TicTacToe = ({ taskIndex, onComplete }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isBotTurn, setIsBotTurn] = useState(false); // Bot's turn
  const [gameStatus, setGameStatus] = useState("In Progress"); // Game status

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || checkWinner(board) || isBotTurn) return;

    const newBoard = [...board];
    newBoard[index] = "X"; // User plays "X"
    setBoard(newBoard);
    setIsXNext(false); // Switch turn to bot

    if (checkWinner(newBoard)) {
      onComplete("win", taskIndex); // User wins
      setGameStatus("User Wins!");
    } else if (!newBoard.includes(null)) {
      onComplete("draw", taskIndex); // Draw
      setGameStatus("It's a Draw!");
    } else {
      setIsBotTurn(true); // Bot's turn
    }
  };

  const botMove = () => {
    // Bot selects a random empty spot
    const emptySquares = board
      .map((value, index) => (value === null ? index : -1))
      .filter((index) => index !== -1);
    const randomMove =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];

    const newBoard = [...board];
    newBoard[randomMove] = "O"; // Bot plays "O"
    setBoard(newBoard);
    setIsBotTurn(false); // Switch turn back to user

    if (checkWinner(newBoard)) {
      onComplete("lose", taskIndex); // Bot wins
      setGameStatus("Bot Wins!");
    } else if (!newBoard.includes(null)) {
      onComplete("draw", taskIndex); // Draw
      setGameStatus("It's a Draw!");
    }
  };

  // Effect to handle bot's turn
  useEffect(() => {
    if (isBotTurn) {
      setTimeout(() => botMove(), 1000); // Simulate bot thinking with a 1-second delay
    }
  }, [isBotTurn, board]);

  // Close game and reset without marking as completed
  const closeGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setIsBotTurn(false);
    setGameStatus("Game Closed");
    onComplete("close", taskIndex); // Mark task as closed without completing it
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center z-20">
      <h2 className="text-2xl font-bold mb-4">Tic Tac Toe</h2>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((value, index) => (
          <button
            key={index}
            className="w-16 h-16 text-2xl font-bold flex items-center justify-center bg-gray-700 border-2 border-gray-600 "
            onClick={() => handleClick(index)}
            disabled={value !== null || isBotTurn} // Disable button if already clicked or it's bot's turn
          >
            {value}
          </button>
        ))}
      </div>

      <div className="text-lg font-medium mb-4">{gameStatus}</div>

      <div className="flex space-x-4">
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

export default TicTacToe;
