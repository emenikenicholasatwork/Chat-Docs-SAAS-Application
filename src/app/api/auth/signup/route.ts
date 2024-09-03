import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import bcryptjs from 'bcryptjs'



export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { username, email, password } = requestBody;
        const existingUser = await db.user.findFirst({
            where: {
                email: email
            }
        })
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}