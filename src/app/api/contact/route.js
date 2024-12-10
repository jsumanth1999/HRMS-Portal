import connectToMongoDB from "@/dbConfig/dbConnnect";
import { Contacts } from "@/models/Contacts";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

connectToMongoDB()

// Get Contact Details
export async function GET(NextRequest) {
    const authorization = await NextRequest.headers.get('authorization');
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

    let response;

    try {
        response = await Contacts.find({});
        console.log(response);
    } catch (error) {
        return NextResponse.json({
            message: "Error while listing contact details..."
        });
    }

    return NextResponse.json({
        message: "Contact Details listed successfully...",
        response
    }, { status: 200 });
}

// Create Contacts
export async function POST(NextRequest) {
    const authorization = await NextRequest.headers.get('authorization');
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

    const reqbody = await NextRequest.json();

    const { type, address, others } = reqbody;

    // Validate presence of 'type'
    if (!type) {
        return NextResponse.json({
            message: "Type is required."
        });
    }

    // Address validation
    if (type === 'address' && !address) {
        return NextResponse.json({
            message: "Address details are required when type is 'address'."
        });
    }

    if (type === 'address') {
        const { addressType, addressLine1, addressLine2, city, state, postalCode, country } = address[0];

        if (!addressLine1 || !addressType || !city || !state || !country || !postalCode) {
            return NextResponse.json({
                message: "Please Enter All Required Address Fields."
            });
        }

        // Save Address contact
        const data = await Contacts.create({
            userId: payload._id,
            type,
            address: [{
                addressType,
                addressLine1,
                addressLine2,
                city,
                state,
                postalCode,
                country
            }]
        });

        return NextResponse.json({
            message: "Address Contact Created Successfully",
            data
        }, { status: 200 });
    }

    // Others validation
    if (type === 'others' && !others) {
        return NextResponse.json({
            message: "Other contact details are required when type is 'others'."
        });
    }

    if (type === 'others') {
        const { contactType, channelType, value, primaryChannel } = others[0];

        if (!contactType || !channelType || !value) {
            return NextResponse.json({
                message: "Please Enter All Required Other Fields."
            });
        }

        // Save Other contact
        const data = await Contacts.create({
            userId: payload._id,
            type,
            others: [{
                contactType,
                channelType,
                value,
                primaryChannel: primaryChannel || false
            }]
        });

        return NextResponse.json({
            message: "Other Contact Created Successfully",
            data
        }, { status: 200 });
    }

    // Default response if neither address nor others are specified
    return NextResponse.json({
        message: "Invalid contact type provided."
    }, { status: 400 });
}
