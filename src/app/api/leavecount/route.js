import jwt from "jsonwebtoken";
import connectToMongoDB from "@/dbConfig/dbConnnect";
import { LeaveCount } from "@/models/Leave-Count";
import { NextResponse } from "next/server";

connectToMongoDB();

export async function GET(NextRequest) {
  const authorization = await NextRequest.headers.get("authorization");
  console.log("authorization", authorization);

  if (!authorization) {
    return NextResponse.json({
      message: "Token is Missing",
    });
  }

  const token = authorization;
  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log(payload);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Token is Invalid or Expired.",
      },
      { status: 401 }
    );
  }

  try {
    const response = await LeaveCount.find();
    return NextResponse.json(
      {
        message: "Leaves Count listed successfully...",
        response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Error while fetching count",
      },
      { status: 500 }
    );
  }
};

export async function POST(NextRequest) {
  
  const authorization = await NextRequest.headers.get("authorization");
  console.log("authorization", authorization);

  if (!authorization) {
    return NextResponse.json({
      message: "Token is Missing",
    });
  }

  const token = authorization;
  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log(payload);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Token is Invalid or Expired.",
      },
      { status: 401 }
    );
  };

  const reqbody = await NextRequest.json();
  const {
    typeId,
    opening,
    accured,
    applied,
    rejected,
    cancelled,
    encashed,
    lapsed,
    balance,
  } = reqbody;

  try {
    const response = await LeaveCount.create({
        typeId,
        userId : payload._id,
        opening,
        accured,
        applied,
        rejected,
        cancelled,
        encashed,
        lapsed,
        balance,
    });
    return NextResponse.json({
        message: "Leave count is created successfully...",
        response,
    })
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
        message: "Error while creating leave count..",
    },{status: 500})
  }

}
