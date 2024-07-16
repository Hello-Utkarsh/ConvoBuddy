import prisma from "@/app/db/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId }: any = auth();
    const req = await prisma.notes.findMany({
        where: {
            createdBy: userId
        }
    })
    if (!req) {
        return NextResponse.json({message: "No Saved Words"})
    }
    return NextResponse.json({message: 'succes', req})
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: error.status})
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: any = await req.json();
    const exist: any = await prisma.notes.findFirst({
      where: {
        word: body.word,
      },
    });
    if (exist) {
      return NextResponse.json({ message: "already exists" }, { status: 400 });
    }
    const { userId }: any = auth();
    const note = await prisma.notes.create({
      data: {
        word: body.word,
        definition: body.definition,
        sentence: body.sentence,
        date: body.date,
        partofspeech: body.partofspeech,
        createdBy: userId,
      },
    });
    return NextResponse.json({ message: "success", note });
  } catch (error) {
    return error;
  }
}
