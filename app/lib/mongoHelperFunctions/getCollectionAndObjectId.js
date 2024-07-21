import mongoose from "mongoose";
import { connectToMongoDB } from "@/app/lib/db";
/**
 * Retrieves a collection and converts the provided id to an ObjectId.
 * @param {string} collectionName - The name of the collection to retrieve.
 * @param {string} id - The id to convert to an ObjectId.
 * @returns {Object} - An object containing the collection and the converted ObjectId.
 */
export async function getCollectionAndObjectId(collectionName, id) {
    const client = await connectToMongoDB();
    const db = client.db(); // Use the default database specified in the connection string
    const collection = db.collection(collectionName); // Use the specified collection

     //check db connection name
     console.log("Connected to database name:", db.databaseName);

     //check collection name
     console.log("Using collection:", collection.collectionName);

    // Convert the id string to an ObjectId
    // Convert the employeeId string to an ObjectId using Mongoose
    const objectId = new mongoose.Types.ObjectId(id);

    // Check db connection name
    console.log("Connected to database name:", db.databaseName);

    // Check collection name
    console.log("Using collection:", collection.collectionName);

    return { collection, objectId };
}
