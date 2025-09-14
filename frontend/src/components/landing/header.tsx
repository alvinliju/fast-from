"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useAuth, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Prevent scroll when menu is open
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
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-foreground tracking-tight">
            FastForm
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-6 font-bold text-black">
            <SignedIn>
              {/* Signed-in: Minimal, focused navigation */}
              <div className="flex items-center space-x-6">
                <Link 
                  href="/forms" 
                  className="text-md hover:text-black"
                >
                  Forms
                </Link>
                <Link 
                  href="/builder" 
                  className="text-md hover:text-black"
                >
                  Create
                </Link>
                <div className="h-4 w-px bg-gray-200" />
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            </SignedIn>

            <SignedOut>
              {/* Signed-out: Marketing navigation */}
              <Link 
                href="#features" 
                className="text-sm text-gray-600 hover:text-black"
              >
                Features
              </Link>
              <Link 
                href="#pricing" 
                className="text-sm text-gray-600 hover:text-black"
              >
                Pricing
              </Link>
              <SignInButton mode="modal">
                <button className="text-sm text-gray-600 hover:text-black">
                  Sign in
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button className="bg-black hover:bg-gray-900 text-white text-sm px-4 py-2 rounded">
                  Start building
                </Button>
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
          <div className="md:hidden py-4">
            <SignedIn>
              <div className="space-y-4">
                <Link 
                  href="/forms"
                  className="block text-sm text-gray-600 hover:text-black py-2"
                  onClick={() => setIsOpen(false)}
                >
                  my forms
                </Link>
                <Link 
                  href="/builder"
                  className="block text-sm text-gray-600 hover:text-black py-2"
                  onClick={() => setIsOpen(false)}
                >
                  create form
                </Link>
                <div className="pt-4 border-t">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </SignedIn>

            <SignedOut>
              <div className="space-y-4">
                <Link 
                  href="#features"
                  className="block text-sm text-gray-600 hover:text-black py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  href="#pricing"
                  className="block text-sm text-gray-600 hover:text-black py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                <div className="pt-4 border-t space-y-3">
                  <SignInButton mode="modal">
                    <button 
                      className="block w-full text-left text-sm text-gray-600 hover:text-black py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign in
                    </button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <Button 
                      className="w-full bg-black hover:bg-gray-900 text-white text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Start building
                    </Button>
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
