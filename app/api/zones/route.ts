import { NextRequest, NextResponse } from "next/server";
import { createZone, getZones } from "./handlers/zones.handler";

export async function POST(request: NextRequest) {
  return createZone(request);
}

export async function GET(request: NextRequest) {
  return getZones(request);
}

// Handle trailing slash redirects
export async function HEAD(request: NextRequest) {
  return NextResponse.redirect(new URL(request.url.replace(/\/$/, '')), 301);
}
