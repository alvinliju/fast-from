"use client";

import { useState } from "react"
import Link from "next/link"
import { useAuth, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { isSignedIn } = useAuth()
  const pathname = usePathname()

  // DEBUG - remove this after fixing
  console.log('Navigation render - isSignedIn:', isSignedIn, 'pathname:', pathname)

  // Don't render navbar on form pages or builder pages
  if (pathname.startsWith('/form/') || pathname.startsWith('/builder')) {
    return null
  }

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo & Tagline */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              FastForm
            </Link>
            <span className="ml-3 text-base text-gray-600 hidden lg:block">
              is the <span className="bg-yellow-400 text-black px-2 py-1 font-bold">simple</span> form builder
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <SignedIn>
              <Link 
                href="/forms" 
                className="text-gray-600 hover:text-gray-900 transition-colors text-base"
              >
                My Forms
              </Link>
              <Link 
                href="/builder" 
                className="text-gray-600 hover:text-gray-900 transition-colors text-base"
              >
                Create Form
              </Link>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </SignedIn>

            <SignedOut>
              <Link 
                href="#features" 
                className="text-gray-600 hover:text-gray-900 transition-colors text-base"
              >
                Features
              </Link>
              <Link 
                href="#pricing" 
                className="text-gray-600 hover:text-gray-900 transition-colors text-base"
              >
                Pricing
              </Link>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="text-base">
                  Log in
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button 
                  size="sm" 
                  className="bg-black text-white hover:bg-gray-900 text-base px-6"
                >
                  Start building
                </Button>
              </SignInButton>
            </SignedOut>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="py-6 space-y-6">
              <SignedIn>
                <Link 
                  href="/forms"
                  className="block text-base text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  My Forms
                </Link>
                <Link 
                  href="/builder"
                  className="block text-base text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Create Form
                </Link>
                <div className="pt-4 border-t border-gray-100">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>

              <SignedOut>
                <Link 
                  href="#features"
                  className="block text-base text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  href="#pricing"
                  className="block text-base text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <SignInButton mode="modal">
                    <Button 
                      variant="ghost" 
                      size="lg"
                      className="w-full text-base justify-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Log in
                    </Button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <Button 
                      size="lg"
                      className="w-full bg-black text-white hover:bg-gray-900 text-base"
                      onClick={() => setIsOpen(false)}
                    >
                      Start building
                    </Button>
                  </SignInButton>
                </div>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}