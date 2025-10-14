"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useAuth, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  if(pathname.startsWith('/form/') || pathname.startsWith('/builder')) {
    return null
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <header className="bg-white border-b border-[#e5e5e5] py-5">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#d97706]">
            CalmForms
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <SignedIn>
              <Link 
                href="/forms" 
                className="text-[15px] font-medium text-gray-600 hover:text-[#1a1a1a] transition-colors"
              >
                My Forms
              </Link>
              <Link 
                href="/builder" 
                className="text-[15px] font-medium text-gray-600 hover:text-[#1a1a1a] transition-colors"
              >
                Create Form
              </Link>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>

            <SignedOut>
              <Link 
                href="#features" 
                className="text-[15px] font-medium text-gray-600 hover:text-[#1a1a1a] transition-colors"
              >
                Features
              </Link>
              <Link 
                href="#pricing" 
                className="text-[15px] font-medium text-gray-600 hover:text-[#1a1a1a] transition-colors"
              >
                Pricing
              </Link>
              <SignInButton mode="modal">
                <button className="text-[15px] font-medium text-gray-600 hover:text-[#1a1a1a] transition-colors">
                  Sign in
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="bg-[#d97706] hover:bg-[#b45309] text-white px-6 py-3 rounded-lg text-[15px] font-semibold transition-all hover:-translate-y-0.5">
                  Get Started Free
                </button>
              </SignInButton>
            </SignedOut>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-6 pb-4 border-t border-[#e5e5e5] mt-4">
            <SignedIn>
              <div className="space-y-3">
                <Link 
                  href="/forms"
                  className="block text-[15px] font-medium text-gray-600 hover:text-[#1a1a1a] py-2"
                  onClick={() => setIsOpen(false)}
                >
                  My Forms
                </Link>
                <Link 
                  href="/builder"
                  className="block text-[15px] font-medium text-gray-600 hover:text-[#1a1a1a] py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Create Form
                </Link>
                <div className="pt-4 border-t border-[#e5e5e5]">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </SignedIn>

            <SignedOut>
              <div className="space-y-3">
                <Link 
                  href="#features"
                  className="block text-[15px] font-medium text-gray-600 hover:text-[#1a1a1a] py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  href="#pricing"
                  className="block text-[15px] font-medium text-gray-600 hover:text-[#1a1a1a] py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                <div className="pt-4 border-t border-[#e5e5e5] space-y-3">
                  <SignInButton mode="modal">
                    <button 
                      className="block w-full text-left text-[15px] font-medium text-gray-600 hover:text-[#1a1a1a] py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign in
                    </button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <button 
                      className="w-full bg-[#d97706] hover:bg-[#b45309] text-white px-6 py-3 rounded-lg text-[15px] font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started Free
                    </button>
                  </SignInButton>
                </div>
              </div>
            </SignedOut>
          </div>
        )}
      </div>
    </header>
  )
}
