"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setShowContent(true);
    }
  }, [isLoaded]);

  if (!showContent) {
    return null;
  }

  // Render children only when we know the auth state
  return <>{isSignedIn ? children : null}</>;
}