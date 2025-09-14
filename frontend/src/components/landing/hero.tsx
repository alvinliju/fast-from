"use client"

import React from "react"
import Link from "next/link"
import { LayoutGroup, motion } from "motion/react"

function TextRotate({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <motion.span
      key={currentIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-yellow-500"
    >
      {texts[currentIndex]}
    </motion.span>
  )
}

export function Hero() {
  return (
    <section className="w-full h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative bg-background">
      <div className="flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
        <motion.h1
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-black tracking-tight space-y-1 md:space-y-4"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          <span>Stop wrestling with </span>
          <LayoutGroup>
            <motion.span layout className="flex whitespace-pre">
              <motion.span
                layout
                className="flex whitespace-pre"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                forms.{" "}
              </motion.span>

              <TextRotate
                texts={[
                  "Build fast.",
                  "Build smart.",
                  "Build better.",
                  "Build like Notion.",
                  "Build opinionated.",
                  "Build beautiful.",
                  "Build simple.",
                ]}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>
        <motion.p
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-medium pt-4 sm:pt-8 md:pt-10 lg:pt-12 text-muted-foreground"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          The opinionated form builder that works like <span className=" px-2 text-yellow-500 font-bold">Notion</span>.
          <br />
          No more Google Forms frustration.
        </motion.p>

        <div className="flex flex-row justify-center space-x-4 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20 text-xs">
          <motion.button
            className="w-32 sm:w-36 md:w-40 lg:w-44 sm:text-base md:text-lg lg:text-xl font-medium tracking-tight text-background bg-foreground px-3 py-1.5 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-lg md:rounded-xl z-20 shadow-2xl whitespace-nowrap cursor-pointer"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: {
                duration: 0.2,
              },
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <Link href="#features">
              See features <span className="font-serif ml-1">→</span>
            </Link>
          </motion.button>
          <motion.button
            className="w-32 sm:w-36 md:w-40 lg:w-44 sm:text-base md:text-lg lg:text-xl font-medium tracking-tight text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-lg md:rounded-xl z-20 shadow-2xl whitespace-nowrap cursor-pointer"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: {
                duration: 0.2,
              },
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <Link href="#pricing" >Start building</Link>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
