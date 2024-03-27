import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
// @ts-ignore
import clientPromise from '../../../lib/mongodb';


async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Connect to the database
    // @ts-ignore
    const client = await clientPromise;
    const db = client.db();

    // Check if the user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store the new user
    await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // Redirect the user to the dashboard
    res.status(201).json({ message: 'User created successfully', redirectTo: '/game' });
    } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
    }
  }

export default handler;
