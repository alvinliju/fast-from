"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Button } from "../ui/button";
export function CTA() {
  const words = [
    {
      text: "Build like Notion",
    },
    {
      text: "Build fast.",
    },
    {
      text: "FastForm.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The opinionated form builder that works like Notion.
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
       <button  className="ww-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg text-lg font-medium whitespace-nowrap">
        Start building
       </button>
        <button  className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium whitespace-nowrap" >
          See features
        </button>
      </div>
    </div>
  );
}
