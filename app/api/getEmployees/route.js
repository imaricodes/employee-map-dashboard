import { connectToMongoDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    //get mongodb connection
    const client = await connectToMongoDB();

    const collection = client
      .db(process.env.MONGO_DATABASE)
      .collection("employees");

    const cursor = collection.find({});
    try {
      const result = await cursor.toArray();
            console.log('result length', result.length)

      if (result.length === 0) {
        console.log("No result");

      } else if (result.length > 0) {
        console.log(result);
        return new NextResponse(JSON.stringify({ data: result }), { status: 200, headers: { "Content-Type": "application/json" } });
      } else {
          console.log("Employees not available");

      }
    } catch (error) {
        console.log('error in query try block', error)
    }
  } catch (error) {
    console.error("Error accessing mongodb", error);
  }
}
