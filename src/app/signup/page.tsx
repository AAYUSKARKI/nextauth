'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast'
import Link from 'next/link';
export default function SignupPage() {
  // const router = useRouter()
  const[user,setUser] = useState({
    username:'',
    email:'',
    password:''
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      console.log(user)
      const response = await axios.post('/api/users/signup', user)
      console.log('signup successful',response.data.message)
      toast.success(response.data.message)
      // router.push('/login')

    } catch (error:any) {

      console.log('signup failed',error)
      
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
  }
  else{
    setButtonDisabled(true)
  }
  },[user])
  return (
    <>
    <Toaster/>
    <div className='flex justify-center items-center'>
    <div className='w-full max-w-xs'>
      <h1>{loading?'processing':'signup'}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input 
      type='text'
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' 
      value={user.username}
      onChange={(e)=>setUser({...user,username:e.target.value})}
      placeholder='username'
      />

      <label htmlFor="email">email</label>
      <input
      type='email'
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      value={user.email}
      onChange={(e)=>setUser({...user,email:e.target.value})}
      placeholder='email'
      />

      <label htmlFor="password">password</label>
      <input
      type='password'
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      value={user.password}
      onChange={(e)=>setUser({...user,password:e.target.value})}
      placeholder='password'
      />

      <button 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={onSignup}>
        {buttonDisabled?'no signup':'signup'}
        </button>

        <Link href={'/login'}>login</Link>
    </div>
    </div>
    </>
  )
}

