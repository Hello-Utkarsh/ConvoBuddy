import prisma from "@/app/db/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId }: any = auth();
    const user = await prisma.prefrence.update({
      where: {
        userid: userId,
      },
      data: {
        name: body.name,
        age: parseInt(body.age),
        interests: body.interests,
        languages: body.language,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "Not Found" });
    }
    return NextResponse.json({message: "success"})
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: error.status})
  }
}
