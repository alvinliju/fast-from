"use client";

import * as React from "react";
import { ArrowRight, Zap, Smartphone, Share2, ChevronDown, Menu, X, Play } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/gradient-button"
import { Button } from "@/components/ui/button"
import { FastFormFooter } from "@/components/footer/Footer"

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-lg font-medium text-black">FastForm</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-50">
              Features
            </a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-50">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-50">
              Help
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-sm">
              Log in
            </Button>
            <Button size="sm" className="text-sm bg-black text-white hover:bg-gray-800">
              Sign up
            </Button>
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
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs bg-gray-50 text-gray-600 mb-8 border border-gray-100">
          <span className="mr-1.5">✨</span>
          Currently in beta
        </div>
        
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-black mb-6 leading-tight tracking-tight">
          Forms that don't{" "}
          <span className="text-red-500">suck</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Stop wrestling with Google Forms' garbage UX. FastForm gives you beautiful, 
          mobile-first forms with zero learning curve.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <GradientButton >
            Start creating forms
          </GradientButton>
          <Button variant="outline"  className="gap-2 border-gray-300 px-8 py-6">
            <Play className="w-4 h-4" />
            Watch demo
          </Button>
        </div>
        
        {/* Social Proof */}
        <p className="text-xs text-gray-500">
          Trusted by 10,000+ teams who ditched Google Forms
        </p>
      </div>
    </div>
  );
}

function Features() {
  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning fast",
      description: "Create forms in seconds with / commands. No learning curve."
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile first",
      description: "WhatsApp-style experience. One question at a time."
    },
    {
      icon: <Share2 className="w-5 h-5" />,
      title: "Instant sharing",
      description: "Get public URL immediately. Works on all devices."
    }
  ];

  return (
    <div className="py-24 bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-black mb-3">
            Finally, forms that work on mobile
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Google Forms is from 2008. Your users deserve better.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-medium text-black mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div className="py-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-black mb-4">
          Ready to ditch Google Forms?
        </h2>
        <p className="text-gray-600 mb-8">
          Free forever. Unlimited forms, up to 100 responses per month. 
          No credit card required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
        <GradientButton variant="variant">Get Started</GradientButton>
          <Button variant="outline" className="border-gray-300 px-8 py-6">
            View pricing
          </Button>
        </div>
        
        <p className="text-xs text-gray-500">
          Join thousands who've already upgraded from Google Forms
        </p>
      </div>
    </div>
  );
}

function FastFormLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <CTA />
      <FastFormFooter />
    </div>
  );
}
export default FastFormLanding;

