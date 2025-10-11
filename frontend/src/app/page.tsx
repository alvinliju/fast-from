"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Hero } from "@/components/landing/hero";
import { FeaturesSection } from "@/components/landing/features";
import { PricingSection } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { CTA } from "@/components/landing/cta";

export default function Landing() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  // Redirect logged-in users to dashboard
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading state while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show nothing if signed in (redirecting)
  if (isSignedIn) {
    return null;
  }

  // Show landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-white antialiased">
      <Hero />
      <FeaturesSection />
      <PricingSection />
      <CTA />
      <Footer />
    </div>
  );
}