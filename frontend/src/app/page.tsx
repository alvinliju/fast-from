"use client";

import * as React from "react";
import { ArrowRight, Zap, Shield, Smartphone, BarChart3, Users, Star, Menu, X, Play, Check, Twitter, Github, Linkedin, BellIcon, FileTextIcon, NutIcon, GlobeIcon, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/blocks/hero-section"
import { Icons } from "@/components/ui/icons";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import Link from 'next/link'
import { CTASection } from "@/components/blocks/cta-with-rectangle";



function Hero(){
  return (
    <HeroSection
      badge={{
        text: "v0.1 BETA",
        action: {
          text: "",
          href: "/",
        },
      }}
      title="Build beautiful forms in minutes"
      description="Stop settling for clunky form builders. Get the features you need without the complexity you don't."
      actions={[
        {
          text: "Get Started",
          href: "/builder",
          variant: "default",
        },
        {
          text: "GitHub",
          href: "https://github.com/alvinliju/fast-from",
          variant: "glow",
          icon: <Icons.gitHub className="h-5 w-5" />,
        },
      ]}
      image={{
        light: "https://www.launchuicomponents.com/app-light.png",
        dark: "https://www.launchuicomponents.com/app-dark.png",
        alt: "UI Components Preview",
      }}
    />
  )
}

function Features() {
  const features = [
    {
      Icon: FileTextIcon,
      name: "Notion-Style Builder",
      description: "Use `/` to add questions, just like Notion. No complicated editors or setup wizards.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: NutIcon,
      name: "6 Question Types",
      description: "Short text, long text, email, number, multiple choice, and checkboxes. More coming soon.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: GlobeIcon,
      name: "Multi-Step Forms",
      description: "Add page breaks that actually work. No hacks or workarounds needed.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: CalendarIcon,
      name: "Instant Sharing",
      description: "Get a public URL immediately. No publishing steps or complicated settings.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: BellIcon,
      name: "Response Collection",
      description: "Collect form submissions and store them in your database. View responses in real-time.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];

  return (
    <section id="features">
      <BentoGrid className="lg:grid-rows- py-16">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </section>
  )
}

function Pricing() {
    return (
        <section id="pricing" className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h1 className="text-center text-4xl font-semibold lg:text-5xl">Pricing that doesn't suck</h1>
                    <p className="text-muted-foreground mt-4 text-xl" >More features, less money.</p>
                </div>

                <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-5 md:gap-0">
                    <div className="rounded-(--radius) flex flex-col justify-between space-y-8 border p-6 md:col-span-2 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10">
                        <div className="space-y-4">
                            <div>
                                <h2 className="font-medium">Free Forever</h2>
                                <span className="my-3 block text-2xl font-semibold">$0 / mo</span>
                                <p className="text-muted-foreground text-sm">No credit card required</p>
                            </div>

                            <Button
                                asChild
                                variant="outline"
                                className="w-full">
                                <Link href="/builder">Start Building</Link>
                            </Button>

                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {[
                                    'Unlimited forms', 
                                    '1,000 responses/month', 
                                    'All 6 question types',
                                    'Multi-step forms',
                                    'Notion-style builder',
                                    'Public form sharing'
                                ].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="dark:bg-muted rounded-(--radius) border p-6 shadow-lg shadow-gray-950/5 md:col-span-3 lg:p-10 dark:[--color-muted:var(--color-zinc-900)]">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="font-medium">Pro</h2>
                                    <span className="my-3 block text-2xl font-semibold">$12 / mo</span>
                                    <p className="text-muted-foreground text-sm">Coming soon</p>
                                </div>

                                <Button
                                    asChild
                                    className="w-full"
                                    disabled>
                                    <Link href="">Notify Me</Link>
                                </Button>
                            </div>

                            <div>
                                <div className="text-sm font-medium">Everything in free plus:</div>

                                <ul className="mt-4 list-outside space-y-3 text-sm">
                                    {[
                                        '10,000 responses/month',
                                        'Remove FastForm branding', 
                                        'Response analytics dashboard',
                                        'Export responses to CSV',
                                        'Custom form domains',
                                        'Team collaboration (5 users)',
                                        'Email notifications',
                                        'Priority support'
                                    ].map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2">
                                            <Check className="size-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-600 mb-4">
                        <strong>Compare to competitors:</strong> Typeform charges $25/mo for 100 responses. JotForm charges $24/mo for 1,000 responses.
                    </p>
                    <p className="text-xs text-gray-500">
                        We're shipping fast and keeping prices low. No venture capital bullshit, just honest pricing.
                    </p>
                </div>
            </div>
        </section>
    )
}

function CTA(){
  return (
    <CTASection
      badge={{
        text: "Ready to ditch Google Forms?"
      }}
      withGlow={true}
      title="Start building forms that don't suck"
      description="Join thousands who've already upgraded from clunky form builders. Free forever, no credit card required."
      action={{
        text: "Build Your First Form",
        href: "/builder",
        variant: "default"
      }}
    />
  )
}

function Footer() {
  return (
    <footer className="mt-32">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left side - Brand */}
          <div className="flex flex-col gap-3">
            <div className="text-lg font-semibold text-gray-900">FastForm</div>
            <p className="text-sm text-gray-600 max-w-sm">
              Built by <a href="https://twitter.com/e3he0" className="text-gray-900 hover:text-gray-700 font-medium">@e3he0</a> because form builders suck
            </p>
          </div>
          
          {/* Right side - Links */}
          <div className="flex gap-8 text-sm">
            <a href="https://github.com/alvinliju/fast-from" className="text-gray-600 hover:text-gray-900">
              GitHub
            </a>
            <a href="https://twitter.com/e3he0" className="text-gray-600 hover:text-gray-900">
              Twitter
            </a>
            <a href="/builder" className="text-gray-600 hover:text-gray-900">
              Build
            </a>
          </div>
        </div>
        
        {/* Bottom row - super minimal */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-6">
            <span>© 2025 FastForm</span>
            <span>MIT License - Do whatever you want with it</span>
          </div>
          <div className="flex items-center gap-6">
            <span>No tracking, no BS</span>
            <span>Made with ☕ and frustration</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FastFormLanding() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-white  space-y-16 px-8">
      <Hero />
      <div className="w-full h-full">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
                    <h1 className="text-center text-4xl font-semibold lg:text-5xl">Minimalistic, no-nonsense design</h1>
                    <p className="text-muted-foreground mt-4 text-xl">be more productive, spend less time in your dashboard</p>
                </div>
      <Features />
      <Pricing />
      </div>
      <CTA />

      <Footer />
    </div>
  );
}

export default FastFormLanding;

