import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "@/helper/auth";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
    try {
        const decoded = await authenticateToken(request);
        //@ts-ignore
        if (decoded.error) return decoded;

        const { id, name, header, message } = await request.json();

        if (!id || !name || !header || !message) {
            return NextResponse.json(
                { error: "information missing" },
                { status: 400 },
            );
        }

        const space = await prisma.space.update({
            where: {
                id,
                //@ts-ignore
                userId: decoded.userId,
            },
            data: {
                name,
                header: header || null,
                message: message || null,
                isCreated: true,
            },
        });

        return NextResponse.json(
            { message: "Space updated successfully", space },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to update space" },
            { status: 500 },
        );
    }
}
