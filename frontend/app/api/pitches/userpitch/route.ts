import prisma from "@/app/db/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId }: any = auth();
  const user_pitch = await prisma.pitch.findMany({
    where: {
      createdId: userId,
    },
  });

  if (!user_pitch) {
    return NextResponse.json({ message: "No Pitches Created" });
  }

  return NextResponse.json({ message: "success", user_pitch });
}
