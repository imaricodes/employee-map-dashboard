import { connectToMongoDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getCollectionAndObjectId } from "@/app/lib/mongoHelperFunctions/getCollectionAndObjectId";


export async function DELETE(request) {
  //retrieve id from url params
  const id = request.nextUrl.searchParams.get("id");

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

  try {
    const { collection, objectId } = await getCollectionAndObjectId("employees", id);

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

    // if result, delete result
    if (result) {
      const deletedEmployee = await collection.deleteOne({ _id: objectId });
      console.log("deletedEmployee: ", deletedEmployee);
    }

    return NextResponse.json(
      { message: "Connected correctly, collection found, employee deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occured" }, { status: 500 });
  }
}
