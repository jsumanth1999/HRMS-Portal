import connectToMongoDB from "@/dbConfig/dbConnnect";
import { LeaveTypes } from "@/models/Leave-Types";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectToMongoDB();

export async function GET(NextRequest, { params }) {
  const authorization = NextRequest.headers.get("authorization");
  console.log("Authorization Header:", authorization);

  if (!authorization) {
    return NextResponse.json(
      { message: "Authorization token is missing." },
      { status: 401 }
    );
  }

  const token = authorization;
  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded Payload:", payload);
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return NextResponse.json(
      { message: "Token is invalid or expired." },
      { status: 401 }
    );
  }

  const { Id } = params;
  if (!Id) {
    return NextResponse.json(
      { message: "ID is missing in the request parameters." },
      { status: 400 }
    );
  }

  try {
    const leaveType = await LeaveTypes.findById(Id);

    if (!leaveType) {
      return NextResponse.json(
        { message: "Leave type not found with the given ID." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Leave type fetched successfully.",
        leaveType,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database Query Error:", error.message);
    return NextResponse.json(
      { message: "An error occurred while fetching leave type data." },
      { status: 500 }
    );
  }
}

export async function PATCH(NextRequest, { params }) {
  const authorization = NextRequest.headers.get("authorization");
  console.log("Authorization Header:", authorization);

  if (!authorization) {
    return NextResponse.json(
      { message: "Authorization token is missing." },
      { status: 401 }
    );
  }

  const token = authorization;
  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded Payload:", payload);
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return NextResponse.json(
      { message: "Token is invalid or expired." },
      { status: 401 }
    );
  }

  const { Id } = params;
  const reqbody = await NextRequest.json();
  const { status, name, count } = reqbody;
  if (!Id) {
    return NextResponse.json({
      message: "ID is not exists",
    });
  }
  try {
    const response = await LeaveTypes.findByIdAndUpdate(
      Id,
      {
        status,
        name,
        count,
      },
      { new: true }
    );
    return NextResponse.json(
      {
        message: "Type is updated successfully....",
        response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Error while updating the type..",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(NextRequest, { params }) {

  const authorization = NextRequest.headers.get("authorization");
  console.log("Authorization Header:", authorization);

  if (!authorization) {
    return NextResponse.json(
      { message: "Authorization token is missing." },
      { status: 401 }
    );
  }

  const token = authorization;
  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded Payload:", payload);
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return NextResponse.json(
      { message: "Token is invalid or expired." },
      { status: 401 }
    );
  }

  const { Id } = params;
  try {
    const response = await LeaveTypes.findByIdAndDelete(Id);

    return NextResponse.json(
      {
        message: "Type is deleted successfully...",
        response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Error while deleteing the type.",
      },
      { status: 500 }
    );
  }
}
