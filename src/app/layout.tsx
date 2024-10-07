import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

import { Inter } from "next/font/google";
import StreamVideoProvider from "@/providers/StreamVideoProvider";

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <StreamVideoProvider>
            <nav className="w-full py-4 md:px-8 px-4 text-center flex items-center justify-between sticky top-0 bg-white ">
              <div className="flex items-center justify-end gap-5">
                {/*-- if user is signed out --*/}
                <SignedOut>
                  <SignInButton mode="modal" />
                </SignedOut>
                {/*-- if user is signed in --*/}
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </nav>

            {children}
          </StreamVideoProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
