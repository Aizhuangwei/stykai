
import { NextResponse } from "next/server";
import data from "@/data/topPicks.json";
export async function GET() { return NextResponse.json(data); }
