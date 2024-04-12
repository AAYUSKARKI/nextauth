import nodemailer from 'nodemailer'
import User from '@/model/user.model'
import bcryptjs from 'bcryptjs'
export const sendemail = async({email,emailtype,userId}:any)=>{
    try {

        const hashtoken = await bcryptjs.hash(userId.toString(),10)
        
        if(emailtype === 'verify'){

            await User.findByIdAndUpdate(userId,{$set:{verifyToken:hashtoken,verifyTokenExpiry:Date.now()+3600000}})
        
        }
        else if(emailtype === 'reset'){

            await User.findByIdAndUpdate(userId,{$set:{forgotPasswordToken:hashtoken,forgotPasswordExpiry:Date.now()+3600000}})

        }



        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: true,
            auth: {
              user: process.env.EMAIL, // generated ethereal user
              pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: emailtype === 'verify' ? 'Verify your email' : 'Reset your Password', // Subject line
            html: `<p>Click<a href="${process.env.DOMAIN}/verifyemail?token=${hashtoken}">here</a> 
            to ${emailtype === 'verify' ? 'verify your email' : 'reset your password'} 
            or copy and paste this link in your browser
            <br>{process.env.DOMAIN}/verifyemail?token=${hashtoken}
            </p>`, // html body
        }

     const mailresponse =  await transporter.sendMail(mailOptions)

     return mailresponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}