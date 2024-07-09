import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/app/lib/db';

export async function POST(request) {
  const body = await request.json();
  const { firstName, lastName } = body;
  console.log(firstName, lastName);

  try {
    const client = await connectToMongoDB();
    const db = client.db(); // Use the default database specified in the connection string
    const collection = db.collection('employees'); // Specify the collection 'employees'

    //check db connection name
    console.log('Connected to database:', db.databaseName);

    //check collection name
    console.log('Using collection:', collection.collectionName);

    // Insert the new document into the collection
    const result = await collection.insertOne({
      firstName,
      lastName
    });

    // console.log('insert one result', result);

    return new NextResponse(
      JSON.stringify({ message: "Employee Created", result }),
      { status: 201 }
    );

  } catch (error) {
    console.log('Error in POST route', error);
    return new NextResponse(
      JSON.stringify({ message: 'Error creating employee' }),
      { status: 500 }
    );
  }
}
