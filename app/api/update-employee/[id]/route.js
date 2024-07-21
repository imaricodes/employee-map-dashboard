// This a dynamic route. When you define a dynamic route, the params object allows you to access the values of these parameters.

//In this structure, [id] is a dynamic route parameter. When you make a PUT request to /api/update-employee/123, params will contain { id: '123' }.
import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/lib/db";
import mongoose from "mongoose";
import Employee from "@/models/employee";
export async function PUT(request, { params }) {
  // Extract the dynamic parameter from the URL
  const { id } = params;
  console.log("id: ", id);
  const { newEmail: email } = await request.json();
  console.log("email: ", email);

  try {
    const client = await connectToMongoDB();
    const db = client.db(); // Use the default database specified in the connection string
    const collection = db.collection("employees"); // Specify the collection 'employees'. This will be used to update the employee document. The collection will be created if it doesn't already exist

    //check db connection name
    console.log("Connected to database name:", db.databaseName);

    //check collection name
    console.log("Using collection:", collection.collectionName);


    // Convert the employeeId string to an ObjectId using Mongoose
    const objectId = new mongoose.Types.ObjectId(id);

    // Find one employee by object id
    const result = await collection.findOne({ _id: objectId });
    console.log("employee: ", result);

      // if no result, return error
      if (!result) {
        return NextResponse.json(
          { message: "Employee not found" },
          { status: 404 }
        );
      }

       // if result, update result
    if (result) {
        const updateResult = await collection.updateOne(
            { _id: objectId },
            { $set: { email: email } }
          );
          console.log("updateResult: ", updateResult);

          if (updateResult.matchedCount === 0) {
            return new Response(JSON.stringify({ error: "Employee not found" }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            });
        }

    return NextResponse.json(
      { message: "Employee updated successfully" },
      { status: 200 }
    );
}
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
