"use client"
import { useRouter} from "next/navigation";
import { useState } from 'react'
import './Login.css'
import { BrowserRouter as Routers, Routes , Route, Navigate, Await } from 'react-router-dom'
import HomePage from '../page'
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth}  from '../firebase'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Sign_in(){

const [email, setEmail] = useState("") // email variable
const[password, setPassword] = useState("") // password variable
const[name, setname] = useState("") // name variable

const router = useRouter(); // router for navigation
var signedIn = false

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const[emailError, setEmailError] = useState("")
  const[labelError, setLabelError] = useState("")

  const[NameError, setNameError] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const[passwordError,setPasswordError]= useState("")
//  const navigate = useNavigate();

  const Sign_in = () =>{
    setEmailError("")
    setPasswordError("")
    setNameError("")
    setLabelError("")

    if("" === email){
      setEmailError("Please enter your email")
      return
    }

    if("" === name)
        {
          setPasswordError("Please enter a name")
          return
        }

    if("" === password)
        {
          setPasswordError("Please enter a password")
          return
        }  
        
    if(password.length<7){
      setPasswordError("password must be 8 character or longer")
      return
    }

    if(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
      setEmailError("please enter a valid email address")
      return
    }
   
    if(email){
        Await
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        signedIn = true
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLabelError("Wrong Credentials")
        // ..
    });
    
    if(signedIn == true)
      return(
      <>
      {
        router.push('/')
      }
       
      </>
      )
   
  //navigate("../Home")

  }
  }


    return(
      
  <div className="login-box">
  <h2>Login</h2>
  <form>
  <div className="user-box"> 
        <input  
        value={name}
        placeholder='Enter Name'
        onChange={ev=> setname(ev.target.value)}
        className={"user-box"}      
        />
      <label className='errorLabel'>{NameError}</label>
    </div>

    <div className="user-box">
        <input  
        value={email}
        placeholder='Enter email address' 
        onChange={ev=> setEmail(ev.target.value)}
        className={"user-box"}        
        />
      <label className='errorLabel'>{emailError}</label>
    </div>
    
    <div className="user-box">
      <input 
      value={password}
      placeholder='Enter password'
      onChange={ev=>setPassword(ev.target.value)}
      className={'user-box'}
      
      />
      <label className='errorLabel'>{passwordError}</label>
    </div>
    
    <input onClick={Sign_in}
      className={"inputButton"}
      type="button"      
      value={"Sign in"}
    />
  </form>
  <label className='errorLabel'>{labelError}</label>
</div>     
        
)
}

export default Sign_in