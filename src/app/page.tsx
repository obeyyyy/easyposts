"use client"
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {auth} from "../app/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        router.push('/Main')
        
      } else {
        router.push('/login'); // Redirect to login if not logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div><h2>Welcome {user.email}</h2></div>
      </main>
    );
  }

  return null; // Return nothing if user state is not yet determined
}
