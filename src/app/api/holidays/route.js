
import jwt from 'jsonwebtoken';
import { Holidays } from '@/models/Holidays';
import { NextResponse } from 'next/server';

export async function GET(NextRequest) {

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

    try {
        const data = await Holidays.find({});
        return NextResponse.json({
            message: "Holidays listed successfully...",
            data,
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error while fetching the data from holidays list"
        })
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
    const { title, date: inputDate, holidayType, alternateWorkingDate, year } = reqbody;

    if (!title || !inputDate || !holidayType || !year) {
        return NextResponse.json({
            message: "Please enter required fields"
        });
    }

    try {
        // Check if the inputDate is a valid date string
        const date = new Date(inputDate);
        
        // Validate the date
        if (isNaN(date.getTime())) {
            return NextResponse.json({
                message: "Invalid date provided"
            }, { status: 400 });
        }

        // Convert the date to ISO format (UTC)
        const formattedDate = date.toISOString();

        // Create the holiday record
        const data = await Holidays.create({
            userId: payload._id,
            title,
            date: formattedDate,
            holidayType,
            year,
            alternateWorkingDate
        });

        return NextResponse.json({
            message: "Holiday is created successfully...",
            data
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error while creating holidays",
        },{status: 400});
    }
}

