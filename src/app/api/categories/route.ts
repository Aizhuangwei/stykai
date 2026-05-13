
import { NextResponse } from "next/server";
import data from "@/data/categories.json";
export async function GET() { return NextResponse.json(data); }
