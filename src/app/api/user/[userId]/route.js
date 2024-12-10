import connectToMongoDB from "@/dbConfig/dbConnnect";
import { User } from "@/models/users";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

connectToMongoDB();

export async function GET(req, { params }) {
  const authorization = req.headers.get("authorization");
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
  const { userId } = params;
  if (!userId) {
    return NextResponse.json(
      {
        message: "User ID is required.",
      },
      { status: 400 }
    );
  }

  let data;
  try {
    data = await User.findById(userId);
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  if (!data) {
    return NextResponse.json(
      {
        message: "User ID not exists",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: "User listed successfully...",
      data,
    },
    { status: 200 }
  );
}

// PUT Method: Update User by userId
export async function PUT(req, { params }) {
  const authorization = req.headers.get("authorization");
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

  const { userId } = params;
  if (!userId) {
    return NextResponse.json(
      {
        message: "User ID is required.",
      },
      { status: 400 }
    );
  }

  const bodyData = await req.json();
  const {
    saluation,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    email,
    password,
    role,
    employeeId,
    employeeType,
    category,
    status,
    designation,
    division,
    taxProcessor,
    dateOfJoining,
    dateOfConfirmation,
    pfJoinDate,
  } = bodyData;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        saluation,
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        email,
        password,
        role,
        employeeId,
        employeeType,
        category,
        status,
        designation,
        division,
        taxProcessor,
        dateOfJoining,
        dateOfConfirmation,
        pfJoinDate,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "User updated successfully...",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while updating data using id",
      },
      { status: 400 }
    );
  }
}

//PATCH Method
export async function PATCH(req, { params }) {
  const authorization = req.headers.get("authorization");
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

  const { userId } = params;
  if (!userId) {
    return NextResponse.json(
      {
        message: "User ID is required.",
      },
      { status: 400 }
    );
  }

  const bodyData = await req.json();
  const {
    saluation,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    email,
    password,
    role,
    employeeId,
    employeeType,
    category,
    status,
    designation,
    division,
    taxProcessor,
    dateOfJoining,
    dateOfConfirmation,
    pfJoinDate,
  } = bodyData;

  try {
    const updatedData = await User.findByIdAndUpdate(
      userId,
      {
        saluation,
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        email,
        password,
        role,
        employeeId,
        employeeType,
        category,
        status,
        designation,
        division,
        taxProcessor,
        dateOfJoining,
        dateOfConfirmation,
        pfJoinDate,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "User updated successfully...",
        updatedData,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while updating data using id",
      },
      { status: 400 }
    );
  }
}

// DELETE Method: Delete User by userId
export async function DELETE(req, { params }) {
  const authorization = req.headers.get("authorization");
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

  const { userId } = params;

  if (!userId) {
    return NextResponse.json(
      {
        message: "User ID is required.",
      },
      { status: 400 }
    );
  }

  try {
    const data = await User.findByIdAndDelete(userId);
    return NextResponse.json({
      message: "User is deleted Successfully...",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while deleting the data",
      },
      { status: 500 }
    );
  }
}
