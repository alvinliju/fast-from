"use client";
import { useUser, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
 import { Button } from "@/components/ui/button";
 import Link from "next/link";

 export default function Header() {
   const { isSignedIn, user } = useUser();

  return (
<header className="border-b">
   <div className="container flex h-16 items-center justify-between px-4">
       <Link href="/" className="text-xl font-bold">
        FastForm
      </Link>

    <div className="flex items-center gap-4">
      <SignedOut>
      <SignInButton mode="modal">
            <Button>Sign In</Button>
     </SignInButton>
           </SignedOut>
   
           <SignedIn>
             <Link href="/builder">
               <Button variant="ghost">Create Form</Button>
          </Link>
                <Link href="/forms">
               <Button variant="ghost">My Forms</Button>
             </Link>
             <UserButton />
              </SignedIn>
            </div>
          </div>
        </header>
      );
 }