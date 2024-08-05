import prisma from "@/app/db/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId }: any = auth();
    const pref = await prisma.prefrence.findFirst({
      where: {
        userid: userId
      }
    })
    if (!pref) {
      return NextResponse.json({message: 'not found'})
    }
    return NextResponse.json({message: "success", pref})
  } catch (error: any) {
    return NextResponse.json({messsage: error.message}, {status: error.status})
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId }: any = auth();
    const user = await prisma.prefrence.upsert({
      where: {
        userid: userId,
      },
      update: {
        name: body.name,
        age: parseInt(body.age),
        interests: body.interests,
        languages: body.language,
      },
      create: {
        userid: userId,
        name: body.name,
        age: parseInt(body.age),
        interests: body.interests,
        languages: body.languages,
      }
    });
    if (!user) {
      return NextResponse.json({ message: "Not Found" });
    }
    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}
