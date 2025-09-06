"use client";

import * as React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const pathname = usePathname();

  // Don't render navbar on form pages or builder pages
  if (pathname.startsWith('/form/') || pathname.startsWith('/builder')) {
    return null;
  }

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-lg font-medium text-black hover:text-gray-800 transition-colors">
              FastForm
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {isSignedIn && (
              <>
                <Link 
                  href="/forms" 
                  className="text-gray-600 hover:text-black transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-50"
                >
                  My Forms
                </Link>
                <Link 
                  href="/builder" 
                  className="text-gray-600 hover:text-black transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-50"
                >
                  Create
                </Link>
              </>
            )}
            {!isSignedIn && (
              <>
                <a href="#features" className="text-gray-600 hover:text-black transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-50">
                  Features
                </a>

                <a href="#pricing" className="text-gray-600 hover:text-black transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-50">
                  Pricing
                </a>
              </>
            )}

          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-2">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="text-sm">
                  Log in
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm" className="text-sm bg-black text-white hover:bg-gray-800">
                  Sign up
                </Button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <Link href="/builder">
                <Button size="sm" className="text-sm bg-black text-white hover:bg-gray-800">
                  Create Form
                </Button>
              </Link>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-7 h-7 rounded-full ml-2"
                  }
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-3">
              {isSignedIn && (
                <>
                  <Link 
                    href="/forms"
                    className="text-gray-600 hover:text-black transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    My Forms
                  </Link>
                  <Link 
                    href="/builder"
                    className="text-gray-600 hover:text-black transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Create
                  </Link>
                </>
              )}
              <a 
                href="#features"
                className="text-gray-600 hover:text-black transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a 
                href="#pricing"
                className="text-gray-600 hover:text-black transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-sm justify-start"
                      onClick={() => setIsOpen(false)}
                    >
                      Log in
                    </Button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <Button 
                      size="sm" 
                      className="w-full text-sm bg-black text-white hover:bg-gray-800"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign up
                    </Button>
                  </SignInButton>
                </SignedOut>
                
                <SignedIn>
                  <Link href="/builder">
                    <Button 
                      size="sm" 
                      className="w-full text-sm bg-black text-white hover:bg-gray-800"
                      onClick={() => setIsOpen(false)}
                    >
                      Create Form
                    </Button>
                  </Link>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}