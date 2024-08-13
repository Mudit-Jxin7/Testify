import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "@/helper/auth";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const decoded = await authenticateToken(request);
    //@ts-ignore
    if (decoded.error) return NextResponse.json(decoded, { status: 401 });

    let parsedBody;
    try {
      parsedBody = await request.json();
    } catch (error) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { photo, email, customerName, testimonial, stars, spaceId } =
      parsedBody;

    if (
      !photo ||
      !email ||
      !customerName ||
      !testimonial ||
      stars === undefined ||
      !spaceId
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Check if the space exists
    const space = await prisma.space.findUnique({ where: { id: spaceId } });
    if (!space) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    const testimonialCreated = await prisma.testimonial.create({
      //@ts-ignore
      data: {
        photo,
        email,
        customerName,
        testimonial,
        stars,
        spaceId,
        liked: false,
      },
    });

    return NextResponse.json(
      {
        message: "Testimonial created successfully",
        testimonial: testimonialCreated,
      },
      { status: 201 },
    );
  } catch (error) {
    //@ts-ignore
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
