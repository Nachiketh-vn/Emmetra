// File: MazeGame.jsx
import React, { useState } from "react";

const MazeGame = ({ taskIndex, onComplete }) => {
  const mazeSize = 5;
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [exitPosition] = useState({ x: mazeSize - 1, y: mazeSize - 1 });

  const movePlayer = (direction) => {
    setPlayerPosition((prevPosition) => {
      let newX = prevPosition.x;
      let newY = prevPosition.y;
      switch (direction) {
        case "up":
          newX = Math.max(0, newX - 1);
          break;
        case "down":
          newX = Math.min(mazeSize - 1, newX + 1);
          break;
        case "left":
          newY = Math.max(0, newY - 1);
          break;
        case "right":
          newY = Math.min(mazeSize - 1, newY + 1);
          break;
        default:
          break;
      }
      const newPosition = { x: newX, y: newY };
      if (
        newPosition.x === exitPosition.x &&
        newPosition.y === exitPosition.y
      ) {
        onComplete("win", taskIndex);
      }
      return newPosition;
    });
  };

  const handleKeyPress = (event) => {
    switch (event.key) {
      case "ArrowUp":
        movePlayer("up");
        break;
      case "ArrowDown":
        movePlayer("down");
        break;
      case "ArrowLeft":
        movePlayer("left");
        break;
      case "ArrowRight":
        movePlayer("right");
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const renderMaze = () => {
    let maze = [];
    for (let i = 0; i < mazeSize; i++) {
      let row = [];
      for (let j = 0; j < mazeSize; j++) {
        if (playerPosition.x === i && playerPosition.y === j) {
          row.push("P");
        } else if (exitPosition.x === i && exitPosition.y === j) {
          row.push("E");
        } else {
          row.push(".");
        }
      }
      maze.push(row);
    }
    return maze;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Maze Game</h2>
      <div className="text-xl">
        {renderMaze().map((row, index) => (
          <div key={index}>{row.join(" ")}</div>
        ))}
      </div>
      <p className="text-gray-400 mt-4">
        Use arrow keys to move the player "P" to the exit "E".
      </p>
    </div>
  );
};

export default MazeGame;
