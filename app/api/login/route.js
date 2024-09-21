// /app/api/login/route.js

import { connectToDatabase } from '../../../lib/db';
import bcrypt from 'bcrypt';

export async function POST(req, res) {
  const { email, password } = await req.json();

  const db = await connectToDatabase();
  const collection = db.collection('users');

  const user = await collection.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    // Set up session or JWT here
    res.status(200).json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}