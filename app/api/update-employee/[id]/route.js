// This a dynamic route. When you define a dynamic route, the params object allows you to access the values of these parameters.

//In this structure, [id] is a dynamic route parameter. When you make a PUT request to /api/update-employee/123, params will contain { id: '123' }.
import { NextResponse } from "next/server";
import { getCollectionAndObjectId } from "@/app/lib/mongoHelperFunctions/getCollectionAndObjectId";
export async function PUT(request, { params }) {
  // Extract the dynamic parameter from the URL
  const { id } = params;

  //check for id parameter
  if (!id) {
    return NextResponse.json(
      { message: "Employee ID is required" },
      { status: 400 }
    );
  }

  const { newEmail: email } = await request.json();
  console.log("email: ", email);

  try {
    const { collection, objectId } = await getCollectionAndObjectId(
      "employees",
      id
    );

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
          headers: { "Content-Type": "application/json" },
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
