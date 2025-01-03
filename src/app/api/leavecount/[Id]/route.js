import { LeaveCount } from "@/models/Leave-Count";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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
    const leaveCount = await LeaveCount.findById(Id);
    if (!leaveCount) {
      return NextResponse.json(
        { message: "Leave count not found with the given ID." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Leave count fetched successfully.",
        leaveCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database Query Error:", error.message);
    return NextResponse.json(
      { message: "An error occurred while fetching leave count data." },
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

  if (!Id) {
    return NextResponse.json({
      message: "ID is not exits",
    });
  }

  try {
    const response = await LeaveCount.findByIdAndUpdate(
      Id,
      {
        typeId,
        opening,
        accured,
        applied,
        rejected,
        cancelled,
        encashed,
        lapsed,
        balance,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Count is updated successfully...",
        response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      {
        message: "Error while updating the leave count",
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

  const {Id} = params;

  if(!Id){
    return NextResponse.json({
        message: "ID is not exists",
    })
  }

  try {
    const response = await LeaveCount.findByIdAndDelete(Id);
    return NextResponse.json({
        message: "Leave count is deleted successfully...",
        response,
    })
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({
        message: "Error while deleting the id.",
    })
  }

}
