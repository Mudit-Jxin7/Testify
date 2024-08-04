import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "@/helper/auth"; 

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const decoded = await authenticateToken(request);
        //@ts-ignore
        if (decoded.error) return decoded;

        const { name } = await request.json();

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        const space = await prisma.space.create({
            data: {
                name,
                //@ts-ignore
                userId: decoded.userId,
            },
        });

        return NextResponse.json(
            { message: "Space created successfully", space },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create space" },
            { status: 500 },
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const decoded = await authenticateToken(request);
        //@ts-ignore
        if (decoded.error) return decoded;

        const spaces = await prisma.space.findMany({
            //@ts-ignore
            where: { userId: decoded.userId },
        });

        return NextResponse.json({ spaces }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to retrieve spaces" },
            { status: 500 },
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const decoded = await authenticateToken(request);
        //@ts-ignore
        if (decoded.error) return decoded;

        const { id, name } = await request.json();

        if (!id || !name) {
            return NextResponse.json(
                { error: "ID and name are required" },
                { status: 400 },
            );
        }

        const space = await prisma.space.update({
            where: {
                id,
                //@ts-ignore
                userId: decoded.userId,
            },
            data: { name },
        });

        return NextResponse.json(
            { message: "Space updated successfully", space },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update space" },
            { status: 500 },
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const decoded = await authenticateToken(request);
        //@ts-ignore
        if (decoded.error) return decoded;

        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await prisma.space.delete({
            where: {
                id,
                //@ts-ignore
                userId: decoded.userId,
            },
        });

        return NextResponse.json(
            { message: "Space deleted successfully" },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete space" },
            { status: 500 },
        );
    }
}
