"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Hero } from "@/components/landing/hero";
import { FeaturesSection } from "@/components/landing/features";
import PricingSection from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";
import CTA from "@/components/landing/cta";

export default function Landing() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#d97706] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] px-22">
      <Hero />
      <FeaturesSection />
      <PricingSection />
      <CTA />
      <Footer />
    </div>
  );
}
