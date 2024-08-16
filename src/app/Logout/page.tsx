"use client";


import { signOut } from "firebase/auth";
import {auth} from "../firebase"
import { useRouter } from "next/navigation";



export default function logout()  {
const router = useRouter();
signOut(auth).then(() => {
  // Sign-out successful.
  router.push("/")
}).catch((error) => {
  // An error happened.
});
}