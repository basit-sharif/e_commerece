import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({message:"no"})
    } catch (error) {
        return NextResponse.json({ error })
    }
}