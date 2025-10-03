import { NextRequest } from "next/server";
import { createZone, getZones } from "./handlers/zones.handler";

export async function POST(request: NextRequest) {
  return createZone(request);
}

export async function GET() {
  return getZones();
}
