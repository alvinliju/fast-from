"use client";

import { useAuth, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleCreateForm = () => {
    if (isSignedIn) {
      router.push("/builder");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">FastForm</h1>
        <p className="text-xl text-gray-600 mb-8">
          Create beautiful forms in seconds. No sign-up required to view forms, 
          but you'll need an account to create them.
        </p>
        
        <SignedOut>
          <div className="flex flex-col gap-4">
            <SignInButton mode="modal">
              <Button size="lg" className="text-lg px-8 py-6">
                Sign In to Create Forms
              </Button>
            </SignInButton>
            <p className="text-sm text-gray-500">
              Already have a form link? Just paste it in your browser!
            </p>
          </div>
        </SignedOut>
        
        <SignedIn>
          <div className="flex flex-col gap-4">
            <Button 
              onClick={handleCreateForm}
              size="lg" 
              className="text-lg px-8 py-6"
            >
              Create New Form
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push("/forms")}
              size="lg" 
              className="text-lg px-8 py-6"
            >
              View My Forms
            </Button>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
