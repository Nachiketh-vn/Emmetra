"use client"; // Ensures this is a client-side rendered component
import { useEffect, useState } from "react";
import { Spotlight } from "../app/components/ui/Spotlight";
import { Cover } from "../app/components/ui/cover";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { FaAngleDoubleDown } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import TasksPage from "../components/taskPage";


export default function Home() {
  const [isClient, setIsClient] = useState(false);

  // Ensure rendering happens on the client only to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  function checkScreenSize() {
    // Show toast if screen width is less than 768px (non-PC screens)
    if (window.innerWidth < 768) {
      toast.error(
        "This website is best viewed on a PC. Please switch to a larger screen for the best experience."
      );
    }
  }

  // Run the check on page load
  window.addEventListener("load", checkScreenSize);

  // Optionally, you can listen to resize events to show the toast dynamically
  window.addEventListener("resize", checkScreenSize);

  return (
    <div className="w-full flex-col md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="h-[48rem] w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {/* Name Section */}
        <div className="-mt-36 flex gap-2 justify-center items-center   md:-mt-36  text-center">
          <CiUser className="text-white text-lg font-bold" />
          <h1 className="text-white font-semibold">Nachiketh Neelaraddi</h1>
        </div>

        {/* Title Section */}
        <p className="text-4xl sm:text-7xl h-[6rem] font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mt-8">
          Emmetra{" "}
          <span className="text-blue-500">
            <Cover>Assignment-2</Cover>
          </span>
        </p>

        {/* Description Section */}
        <p className="text-center px-[5vw] md:py-4 md:px-[10vw] text-lg font-semibold text-[#7B8383] md:mt-6">
          &quot;This website is created for Assignment-2, provided by Emmetra,
          demonstrating modern web development techniques. It showcases the
          implementation of the project requirements, aligning with the provided
          guidelines.&quot;
        </p>

        {/* Technology Section */}
        <div className="pt-8 flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-xl sm:text-xl font-semibold text-center mb-6">
            Technology Used
          </h1>
          <div>
            <ul className="flex flex-wrap justify-center gap-8 text-[#999999] text-xl sm:text-3xl font-semibold">
              <li className="transition-transform duration-300 transform hover:scale-110">
                Next.js
              </li>
              <li className="transition-transform duration-300 transform hover:scale-110">
                TypeScript
              </li>
              <li className="transition-transform duration-300 transform hover:scale-110">
                Tailwind CSS
              </li>
              <li className="transition-transform duration-300 transform hover:scale-110">
                Framer Motion
              </li>
              <li className="transition-transform duration-300 transform hover:scale-110">
                Aceternity UI
              </li>
              <li className="transition-transform duration-300 transform hover:scale-110">
                Vercel
              </li>
            </ul>
          </div>
        </div>

        {/* Button Section */}
        <div className="pt-8 md:pt-16 flex justify-center gap-8 sm:gap-16 md:gap-20">
          <div>
            <Link
              href={
                "https://drive.google.com/file/d/1f6oaMgomWpytGoISjVstS_5Q1isePtvU/view?usp=sharing"
              }
              className="text-white"
            >
              <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block transform transition-transform duration-300 group-hover:scale-110">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className="relative text-lg flex items-center space-x-2 z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10">
                  <span className="flex items-center">Open Resume</span>
                  <svg
                    fill="none"
                    height="32"
                    width="32"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M10.75 8.75L14.25 12L10.75 15.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </button>
            </Link>
          </div>
          <div>
            <Link href={""} className="text-white">
              <button className="p-[3px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                <div className="px-8 py-2 bg-black rounded-full relative group transition duration-200 text-white hover:bg-transparent">
                  <DropdownMenu>
                    <DropdownMenuTrigger>Contact Info</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        Mobile : +91 8431615084
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>
                        Email : nachikethnraddi@gmail.com
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link
                          href={"https://github.com/nachiketh-vn/"}
                          className="flex justify-center gap-2 items-center"
                        >
                          <FaGithub className="text-2xl " /> Github
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href={
                            "https://www.linkedin.com/in/nachiketh-neelaraddi/"
                          }
                          className="flex justify-center gap-2 items-center"
                        >
                          <FaLinkedin className="text-2xl" /> LinkedIn
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div>
          <FaAngleDoubleDown className="relative top-6 md:top-14 left-5 text-2xl text-white animate-bounce" />
        </div>
      </div>

      <TasksPage />
    </div>
  );
}
