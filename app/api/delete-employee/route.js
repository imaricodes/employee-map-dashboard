import { connectToMongoDB } from "@/app/lib/db";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";

export async function DELETE (request) {
const id= request.nextUrl.searchParams.get('id')
await connectToMongoDB();
await Employee.findByIdAndDelete(id);
return NextResponse.json({message: 'employee deleted'}, {status: 200})
}