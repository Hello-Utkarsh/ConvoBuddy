import prisma from "@/app/db/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId }: any = auth();
  const registered_pitch = await prisma.user.findMany({
    where: {
      userid: userId,
    },
    include: {
      registered: true,
    },
  });
  return NextResponse.json({ message: "success", registered_pitch });
}

export async function POST(req: NextRequest) {
  const { userId }: any = auth();
  const body = await req.json();
  const exist = await prisma.user.findFirst({
    where: {
      userid: userId,
      registeredId: body.pitchId
    }
  })
  if (exist) {
    return NextResponse.json({message: 'Already Enrolled'})
  }
  const registered_pitch = await prisma.user.create({
    data: {
      userid: body.userId,
      registeredId: body.pitchId,
    },
  });
  if (!registered_pitch) {
    return NextResponse.json({ message: "no pitches" });
  }
  return NextResponse.json({ message: "success" });
}

export async function DELETE(req: NextRequest){
  const body = await req.json()
  const { userId }: any = auth();
  const delete_pitch = await prisma.user.delete({
    where: {
      id: body.id,
      userid: userId
    }
  })
  if (!delete_pitch) {
    return NextResponse.json({message: 'please try again'})
  }
  return NextResponse.json({message: 'success'})
}
