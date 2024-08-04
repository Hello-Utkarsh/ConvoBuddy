import prisma from "@/app/db/db";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
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
  const isUserPitch = await prisma.pitch.findFirst({
    where: {
      createdId: userId
    }
  })
  if (isUserPitch) {
    return NextResponse.json({error: "You are the creator of the pitch"})
  }
  const exist = await prisma.user.findFirst({
    where: {
      userid: userId,
      registeredId: body.pitchId
    },
  })
  if (exist) {
    return NextResponse.json({message: 'Already Enrolled'})
  }
  const registered_pitch = await prisma.user.create({
    data: {
      userid: userId,
      registeredId: body.pitchId,
    },
    include: {
      registered: true
    }
  });
  if (!registered_pitch) {
    return NextResponse.json({ message: "no pitches" });
  }
  return NextResponse.json({ message: "success", registered_pitch });
}

export async function DELETE(){
  const { userId }: any = auth();
  if (!userId) {
    return NextResponse.json({message: "Unauthorized"}, {status: 400})
  }
  const delete_pitch = await prisma.user.delete({
    where: {
      userid: userId
    }
  })
  if (!delete_pitch) {
    return NextResponse.json({message: 'please try again'})
  }
  return NextResponse.json({message: 'success', delete_pitch})
}
