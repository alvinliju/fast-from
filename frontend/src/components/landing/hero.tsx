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
    <section className="w-full min-h-[80vh] md:min-h-[85vh] flex flex-col items-center justify-center relative bg-background px-4">
      <div className="max-w-[90vw] md:max-w-[700px] mx-auto">
        <motion.h1
          className="text-[2.5rem] md:text-7xl lg:text-8xl text-center flex flex-col font-black tracking-tight leading-[1.1] mb-6 md:mb-8"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          <span className="mb-2 md:mb-4">Stop wrestling with</span>
          <LayoutGroup>
            <motion.span layout className="flex flex-wrap justify-center gap-2">
              <motion.span
                layout
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
          className="text-xl md:text-2xl text-center font-medium mb-8 md:mb-12 text-muted-foreground"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          The opinionated form builder that works like{" "}
          <span className="text-yellow-500 font-bold">Notion</span>.
          <br className="hidden md:block" />
          No more Google Forms frustration.
        </motion.p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
          <motion.button
            className="w-full md:w-auto bg-foreground text-background px-6 py-3 rounded-lg text-lg font-medium whitespace-nowrap"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
            }}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="#features" className="flex items-center justify-center">
              See features <span className="ml-2">→</span>
            </Link>
          </motion.button>

          <motion.button
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium whitespace-nowrap"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
            }}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="#pricing" className="flex items-center justify-center">
              Start building
            </Link>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
