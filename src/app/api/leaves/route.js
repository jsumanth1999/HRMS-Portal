const { Leaves } = require("@/models/Leaves");
const { NextResponse } = require("next/server");
import jwt from 'jsonwebtoken';


export async function GET(NextRequest){

    const authorization = NextRequest.headers.get('authorization');

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

    try {
        const data = await Leaves.find({});
        return NextResponse.json({
            message: "Leaves Listed Successfully...",
            data,
        },{status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error while fetching leaves"
        },{status: 400})
    }

}


export async function POST(NextRequest) {
    const authorization = NextRequest.headers.get('authorization');

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

    const reqbody = await NextRequest.json();
    const { leaveDescription, fromDate : fromdate, toDate : todate, reasonsForApplying } = reqbody;

    if (!leaveDescription || !fromdate || !todate || !reasonsForApplying) {
        return NextResponse.json({
            message: "Please enter required fields"
        });
    }

    try {
        // Check if the inputDate is a valid date string
        const date = new Date(fromdate);
        const todat = new Date(todate);

        // Validate the date
        if (isNaN(date.getTime())) {
            return NextResponse.json({
                message: "Invalid date provided"
            }, { status: 400 });
        }

        // Convert the date to ISO format (UTC)
        const from = date.toISOString();
        const to = todat.toISOString();
        // Create the holiday record
        const data = await Leaves.create({
            userId: payload._id,
            leaveDescription,
            fromDate: from,
            toDate: to,
            reasonsForApplying
        });

        return NextResponse.json({
            message: "Leaves is applied successfully...",
            data
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error while applying leave",
        },{status: 400});
    }
}

