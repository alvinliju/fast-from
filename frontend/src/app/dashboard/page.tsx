"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SimpleDashboard() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  // Redirect to home if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading state while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Show nothing if not signed in (redirecting)
  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Dashboard</h1>
          <p className="text-gray-600">Manage your forms and responses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Create New Form</h2>
            <p className="text-gray-600 mb-4">Build a new form with our Notion-style editor</p>
            <Link href="/builder">
              <Button className="w-full">Create Form</Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">View Your Forms</h2>
            <p className="text-gray-600 mb-4">Manage and view responses for your existing forms</p>
            <Link href="/forms">
              <Button variant="outline" className="w-full">View Forms</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}