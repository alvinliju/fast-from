"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

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
    <>
      <header className="bg-background border-b border-border relative z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Navigation */}
          <div className="flex h-20 items-center justify-between">
            {/* Logo & Tagline */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-foreground tracking-tight">
                FastForm
              </Link>
              <span className="ml-3 text-base text-foreground hidden lg:block">
                is the <span className="bg-yellow-400 text-black px-2 py-1 font-bold">opinionated</span> form builder
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-base text-foreground hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-base text-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="/login" className="text-base text-foreground hover:text-primary transition-colors">
                Sign in
              </Link>
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg">
                Start building free
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 border-b border-border bg-white/80 backdrop-blur-lg">
              <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
                <div className="flex flex-col space-y-6">
                  <Link 
                    href="#features" 
                    className="text-lg text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Features
                  </Link>
                  <Link 
                    href="#pricing" 
                    className="text-lg text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link 
                    href="/login" 
                    className="text-lg text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign in
                  </Link>
                </div>
                
                <div className="pt-6 border-t border-border">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Start building free
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
