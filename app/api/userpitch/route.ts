import prisma from "@/app/db/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    const registered_pitch = await prisma.user.findMany({
        where: {
            userid: "user_2iDsu2Qf3YWISjG8LQc1DkLSYKR"
        },
        include: {
            registered: true
        }
    })
    return NextResponse.json({message: 'success', registered_pitch})
}

export async function POST(req:NextRequest) {
    const body = await req.json()
    const registered_pitch = await prisma.user.create({
        data: {
            userid: body.id,
            registeredId: body.pitch_id
        }
    })
    if (!registered_pitch) {
        return NextResponse.json({message: "no pitches"})
    }
    return NextResponse.json({message: 'success'})
}