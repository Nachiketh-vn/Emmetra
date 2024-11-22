import { useEffect, useState } from "react";
  import { IoMdAlarm } from "react-icons/io";

import "./clock.css";

const AnalogClock = ({option1,option2,option3,option4}) => {
  const [time, setTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState(""); // Alarm time in HH:MM format
  const [alarmTriggered, setAlarmTriggered] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Function to update date and time
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString());
      setCurrentTime(now.toLocaleTimeString());
    };

    // Initial call to set the date and time immediately
    updateDateTime();

    // Set interval to update time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const clockStyles =
    option1 === "color1"
      ? "bg-[#164e63]" // Styling for color1
      : option1 === "color2"
      ? "bg-[#831843] " // Styling for color2
      : "bg-[#3C3C3C]"; // Default styling for current or others

  const dateStyles = option2 === "digital" ? <p>{currentTime}</p> : option2 === "date" ? <p>{currentDate}</p> : "";

   const [stime, setStime] = useState(0); // Time in seconds
   const [isRunning, setIsRunning] = useState(false);

   useEffect(() => {
     let timer;
     if (isRunning) {
       timer = setInterval(() => {
         setStime((prevTime) => prevTime + 1);
       }, 1000);
     } else {
       clearInterval(timer);
     }
     return () => clearInterval(timer);
   }, [isRunning]);

   const formatTime = (seconds) => {
     const mins = Math.floor(seconds / 60);
     const secs = seconds % 60;
     return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
   };

   const handleStartPause = () => {
     setIsRunning((prev) => !prev);
   };

   const handleReset = () => {
     setIsRunning(false);
     setStime(0);
   };


  const stopwatch =
    option3 === "stopwatch" ? (
      <div className="flex flex-col items-center justify-center relative top-24 text-white">
        <div className="text-md font-mono bg-slate-800 rounded-md px-2">
          {formatTime(stime)}
        </div>
        <div
          className="cursor-pointer "
          onClick={handleStartPause}
          onDoubleClick={handleReset}
        >
          <button
            className={"bg-[#808080]  h-5 w-3 relative -top-[168px] left-[6px]"}
          ></button>
          <div className="relative h-2 w-6 bg-[#808080]  -left-[0.8px] -top-[200px]"></div>
          {/* <button
            className=" rounded-lg bg-blue-500 hover:bg-blue-600 text-lg"
            onClick={handleReset}
          >
            Reset
          </button> */}
        </div>

        <div className="flex-col space-y-2 mt-8 justify-center items-center">
          <p className="text-[10px] text-gray-300 text-center">
            Double Click on Knob to Reset{" "}
          </p>
          <p className="text-[10px] text-gray-300 text-center">
            Single Click on Knob to Pause/Start{" "}
          </p>
        </div>
      </div>
    ) : (
      ""
    );

    useEffect(() => {
      if (
        alarmTime &&
        `${time.getHours()}:${String(time.getMinutes()).padStart(2, "0")}` ===
          alarmTime
      ) {
        setAlarmTriggered(true);
        // Reset alarm after triggering
        setTimeout(() => {
          setAlarmTime("");
          setAlarmTriggered(false);
        }, 5000); // Alarm stops after 5 seconds
      }
    }, [time, alarmTime]);

    const handleSetAlarm = (e) => {
      e.preventDefault();
      const alarmInput = e.target.elements.alarm.value;
      setAlarmTime(alarmInput);
      setAlarmTriggered(false);
    };


    const alarm =
      option4 === "alarm" ? (
        <div className="flex mb-10 flex-col items-center justify-center z- text-white">
          <form className="flex space-x-4 mb-6" onSubmit={handleSetAlarm}>
            <input
              type="time"
              name="alarm"
              className="p-2 text-black rounded-md focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              Set Alarm
            </button>
          </form>

          {alarmTriggered ? (
            <div className="text-md font-semibold text-gray-500 animate-vibrate">
               Alarm Ringing! 
            </div>
          ) : alarmTime ? (
            <div className="text-lg text-gray-300">
              Alarm set for <span className="font-bold">{alarmTime}</span>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      );

  return (
    <div>
      <div className="">{alarm}</div>

      <div
        className={`clock ${clockStyles} ${
          alarmTriggered ? "animate-vibrate" : ""
        }`}
      >
        <div className="dot "></div>
        {alarmTime && (
          <div className="absolute top-7 left-[84px] font-semibold text-orange-300">
            <IoMdAlarm />
          </div>
        )}
        <div className="hour twelve">12</div>
        <div className="hour one">1</div>
        <div className="hour two">2</div>
        <div className="hour three">3</div>
        <div className="hour four">4</div>
        <div className="hour five">5</div>
        <div className="hour six">6</div>
        <div className="hour seven">7</div>
        <div className="hour eight">8</div>
        <div className="hour nine">9</div>
        <div className="hour ten">10</div>
        <div className="hour eleven">11</div>
        <div className="relative top-[52px] left-[2.8rem] text-sm bg-slate-800 font-semibold rounded-md text-center w-24">
          {dateStyles}
        </div>
        <div>{stopwatch}</div>
        <div
          className="hour-hand"
          style={{
            transform: `rotateZ(${time.getHours() * 30}deg)`,
          }}
        ></div>
        <div
          className="minute-hand"
          style={{
            transform: `rotateZ(${time.getMinutes() * 6}deg)`,
          }}
        ></div>
        <div
          className="second-hand"
          style={{
            transform: `rotateZ(${time.getSeconds() * 6}deg)`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default AnalogClock;
