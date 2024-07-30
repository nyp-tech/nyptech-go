// src/app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching events' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return notFound();
  }
  
  try {
    const body = await req.json();
    const { title, description, signup, location, club, img, date } = body;
    const event = await prisma.event.create({
      data: {
        title,
        description,
        signup,
        location,
        club,
        img,
        date: new Date(date),
        userId,
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating event' }, { status: 500 });
  }
}
