'use client';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
export default function Profilepage () {
    const [data,setdata] = useState('nothing')

    const getData = async () => {
        try {
            const res = await axios.post('/api/users/me')
            setdata(res.data.data._id)
            toast.success(res.data.message)
        } catch (error:any) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

    const onLogout = async () => {
        try {
            const res = await axios.get('/api/users/logout')
            toast.success(res.data.message)
        } catch (error:any) {
            console.log(error)
            toast.error(error.message)
        }
    }

  return (
    <>
    <Toaster/>
    <button onClick={onLogout}>Logout</button>
    <button onClick={getData}>Getdata</button>
    <div>Profilepage {data}</div>
    </>
  )
}
