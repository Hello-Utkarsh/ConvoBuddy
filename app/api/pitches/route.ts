import prisma from "@/app/db/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(req: NextRequest) {
  const pitches = await prisma.pitch.findMany();
  if (pitches.length == 0) {
    return NextResponse.json({ message: "not found" });
  }
  return NextResponse.json({ message: "success", pitches });
}

export async function POST(req: NextRequest) {
  const { userId }: any = auth();
  const body = await req.json();
  const dateTime = new Date(`${body.date}T${body.time}`);

  const request = await prisma.pitch.create({
    data: {
      createdId: userId,
      title: body.title,
      description: body.description,
      startDate: dateTime,
    },
  });

  console.log(request)

  if (!request) {
    return NextResponse.json({
      message: "There was some problem, please try again",
    });
  }

  return NextResponse.json({ message: "success", request });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { userId }: any = auth();
  if (body.createdId != userId) {
    return NextResponse.json({message: "Invalid User"})
  }
  const request = await prisma.pitch.delete({
    where: {
      id: body.id,
    },
  });
  if (!request) {
    return NextResponse.json({message: "Please try again"})
  }
  return NextResponse.json({ message: "success" });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const dateTime = new Date(`${body.date}T${body.time}`);

  // const request = await prisma.pitch.update({
  //   where: {
  //     id: body.id,
  //   },
  //   data: {
  //     title: body.title,
  //     description: body.description,
  //     startDate: dateTime,
  //   },
  // });
  // if (request) {
  //   return NextResponse.json({message: "error"})
  // }
  return NextResponse.json({ message: "success" });
}
