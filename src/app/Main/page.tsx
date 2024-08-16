"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {auth}  from "../firebase";
import { useRouter } from "next/navigation";
import NavbarComponent from "../NavBarComponent"

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    if (typeof window !== "undefined") {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is signed in
      } else {
        router.push('/login'); // User is signed out, redirect to login
      }
    });

    return () => unsubscribe(); // Clean up subscription
  }
}
, [router]);

  if (user) {
    return (
      <>
        <NavbarComponent /> {/* Add the Navbar to the page */}
        <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
          <div><h2>Welcome {user.email}</h2></div>
        </main>
      </>
    );
  }

  return null; // Or a loading spinner if you want to show one while checking auth state
}
