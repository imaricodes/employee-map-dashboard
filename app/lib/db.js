import {MongoClient, ServerApiVersion} from 'mongodb';

/**
 * Having a connection function here allows the connection to be made once instead
 * of every time the db needs to be accessed
 */


let clientPromise;

// Function to connect to MongoDB
export async function connectToMongoDB() {
    console.log('Connecting to MongoDB...');
    if (!clientPromise) {
      clientPromise = MongoClient.connect(process.env.MONGO_URL, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      }).then(client => {
        console.log('MongoDB connected successfully');
        return client;
      }).catch(err => {
        console.error('Failed to connect with MongoDB');
        console.error(err);
        // throw err;
      });
    }

    return clientPromise;
  }



