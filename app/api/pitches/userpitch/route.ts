import prisma from "@/app/db/db";
import { NextResponse } from "next/server";

export async function GET(){
    const user_pitch = await prisma.pitch.findMany({
        where: {
            createdId: "user_2iDsu2Qf3YWISjG8LQc1DkLSYKR"
        }
    })

    if (!user_pitch) {
        return NextResponse.json({message: "No Pitches Created"})
    }

    return NextResponse.json({message: 'success', user_pitch})
}