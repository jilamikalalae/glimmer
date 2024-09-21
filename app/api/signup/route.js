import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/db.js';
import User from '@/models/user';
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const {name, username, email, password} = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({name, username, email, password:hashedPassword});

    return NextResponse.json({message: "User registered."}, {status: 201});
  } catch (error) {
    return NextResponse.json(
        { message: "An error occurred while registering the user."},
        {status: 500}
    );
  }
}