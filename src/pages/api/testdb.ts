import type { NextApiRequest, NextApiResponse } from 'next';
import type { MongoClient } from 'mongodb';

// Define a type for the response to structure the data
type UsersResponse = {
  users: any[]; // Update the type of users array based on your user schema
} | {
  error: string;
};

const clientPromise: Promise<MongoClient> = import('../../../lib/mongodb').then((module) => module.default);


export default async function handler(
  _req: NextApiRequest, 
  res: NextApiResponse<UsersResponse>
) {
  try {
    // Await the connection to MongoDB
    const client: MongoClient = await clientPromise;
    const db = client.db(); // Assumes the db() method does not require any argument

    // Get the database name
    const dbName = db.databaseName;

    // Fetch all users from the 'users' collection
    const users = await db.collection('users').find().toArray();

    // Respond with the users and database name
    res.status(200).json({ users, dbName });
  } catch (e) {
    // Ensure error handling is informative but secure
    console.error("Failed to retrieve users:", e);
    res.status(500).json({ error: "Unable to connect to database or fetch users." });
  }
}
