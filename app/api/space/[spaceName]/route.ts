import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "@/helper/auth";

const prisma = new PrismaClient();

export async function GET(
    request: NextRequest,
    { params }: { params: { spaceName: string } },
) {
    try {
        const spaceName = params.spaceName; 

        if (!spaceName) {
            return NextResponse.json(
                { error: "Space name is required" },
                { status: 400 },
            );
        }

        const decoded = await authenticateToken(request);

        //@ts-ignore
        if (decoded.error) {
            return NextResponse.json(decoded, { status: 401 });
        }

        const space = await prisma.space.findFirst({
            where: {
                name: spaceName,
                //@ts-ignore
                userId: decoded.userId,
            },
        });

        if (!space) {
            return NextResponse.json({ error: "Space not found" }, { status: 404 });
        }

        return NextResponse.json({ space }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to retrieve space" },
            { status: 500 },
        );
    }
}
