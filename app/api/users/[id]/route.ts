import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    const { id } = params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        if (user) {
            return NextResponse.json(user);
        } else {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch user" },
            { status: 500 },
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    const { id } = params;
    try {
        const { name } = await request.json();
        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { name },
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 },
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    const { id } = params;
    try {
        await prisma.user.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ message: "User deleted" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete user" },
            { status: 500 },
        );
    }
}
