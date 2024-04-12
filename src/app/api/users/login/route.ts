import {connect} from '@/dbConfig/dbConfig'
import User from '@/model/user.model'
import { NextResponse , NextRequest} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request:NextRequest) {
    try {
        
        const reqBody = await request.json()
        const{email, password} = reqBody
        const user =await User.findOne({email})
        if(!user){
            return NextResponse.json({error:'User not found'}, {status:400})
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if(!isPasswordCorrect){
            return NextResponse.json({error:'Invalid credentials'}, {status:400})
        }

        const tokendata = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:'1d'})

       const response = NextResponse.json({message:'Login successful', success:true, user}, {status:200})

        response.cookies.set('token', token, {
            httpOnly:true,
        })

        return response

        

    } catch (error:any) {
        

        return NextResponse.json({error:error.message}, {status:500})


    }
}

