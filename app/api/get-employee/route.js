import { connectToMongoDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request) {
  //retrieve id from url params
  const id = request.nextUrl.searchParams.get("id");
  console.log("id: ", id);
  console.log("id type: ", typeof id);

  //check for id parameter
  if (!id) {
    return NextResponse.json(
      { message: "Employee ID is required" },
      { status: 400 }
    );
  }

  //validate id using mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid employee ID" },
      { status: 400 }
    );
  }

  // connect to mongodb and find empployee,
  // if employee not found, return error

  try {
    // Ensure the database connection is established
    const client = await connectToMongoDB();
    const db = client.db(); // Use the default database specified in the connection string
    const collection = db.collection("employees"); // Specify the collection 'employees'. This will be used to insert the new employee document. The collection will be created if it doesn't already exist

    // Check db connection name
    // console.log("Connected to database name:", db.databaseName);

    // Check collection name
    // console.log("Using collection:", collection.collectionName);

    // Convert the employeeId string to an ObjectId using Mongoose
    const objectId = new mongoose.Types.ObjectId(id);

    // Find one employee by object id
    const result = await collection.findOne({ _id: objectId });
    console.log("employee found in get employee route: ", result);

    // if no result, return error
    if (!result) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { result },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occured" }, { status: 500 });
  }
}
