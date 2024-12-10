
import { Leaves } from '@/models/Leaves';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(NextRequest, { params }) {
    const authorization = await NextRequest.headers.get('authorization');

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

    const { Id } = await params;
    const Exists = mongoose.Types.ObjectId.isValid(Id);
    console.log(Exists);


    if (!Exists) {
        return NextResponse.json({
            message: "Leave is not exists",
        }, { status: 400 })
    }

    try {
        const data = await Leaves.findById(Id);

        return NextResponse.json({
            message: "Leave By Id is listed successfully...",
            data,
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error while fetching the data by Id",
        }, { status: 400 })
    }

}

export async function PUT(req, { params }) {
    const authorization = req.headers.get('authorization');
    console.log("authorization", authorization);

    if (!authorization) {
        return NextResponse.json({
            message: "Token is Missing"
        });
    }

    const token = authorization;
    let payload;
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);
        console.log(payload);
    } catch (error) {
        return NextResponse.json({
            message: "Token is Invalid or Expired."
        }, { status: 401 });
    }

    const { Id } = params;
    if (!Id) {
        return NextResponse.json({
            message: "User ID is required."
        }, { status: 400 });
    }

    const reqbody = await req.json();
    const { leaveDescription, fromDate: fromdate, toDate: todate, reasonsForApplying } = reqbody;

    if (!leaveDescription || !fromdate || !todate || !reasonsForApplying) {
        return NextResponse.json({
            message: "Please enter required fields"
        });
    }

    try {
        const date = new Date(fromdate);
        const todat = new Date(todate);

        const from = date.toISOString();
        const to = todat.toISOString();

        const data = await Leaves.findByIdAndUpdate(Id, {
            leaveDescription,
            fromDate: from,
            toDate: to,
            reasonsForApplying,
        }, { new: true });

        return NextResponse.json({
            message: "Leave updated successfully...",
            data
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error while updating data using id"
        }, { status: 400 });
    }
}

export async function PATCH(req, { params }) {
    const authorization = req.headers.get('authorization');
    console.log("authorization", authorization);

    if (!authorization) {
        return NextResponse.json({
            message: "Token is Missing"
        });
    }

    const token = authorization;
    let payload;
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);
        console.log(payload);
    } catch (error) {
        return NextResponse.json({
            message: "Token is Invalid or Expired."
        }, { status: 401 });
    }

    const { Id } = await params;
    if (!Id) {
        return NextResponse.json({
            message: "User ID is required."
        }, { status: 400 });
    }

    const reqbody = await req.json();
    const { leaveDescription, fromDate: fromdate, toDate: todate, reasonsForApplying } = reqbody;

    if (!leaveDescription || !fromdate || !todate || !reasonsForApplying) {
        return NextResponse.json({
            message: "Please enter required fields"
        });
    }

    try {
        const date = new Date(fromdate);
        const todat = new Date(todate);

        const from = date.toISOString();
        const to = todat.toISOString();

        const data = await Leaves.findByIdAndUpdate(Id, {
            leaveDescription,
            fromDate: from,
            toDate: to,
            reasonsForApplying,
        }, { new: true });

        return NextResponse.json({
            message: "Leave updated successfully...",
            data
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error while updating data using id"
        }, { status: 400 });
    }
}

export async function DELETE(NextRequest, {params}){
    const authorization = await NextRequest.headers.get('authorization');

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
    
    const {Id} = params;

    const Exists = mongoose.Types.ObjectId.isValid(Id);

    if(!Exists){
        return NextResponse.json({
            message: "Id is not found"
        },{status: 404})
    }
    
    try {
        const data = await Leaves.findByIdAndDelete(Id);
        return NextResponse.json({
            message: "Leave is deleted successfully...",
            data,
        },{status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error While deleting the Leave",
        },{status: 400})
    }

}
