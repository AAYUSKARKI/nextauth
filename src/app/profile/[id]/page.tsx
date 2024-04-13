'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Profilepage ({params}:any) {
    return(
        <div className='flex justify-center'>
            <h1>{params.id}</h1>
            </div>
    )
}