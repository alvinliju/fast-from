"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const Preview = () => {
  return (
    <div className="w-full bg-white px-2 lg:px-4">
      {/* Main hero section - centered */}
      <div className="max-w-[640px] mx-auto pt-4 pb-20 text-center">
        {/* Main headline */}
        <h1 className="text-[44px] leading-[1.1] font-bold text-gray-900 mb-8">
          Stop wrestling with Google Forms.
          Build forms that work like Notion.
        </h1>

        {/* Subheadline */}
        <p className="text-[24px] leading-[1.4] text-gray-600 mb-12">
          FastForm gives you a familiar Notion-style editor. 
          Add questions with slash commands. 
          Share instantly. Done.
        </p>

        {/* CTA section */}
        <div className="space-y-6">
          <Link 
            href="/builder"
            className="inline-block bg-[#111] text-white px-8 h-[52px] leading-[52px] rounded-lg font-medium text-[18px] hover:bg-black transition-colors"
          >
            Start building →
          </Link>

          <div className="text-gray-500 text-[16px]">
            Free forever. No credit card needed.
          </div>
        </div>
      </div>

      {/* Social proof section - centered */}
      {/* <div className="py-16 border-t border-gray-100">
        <div className="max-w-[640px] mx-auto text-center">
          <div className="text-[18px] text-gray-600">
            <span className="font-medium text-gray-900">
              "Finally, forms that don't suck."
            </span>
            {" "}
            Join thousands who've switched from clunky form builders.
          </div>
        </div>
      </div> */}

      {/* Feature highlights - centered grid */}
      {/* <div className="py-16 border-t border-gray-100">
        <div className="max-w-[640px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          <div>
            <div className="text-[20px] font-medium text-gray-900 mb-2">
              Notion-style editor
            </div>
            <div className="text-[16px] text-gray-600">
              Use / commands to add questions. Just like you're used to.
            </div>
          </div>
          <div>
            <div className="text-[20px] font-medium text-gray-900 mb-2">
              Multi-step forms
            </div>
            <div className="text-[16px] text-gray-600">
              Add page breaks that actually work. No hacks needed.
            </div>
          </div>
          <div>
            <div className="text-[20px] font-medium text-gray-900 mb-2">
              Share instantly
            </div>
            <div className="text-[16px] text-gray-600">
              Get a public URL immediately. No publishing steps.
            </div>
          </div>
          <div>
            <div className="text-[20px] font-medium text-gray-900 mb-2">
              Real-time responses
            </div>
            <div className="text-[16px] text-gray-600">
              See submissions as they come in. Export anytime.
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Preview
