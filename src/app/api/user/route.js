import connectToMongoDB from "@/dbConfig/dbConnnect";
import { User } from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectToMongoDB();

export async function POST(NextRequest) {

    const reqbody = await NextRequest.json();
    const authorization = await NextRequest.headers.get('authorization');
    console.log("authorization", authorization);

    //token validation
    if (!authorization) {
        return NextResponse.json({
            message: "Token is Missing"
        })
    }

    const token = authorization;
    let payload;
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);
        console.log(payload);
    } catch (error) {
        return NextResponse.json({
            message: "Token is Invalid or Expired."
        }, { status: 401 })
    }


    const { employeeId, email, firstName, lastName, password, saluation, middleName, dateOfBirth, role, employeeType, category,
        status, designation, division, taxProcessor, dateOfJoining, pfJoinDate, dateOfConfirmation } = reqbody;


    if (!employeeId || !email || !firstName || !lastName || !role || !password) {
        return NextResponse.json({
            message: "Please Enter Required Fields"
        }, {
            status: 400
        })
    }

    const user = await User.findOne({ email, employeeId })

    if (user) {
        return NextResponse.json({
            message: "User already exists with respective email or employeeId"
        })
    }

    await User.create({
        firstName,
        lastName,
        middleName,
        saluation,
        employeeId,
        employeeType,
        dateOfBirth,
        email,
        password,
        category,
        status,
        designation,
        division,
        taxProcessor,
        dateOfJoining,
        pfJoinDate,
        dateOfConfirmation,
        role
    })

    return NextResponse.json({
        message: "User is created successfully...",
        payload
    }, {
        status: 200
    })

}

export async function GET(NextRequest) {
    const authorization = await NextRequest.headers.get('authorization');
    console.log("authorization", authorization);

    if (!authorization) {
        return NextResponse.json({
            message: "Token is Missing"
        })
    }

    const token = authorization;
    let payload;
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);
        console.log(payload);
    } catch (error) {
        return NextResponse.json({
            message: "Token is Invalid or Expired."
        }, { status: 401 })
    }

    try {
        const data = await User.find({});
        return NextResponse.json({
            message: "User listed successfully...",
            data
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "Error while fetching the data",
        }, { status: 400 })
    }

}



export async function DELETE(NextRequest) {

    const authorization = await NextRequest.headers.get('authorization');
    console.log("authorization", authorization);

    if (!authorization) {
        return NextResponse.json({
            message: "Token is Missing"
        })
    }

    const token = authorization;
    let payload;
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);
        console.log(payload);
    } catch (error) {
        return NextResponse.json({
            message: "Token is Invalid or Expired."
        }, { status: 401 })
    }

    const { userId } = NextRequest.params;

    try {
        const data = await User.findByIdAndDelete(userId);
        return NextResponse.json({
            message: "User is deleted Successfully...",
            data,
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error while deleting the data",
        }, { status: 500 })
    }



}


