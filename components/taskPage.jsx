"use client";
import AnalogClock from "./clock";

import React, { useEffect, useState } from "react";
import TicTacToe from "./TicTacToe"; // Placeholder for Task 1 game
import MemoryGame from "./MemoryGame"; // Placeholder for Task 2 game
import PuzzleGame from "./PuzzleGame"; // Placeholder for Task 3 game
import MazeGame from "./MazeGame"; // Placeholder for Task 4 game
import { FaAngleRight } from "react-icons/fa";

const TasksPage = () => {
  const [time, setTime] = useState(new Date());
  const [completedTasks, setCompletedTasks] = useState(0); // Tracks completed tasks
  const [activeGame, setActiveGame] = useState(null); // Tracks active game
  const [gameResults, setGameResults] = useState(Array(4).fill(null)); // Tracks results of each task

  const tasks = ["Task 1", "Task 2", "Task 3", "Task 4"];
  const games = [TicTacToe, MemoryGame, PuzzleGame, MazeGame]; // Task games

  const handleTaskClick = (index) => {
    if (index === completedTasks) {
      setActiveGame(index); // Open the game for the current task
    }
  };

  const handleGameCompletion = (result, taskIndex) => {
    const updatedResults = [...gameResults];
    updatedResults[taskIndex] = result;
    setGameResults(updatedResults);

    if (result === "win") {
      setCompletedTasks((prev) => prev + 1); // Unlock the next task
    }
    setActiveGame(null); // Close the game overlay
  };

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate clock hand angles
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hourDeg = (360 / 12) * hours + (30 / 60) * minutes;
  const minuteDeg = (360 / 60) * minutes;
  const secondDeg = (360 / 60) * seconds;

  return (
    <div className="flex justify-around items-center bg-gray-900 w-full text-white min-h-screen relative">
      {/* Overlay for active game */}
      {activeGame !== null && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
          {React.createElement(games[activeGame], {
            taskIndex: activeGame,
            onComplete: (result) => handleGameCompletion(result, activeGame),
          })}
        </div>
      )}

      {/* Tasks Section */}
      <div
        className={`${
          activeGame !== null ? "opacity-50 pointer-events-none" : ""
        } flex flex-col items-center justify-center z-20`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Tasks</h1>
        <p className="text-gray-400 mb-8 text-center">
          Complete tasks to unlock the next ones.
        </p>
        <ul className="space-y-6">
          {tasks.map((task, index) => (
            <li key={index}>
              <button
                className={`flex items-center justify-between px-6 py-4 w-80 text-left rounded-xl border-2 ${
                  index < completedTasks
                    ? "border-green-500 bg-green-800 cursor-not-allowed"
                    : index === completedTasks
                    ? "border-blue-500 bg-blue-800 hover:bg-blue-600"
                    : "border-gray-700 bg-gray-800 cursor-not-allowed"
                }`}
                disabled={index !== completedTasks}
                onClick={() => handleTaskClick(index)}
              >
                <span>{index < completedTasks ? `✔️ ${task}` : task}</span>
                <FaAngleRight />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Analog Clock */}
      <div className="">
        <AnalogClock />
      </div>
    </div>
  );
};

export default TasksPage;

