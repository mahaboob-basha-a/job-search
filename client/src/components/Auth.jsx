import React, { use, useState } from 'react'
import loginImg from '../assets/Job-platform.png'
import { toast } from 'react-toastify'
import { login, signup } from '../api/api'
import { Navigate, useNavigate } from 'react-router-dom'

const Auth = () => {
  const [state,setState] = useState('Login');
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleState = ()=>{
    setState(prev=> prev === "Login" ? "SignUp" : "Login")
  }

  const handleAuthentication = async (e)=>{
    e.preventDefault();
    if(state === "Login"){
      if(!email || !password || password.length < 5){
        toast.error("All fields required")
      }else{
        try {
          const res = await login({email,password})
          localStorage.setItem("token",res.token)
          toast.success(res.message)
          return navigate('/')
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message || "Invalid credintials")
        }
      }
    }else{
      if(!name || !email || !phone || !password || password.length < 5){
        toast.error("All fields required")
      }else{
        try {
          const res = await signup({name,email,phone,password})
          toast.success(res.message)
          handleState()
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message || "Invalid credintials")
        }
      }
    }
  }

  if(token){
    return <Navigate to='/' />
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center shadow-lg rounded'>
        <div className='px-6 max-md:flex max-md:flex-col max-md:items-center'>
          <h2 className='text-xl font-medium'>
          {state === 'Login' ? "Already have an account?" : "Create an account"}
          </h2>
          <p className='text-xs py-1'>Your personal job finder is here</p>
          <form onSubmit={handleAuthentication}>
          <div className='flex flex-col max-w-60 gap-2 py-1'>
            {state !== "Login" && <input value={name} onChange={e=>setName(e.target.value)} type="text" required placeholder='Name' className='outline-none border border-gray-400 rounded py-1 text-sm px-1.5 text-gray-800'/>}
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder='Email' className='outline-none border border-gray-400 text-gray-800 text-sm rounded py-1 px-1.5'/>
            {state !== "Login" && <input value={phone} onChange={e=>setPhone(e.target.value)} type="text" required placeholder='Mobile' className='outline-none border border-gray-400 rounded py-1 px-1.5 text-gray-800 text-sm'/>}
            <input value={password} onChange={e=>setPassword(e.target.value)} type="text" required placeholder='Password' className='outline-none border border-gray-400 text-gray-800 text-sm rounded py-1 px-1.5'/>
          </div>

          {state !== "Login" && <div className='flex items-center gap-1 py-1 text-wrap justify-center max-md:max-w-3xs'>
            <input type="checkbox" />
            <span className='text-gray-400 text-xs'>By creating an account, I agree to our terms of use and privacy policy</span>
          </div>}
          <button type='submit' className={`py-1 ${state === 'Login' ? "px-4" : "px-1.5"} my-1.5 font-medium text-sm rounded-sm text-white bg-red-400 cursor-pointer`}>{state === "Login" ? "Sign in" : "Create Account"}</button>
          </form>
          <p className='text-xs py-2'>Already have an account? <span className='border-b cursor-pointer font-medium' onClick={handleState}>{state === "Login" ? "Sign Up" : "Sign In"}</span></p>
        </div>
        <img src={loginImg} className='w-sm max-md:hidden' alt="" />
      </div>
    </div>
  )
}

export default Auth