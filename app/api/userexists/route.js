import { NextResponse } from 'next/server';
import User from '../../../models/user';
import connectDB from '@/lib/db'; 

connectDB();

export async function POST(req) {
    try {
        const { email } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });

    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}