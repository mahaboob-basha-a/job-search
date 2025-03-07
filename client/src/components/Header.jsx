import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { getProfile, logout } from '../api/api';

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [user,setUser] = useState(null);

  const handleProfile = async ()=>{
    try {
      const res = await getProfile();
      if(res.user){
        setUser(res.user);
      }else{
        setUser(null)
      }
      
    } catch (error) {
      setUser(null)
      toast.error("Profile details error")
    }
  }
  const handleLogout = async ()=>{
    try {
      const res = await logout();
      toast.success(res.message) 
      localStorage.removeItem("token")
      setUser(null)
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  useEffect(()=>{
    if(token){
      handleProfile();
    }
  },[])

  return (
    <div className='w-full flex items-center justify-between py-6 px-12 rounded-b-3xl bg-gradient-to-r from-red-500 to-red-400'>
        <h2 className='text-xl text-white font-medium'>JobStation</h2>
        
        {(!token || !user) && <div className='flex items-center gap-6'>
            <button onClick={()=>navigate("/auth")} className='text-white text-sm border border-white rounded py-1 px-2 bg-transparent cursor-pointer'>Login</button>
            <button onClick={()=>navigate("/auth")} className='text-red-500 text-sm bg-white rounded py-1 px-1.5 cursor-pointer'>Register</button>
        </div>}

        {token && user && <div className='flex items-center gap-4'>
          <button onClick={handleLogout} className='border-0 bg-transparent text-white text-sm cursor-pointer'>Logout</button>
          <button className='border-0 bg-transparent text-white text-sm cursor-pointer'>Dashboard</button>
          <p className='h-10 w-10 flex items-center justify-center text-lg rounded-full bg-gray-200 text-black font-medium capitalize'>{user?.name[0]}</p>
        </div>}
    </div>
  )
}

export default Header;