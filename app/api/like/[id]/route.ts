import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "@/helper/auth";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
    try {
        const decoded = await authenticateToken(request);

        //@ts-ignore
        if (decoded.error) return NextResponse.json(decoded, { status: 401 });

        const url = new URL(request.url);
        const id = parseInt(url.pathname.split("/").pop() || "", 10);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: "Invalid testimonial ID" },
                { status: 400 },
            );
        }

        const testimonial = await prisma.testimonial.findUnique({
            where: { id },
        });

        if (!testimonial) {
            return NextResponse.json(
                { error: "Testimonial not found" },
                { status: 404 },
            );
        }

        const updatedTestimonial = await prisma.testimonial.update({
            where: { id },
            data: { liked: !testimonial.liked },
        });

        return NextResponse.json(
            {
                message: "Testimonial liked status toggled successfully",
                updatedTestimonial,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to toggle testimonial liked status" },
            { status: 500 },
        );
    }
}
