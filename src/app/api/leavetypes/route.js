import connectToMongoDB from "@/dbConfig/dbConnnect";
import { LeaveTypes } from "@/models/Leave-Types";
import jwt from "jsonwebtoken";
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
    const response = await LeaveTypes.find();
    return NextResponse.json(
      {
        message: "Leave Types are fetched successfully...",
        response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error while fetching leave types",
      },
      { status: 400 }
    );
  }
}

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
  }
  const reqbody = await NextRequest.json();

  const { status, name, count } = reqbody;

  if (!name) {
    return NextResponse.json({
      message: "Name is required",
    });
  }

  if (!count) {
    return NextResponse.json({
      message: "Count is required",
    });
  }

  const data = await LeaveTypes.create({
    status,
    name,
    count,
  });

  return NextResponse.json(
    {
      message: "Type is Created Successfully",
      data,
    },
    { status: 200 }
  );
}
