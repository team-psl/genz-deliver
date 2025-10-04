import { NextRequest } from "next/server";
import { createCity, getCities } from "@/services/cities/cities.handler";

export async function POST(request: NextRequest) {
  return createCity(request);
}

export async function GET() {
  return getCities();
}
