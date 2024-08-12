import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const { pathname } = new URL(request.url);
        const urlParts = pathname.split("/");
        const spaceId = parseInt(urlParts[urlParts.length - 1], 10);

        if (isNaN(spaceId)) {
            return NextResponse.json({ error: "Invalid Space ID" }, { status: 400 });
        }

        const space = await prisma.space.findUnique({ where: { id: spaceId } });
        if (!space) {
            return NextResponse.json({ error: "Space not found" }, { status: 404 });
        }

        const testimonials = await prisma.testimonial.findMany({
            where: { spaceId: spaceId },
        });

        return NextResponse.json({ testimonials }, { status: 200 });
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching testimonials" },
            { status: 500 },
        );
    }
}
