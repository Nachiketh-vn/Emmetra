// "use client";
// import AnalogClock from "./clock";
// import React, { useEffect, useState } from "react";
// import TicTacToe from "./TicTacToe"; // Placeholder for Task 1 game
// import MemoryGame from "./MemoryGame"; // Placeholder for Task 2 game
// import PuzzleGame from "./PuzzleGame"; // Placeholder for Task 3 game
// import MazeGame from "./MazeGame"; // Placeholder for Task 4 game
// import { FaAngleRight } from "react-icons/fa";

// const TasksPage = () => {
//   const [time, setTime] = useState(new Date());
//   const [completedTasks, setCompletedTasks] = useState(0); // Tracks completed tasks
//   const [activeGame, setActiveGame] = useState(null); // Tracks active game
//   const [gameResults, setGameResults] = useState(Array(4).fill(null)); // Tracks results of each task
//   const [option1, setOption1] = useState(""); // Selected option for Task 1
//   const [option2, setOption2] = useState(""); // Selected option for Task 2
//   const [option3, setOption3] = useState(""); // Selected option for Task 3
//   const [option4, setOption4] = useState(""); // Selected option for Task 4
//   const [showOptions, setShowOptions] = useState(false); // Whether to show options or not
//   const [taskIndex, setTaskIndex] = useState(null); // Current task index
//   const [isTaskCancelled, setIsTaskCancelled] = useState(false); // Tracks whether a task was cancelled

//   const tasks = ["Task 1", "Task 2", "Task 3", "Task 4"];
//   const games = [TicTacToe, MemoryGame, PuzzleGame, MazeGame]; // Task games

//   const taskOptions = [
//     // Task 1 options
//     [
//       { label: "Add Color-1 to the Clock", value: "color1" },
//       { label: "Add Color-2 to the Clock", value: "color2" },
//       { label: "Keep Current Color option", value: "current" },
//     ],
//     // Task 2 options
//     [
//       { label: "Add Digital Time", value: "digital" },
//       { label: "Add Date", value: "date" },
//     ],
//     // Task 3 options
//     [
//       { label: "Circle", value: "circle" },
//       { label: "Square", value: "square" },
//       { label: "Triangle", value: "triangle" },
//       { label: "Hexagon", value: "hexagon" },
//     ],
//     // Task 4 options
//     [
//       { label: "Easy", value: "easy" },
//       { label: "Medium", value: "medium" },
//       { label: "Hard", value: "hard" },
//       { label: "Extreme", value: "extreme" },
//     ],
//   ];

//   const handleTaskClick = (index) => {
//     if (index === completedTasks) {
//       setActiveGame(index); // Open the game for the current task
//       setTaskIndex(index); // Set the current task index
//       setIsTaskCancelled(false); // Reset the cancel flag
//     }
//   };

//   const handleOptionSelect = (taskIndex, optionValue) => {
//     // Store the selected option in the corresponding state
//     if (taskIndex === 0) {
//       setOption1(optionValue);
//     } else if (taskIndex === 1) {
//       setOption2(optionValue);
//     } else if (taskIndex === 2) {
//       setOption3(optionValue);
//     } else if (taskIndex === 3) {
//       setOption4(optionValue);
//     }
//   };

//   const handleGameCompletion = (result, taskIndex) => {
//     const updatedResults = [...gameResults];
//     updatedResults[taskIndex] = result;
//     setGameResults(updatedResults);

//     if (result === "win") {
//       setCompletedTasks((prev) => prev + 1); // Unlock the next task
//     }
//     setActiveGame(null); // Close the game overlay

//     // Only show options if the task was completed successfully
//     if (result === "win") {
//       setShowOptions(true); // Show options after task completion
//     } else {
//       setIsTaskCancelled(true); // Set the task as cancelled if it's not completed
//     }
//   };

//   const handleOptionsSubmit = () => {
//     console.log("Selected Options:");
//     console.log("Option 1:", option1);
//     console.log("Option 2:", option2);
//     console.log("Option 3:", option3);
//     console.log("Option 4:", option4);

//     // Hide the options after selection
//     setShowOptions(false);
//   };

//   // Update the time every second
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime(new Date());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="h-[36rem] w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
//       <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

//       <div className="flex -mt-40 justify-around items-center w-full text-white min-h-screen relative">
//         {/* Overlay for active game */}
//         {activeGame !== null && (
//           <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
//             {React.createElement(games[activeGame], {
//               taskIndex: activeGame,
//               onComplete: (result) => handleGameCompletion(result, activeGame),
//             })}
//           </div>
//         )}

//         {/* Tasks Section */}
//         <div
//           className={`${
//             activeGame !== null || isTaskCancelled
//               ? "opacity-50 pointer-events-none"
//               : ""
//           } flex flex-col items-center justify-center z-20`}
//         >
//           <h1 className="text-3xl font-bold mb-6 text-center">Tasks</h1>
//           <p className="text-gray-400 mb-8 text-center">
//             Complete tasks to unlock the next ones.
//           </p>
//           <ul className="space-y-6">
//             {tasks.map((task, index) => (
//               <li key={index}>
//                 <button
//                   className={`flex items-center justify-between px-6 py-4 w-80 text-left rounded-xl border-2 ${
//                     index < completedTasks
//                       ? "border-green-500 bg-green-800 cursor-not-allowed"
//                       : index === completedTasks
//                       ? "border-blue-500 bg-blue-800 hover:bg-blue-600"
//                       : "border-gray-900 text-gray-600 bg-black cursor-not-allowed"
//                   }`}
//                   disabled={index !== completedTasks || isTaskCancelled}
//                   onClick={() => handleTaskClick(index)}
//                 >
//                   <span>{index < completedTasks ? `✔️ ${task}` : task}</span>
//                   <FaAngleRight />
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Analog Clock */}
//         <div className="">
//           <AnalogClock />
//         </div>
//       </div>

//       {/* Options Modal */}
//       {showOptions && !isTaskCancelled && (
//         <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
//           <div className="bg-gray-700 p-8 rounded-lg">
//             <h2 className="text-xl text-gray-400 font-bold mb-4">
//               Select Options for {tasks[taskIndex]}
//             </h2>
//             {taskOptions[taskIndex].map((option, idx) => (
//               <div key={idx} className="mb-4">
//                 <button
//                   onClick={() => handleOptionSelect(taskIndex, option.value)}
//                   className="w-full bg-gray-800 text-white py-2 px-4 rounded"
//                 >
//                   {option.label}
//                 </button>
//               </div>
//             ))}
//             <button
//               onClick={handleOptionsSubmit}
//               className="bg-blue-500 text-white py-2 px-4 rounded"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TasksPage;

"use client";
import AnalogClock from "./clock";
import React, { useEffect, useState } from "react";
import TicTacToe from "./TicTacToe"; // Placeholder for Task 1 game
import MemoryGame from "./MemoryGame"; // Placeholder for Task 2 game
import SudokuGame from "./PuzzleGame"; // Placeholder for Task 3 game
import NumberGuessingGame from "./MazeGame"; // Placeholder for Task 4 game
import { FaAngleRight } from "react-icons/fa";

const TasksPage = () => {
  const [time, setTime] = useState(new Date());
  const [completedTasks, setCompletedTasks] = useState(0); // Tracks completed tasks
  const [activeGame, setActiveGame] = useState(null); // Tracks active game
  const [gameResults, setGameResults] = useState(Array(4).fill(null)); // Tracks results of each task
  const [option1, setOption1] = useState(""); // Selected option for Task 1
  const [option2, setOption2] = useState(""); // Selected option for Task 2
  const [option3, setOption3] = useState(""); // Selected option for Task 3
  const [option4, setOption4] = useState(""); // Selected option for Task 4
  const [showOptions, setShowOptions] = useState(false); // Whether to show options or not
  const [taskIndex, setTaskIndex] = useState(null); // Current task index
  const tasks = ["Task 1", "Task 2", "Task 3", "Task 4"];
  const games = [TicTacToe, NumberGuessingGame, MemoryGame, SudokuGame]; // Task games

  const taskOptions = [
    // Task 1 options
    [
      { label: "Add Color-1 to the Clock", value: "color1" },
      { label: "Add Color-2 to the Clock", value: "color2" },
      { label: "Keep Current Color option", value: "current" },
    ],
    // Task 2 options
    [
      { label: "Add Digital Time", value: "digital" },
      { label: "Add Date", value: "date" },
    ],
    // Task 3 options
    [
      { label: "Circle", value: "circle" },
      { label: "Square", value: "square" },
      { label: "Triangle", value: "triangle" },
      { label: "Hexagon", value: "hexagon" },
    ],
    // Task 4 options
    [
      { label: "Easy", value: "easy" },
      { label: "Medium", value: "medium" },
      { label: "Hard", value: "hard" },
      { label: "Extreme", value: "extreme" },
    ],
  ];

  const handleTaskClick = (index) => {
    if (index === completedTasks) {
      setActiveGame(index); // Open the game for the current task
      setTaskIndex(index); // Set the current task index
    }
  };

  const handleOptionSelect = (taskIndex, optionValue) => {
    // Store the selected option in the corresponding state
    if (taskIndex === 0) {
      setOption1(optionValue);
    } else if (taskIndex === 1) {
      setOption2(optionValue);
    } else if (taskIndex === 2) {
      setOption3(optionValue);
    } else if (taskIndex === 3) {
      setOption4(optionValue);
    }
  };

  const handleGameCompletion = (result, taskIndex) => {
    const updatedResults = [...gameResults];
    updatedResults[taskIndex] = result;
    setGameResults(updatedResults);

    if (result === "win") {
      setCompletedTasks((prev) => prev + 1); // Unlock the next task
      setShowOptions(true); // Show options after task completion
    }
    setActiveGame(null); // Close the game overlay
  };

  const handleOptionsSubmit = () => {
    console.log(option1);
    console.log(option2);
    console.log(option3);
    console.log(option4);
    // Hide the options after selection
    setShowOptions(false);
  };

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[36rem] w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="flex -mt-40 justify-around items-center w-full text-white min-h-screen relative">
        {/* Overlay for active game */}
        {activeGame !== null && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
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
          } flex flex-col items-center justify-center z-10`}
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
                      : "border-gray-900 text-gray-600 bg-black cursor-not-allowed"
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

      {/* Options Modal */}
      {showOptions && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
          <div className="bg-gray-700 p-8 rounded-lg">
            <h2 className="text-xl text-gray-400 font-bold mb-4">
              Select Options for {tasks[taskIndex]}
            </h2>
            {taskOptions[taskIndex].map((option, idx) => {
              // Determine if the option is selected
              const isSelected =
                (taskIndex === 0 && option.value === option1) ||
                (taskIndex === 1 && option.value === option2) ||
                (taskIndex === 2 && option.value === option3) ||
                (taskIndex === 3 && option.value === option4);

              return (
                <div key={idx} className="mb-4">
                  <button
                    onClick={() => handleOptionSelect(taskIndex, option.value)}
                    className={`w-full py-2 px-4 rounded ${
                      isSelected
                        ? "bg-blue-500 hover:bg-blue-400"
                        : "bg-gray-800 hover:bg-gray-600"
                    } text-white`}
                  >
                    {option.label}
                  </button>
                </div>
              );
            })}
            <button
              onClick={handleOptionsSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
