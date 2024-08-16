// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2U37Vqt7c6p_nnhA8hbUx4fKvV6AfdMs",
  authDomain: "socialmediaauto-cbb23.firebaseapp.com",
  projectId: "socialmediaauto-cbb23",
  storageBucket: "socialmediaauto-cbb23.appspot.com",
  messagingSenderId: "277405031589",
  appId: "1:277405031589:web:122b0479984ceb5156414c",
  measurementId: "G-T00E6Q0H3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, FacebookAuthProvider, TwitterAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult };
