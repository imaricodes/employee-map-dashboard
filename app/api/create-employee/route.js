import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/lib/db";
import Employee from "@/models/employee";

export async function POST(request) {
  // Get the request body
  const body = await request.json();

  // Log the incoming request body for debugging
  // console.log("Request body:", body);
  // const { firstName, lastName, email } = body;
  // console.log(firstName, lastName, email);

  try {
    // Ensure the database connection is established
    const client = await connectToMongoDB();
    const db = client.db(); // Use the default database specified in the connection string
    const collection = db.collection("employees"); // Specify the collection 'employees'. This will be used to insert the new employee document. The collection will be created if it doesn't already exist

    //check db connection name
    // console.log("Connected to database name:", db.databaseName);

    //check collection name
    // console.log("Using collection:", collection.collectionName);

    const newEmployee = new Employee(body);

    // Validate the new employee document before saving
    try {
      // Pass the request body to the Employeeconstructor

      await newEmployee.validate();

      // If the validation passed, log a success message
      console.log("Validation passed");

      // If validation passed, insert the new employee document
      const result = await collection.insertOne(newEmployee);

      // Log the result for debugging
      console.log("Employee created:", result);

      return new NextResponse(
        JSON.stringify({ message: "Employee Created", result }),
        { status: 201 }
      );
    } catch (validationError) {
      console.error(
        "Validation error:",
        validationError.errorResponse.keyValue
      );
      return new NextResponse(
        JSON.stringify({
          message: 'This email already exists.',
          error: validationError.message,
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in POST route", error);
    return new NextResponse(
      JSON.stringify({
        message: "Error creating employee",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
