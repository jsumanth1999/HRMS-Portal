import { User } from "@/models/users";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import connectToMongoDB from "@/dbConfig/dbConnnect";

//connecting to mongodb
connectToMongoDB()

//login 
export async function POST(NextRequest){

    const reqbody = await NextRequest.json();

    const { email, password } = reqbody;

    if (!email || !password) {
        return NextResponse.json({
            message: "Please enter required fields",
        })
    }

    let user = await User.findOne({email, password});

    if(!user){
        return NextResponse.json({
            message: "Please, Enter valid credentials."
        },{status: 404})
    }

    const token = jwt.sign({_id : user._id, email: user.email,role: user.role},process.env.SECRET_KEY, {expiresIn: '1h'});

    return NextResponse.json({
        userID: user._id,
        role: user.role,
        message: "Login Successfully...",
        token
    })

}


