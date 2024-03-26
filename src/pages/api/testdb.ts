// src/pages/api/testdb.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import type { MongoClient } from 'mongodb';

// Define a type for the response to structure the data
type CollectionsResponse = {
  collections: string[];
} | {
  error: string;
};

const clientPromise: Promise<MongoClient> = import('../../../lib/mongodb').then((module) => module.default);


export default async function handler(
  _req: NextApiRequest, 
  res: NextApiResponse<CollectionsResponse>
) {
  try {
    // Await the connection to MongoDB
    const client: MongoClient = await clientPromise;
    const db = client.db(); // Assumes the db() method does not require any argument

    // Fetch list of collections and map to an array of their names
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((collection: any) => collection);

    // Respond with the collection names
    res.status(200).json({ collections: collectionNames });
  } catch (e) {
    // Ensure error handling is informative but secure
    console.error("Failed to retrieve collections:", e);
    res.status(500).json({ error: "Unable to connect to database or fetch collections." });
  }
}
