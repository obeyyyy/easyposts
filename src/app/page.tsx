"use client";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../app/firebase"; // Ensure this path is correct
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          router.push('/Main');
        } else {
          router.push('/login'); // Redirect to login if not logged in
        }
      });

      return () => unsubscribe(); // Cleanup subscription on unmount
    }
  }, [router]);

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>Loading...</div> {/* Show loading state while checking auth status */}
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div><h2>Welcome {user.email}</h2></div>
    </main>
  );
}
