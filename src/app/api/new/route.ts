import { NextResponse } from "next/server";
import tools from "@/data/tools.json";

export async function GET() {
  const newTools = (tools as any[]).filter((t: any) => t.new === true);
  return NextResponse.json(newTools);
}