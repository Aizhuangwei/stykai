
import { NextResponse } from "next/server";
import data from "@/data/news.json";
export async function GET() { return NextResponse.json(data); }
