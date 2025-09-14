"use client"
import { Zap, Layers, Share2, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Notion-style editor",
    description: "Use / commands to add questions. Just like you're used to.",
  },
  {
    icon: Layers,
    title: "Multi-step forms",
    description: "Add page breaks that actually work. No hacks needed.",
  },
  {
    icon: Share2,
    title: "Share instantly",
    description: "Get a public URL immediately. No publishing steps.",
  },
  {
    icon: BarChart3,
    title: "Real-time responses",
    description: "See submissions as they come in. Export anytime.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black tracking-tight text-foreground sm:text-6xl text-balance mb-8">
              Let's walk through it.
            </h2>
            <p className="text-2xl font-bold text-foreground">10 seconds after you start, clarity sets in.</p>
            <p className="text-lg text-muted-foreground mt-4 leading-relaxed max-w-3xl mx-auto">
              The form builder organizes your questions, logic, and responses together in one screen. It's your calm,
              comfortable, simple starting point every time.
            </p>
          </div>

          <div className="space-y-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="bg-yellow-400 text-black px-4 py-2 inline-block transform -rotate-1 mb-6">
                  <span className="font-black text-lg">HOW DO I ADD QUESTIONS?</span>
                </div>
                <h3 className="text-3xl font-black text-foreground mb-4">Use / commands to add questions</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Just like Notion. Type "/" and pick from text, multiple choice, email, file upload, and more. No
                  complex menus or settings to figure out.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200">
                <div className="font-mono text-sm text-gray-600 mb-2">Type "/" to add:</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Text question</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Multiple choice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span>Email field</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span>File upload</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="lg:order-2">
                <div className="bg-yellow-400 text-black px-4 py-2 inline-block transform rotate-1 mb-6">
                  <span className="font-black text-lg">WHAT ABOUT LONG FORMS?</span>
                </div>
                <h3 className="text-3xl font-black text-foreground mb-4">Multi-step forms that actually work</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Add page breaks anywhere. No hacks, no workarounds. Your forms flow naturally from one section to the
                  next.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200 lg:order-1">
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-4">
                    <div className="text-sm font-semibold text-gray-600 mb-2">Page 1: Contact Info</div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="border-b border-gray-300 pb-4">
                    <div className="text-sm font-semibold text-gray-600 mb-2">Page 2: Preferences</div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-2">Page 3: Submit</div>
                    <div className="h-8 bg-yellow-400 rounded w-24"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="bg-yellow-400 text-black px-4 py-2 inline-block transform -rotate-1 mb-6">
                  <span className="font-black text-lg">HOW DO I SHARE IT?</span>
                </div>
                <h3 className="text-3xl font-black text-foreground mb-4">Get a public URL immediately</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  No publishing steps. No complicated settings. Your form gets a clean URL the moment you create it.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200">
                <div className="font-mono text-sm text-gray-600 mb-4">Your form URL:</div>
                <div className="bg-white border border-gray-300 rounded px-4 py-3 font-mono text-sm">
                  fastform.app/your-form-name
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold text-sm">
                    Copy Link
                  </button>
                  <button className="border border-gray-300 px-4 py-2 rounded text-sm">Share</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="lg:order-2">
                <div className="bg-yellow-400 text-black px-4 py-2 inline-block transform rotate-1 mb-6">
                  <span className="font-black text-lg">WHERE ARE MY RESPONSES?</span>
                </div>
                <h3 className="text-3xl font-black text-foreground mb-4">See submissions as they come in</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Real-time updates. Clean, organized view. Export to CSV when you need to analyze or share.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200 lg:order-1">
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                    <span className="font-semibold text-sm">Recent Responses</span>
                    <span className="text-xs text-gray-500">Live</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>John Smith</span>
                      <span className="text-gray-500">2 min ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sarah Johnson</span>
                      <span className="text-gray-500">5 min ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Mike Chen</span>
                      <span className="text-gray-500">12 min ago</span>
                    </div>
                  </div>
                  <button className="w-full bg-white border border-gray-300 rounded px-4 py-2 text-sm font-medium mt-4">
                    Export to CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
