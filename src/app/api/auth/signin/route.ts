import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'


export async function POST(request: NextRequest){
    const reqBody = await request.json();
    const { email, password } = reqBody();
    const user = await db.user.findFirst({
        where: {
            email: email
        }
    })
    if(!user){
        return NextResponse.json({error: "User does not exists."},{status: 400})
    }

    const validPassword = await bcryptjs.compare(password, user.);
}
