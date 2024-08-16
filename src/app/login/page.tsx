"use client"
import { useRouter } from "next/navigation";
import { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth}  from '../firebase';

function Login() {
  const [email, setEmail] = useState(""); // email variable
  const [password, setPassword] = useState(""); // password variable
  const [loading, setLoading] = useState(false); // loading state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter(); // router for navigation

  const Logged_in = () => {
    setEmailError("");
    setPasswordError("");

    if (email === "") {
      setEmailError("Please enter your email");
      return;
    }

    if (password === "") {
      setPasswordError("Please enter a password");
      return;
    }
    
    if (password.length < 7) {
      setPasswordError("Password must be 8 characters or longer");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setLoading(true); // Set loading to true when starting the sign-in process

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setLoading(false); // Stop loading when sign-in is successful
        router.push('/'); // Redirect to home page
      })
      .catch((error) => {
        setLoading(false); // Stop loading if there's an error
        const errorCode = error.code;
        const errorMessage = error.message;
        
        if (errorCode === "auth/wrong-password") {
          setPasswordError("Wrong password");
        } else if (errorCode === "auth/user-not-found") {
          setEmailError("User not found");
        } else {
          setEmailError(errorMessage);
        }
      });
  };

  const CreateAccount = () => {
    router.push('/CreateAccount');
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form>
        <div className="user-box">
          <input
            value={email}
            placeholder='Enter email address'
            onChange={ev => setEmail(ev.target.value)}
            className={"user-box"}
            disabled={loading} // Disable input when loading
          />
          <label className='errorLabel'>{emailError}</label>
        </div>
        <div className="user-box">
          <input
            value={password}
            placeholder='Enter password'
            onChange={ev => setPassword(ev.target.value)}
            className={'user-box'}
            type="password"
            disabled={loading} // Disable input when loading
          />
          <label className='errorLabel'>{passwordError}</label>
        </div>
        <input
          onClick={Logged_in}
          className={"inputButton"}
          type="button"
          value={loading ? "Processing..." : "Submit"} // Show loading text
          disabled={loading} // Disable button when loading
        />
        <input
          onClick={CreateAccount}
          className={"inputButton"}
          type="button"
          value={"Create Account"}
          disabled={loading} // Disable button when loading
        />
      </form>
    </div>
  );
}

export default Login;
