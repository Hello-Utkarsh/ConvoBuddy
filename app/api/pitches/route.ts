import prisma from "@/app/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const pitches = await prisma.pitch.findMany();
  if ((pitches.length = 0)) {
    return NextResponse.json({ message: "not found" });
  }
  return pitches;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const dateTime = new Date(`${body.date}T${body.time}`);

  const request  = await prisma.pitch.create({
      data:{
          title: body.title,
          description: body.description,
          startDate: dateTime
      }
  })

  if (!request) {
    return NextResponse.json({message: "There was some problem, please try again"})
  }

  return NextResponse.json({message: "success"});
}

export async function DELETE(req: NextRequest){
    const body = await req.json()
    const request = await prisma.pitch.delete({
        where: {
            id: body.id
        }
    })
}
