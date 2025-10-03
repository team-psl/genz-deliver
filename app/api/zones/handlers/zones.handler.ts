import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { zones } from "@/db/schemas/zones.schema";
import { createZoneSchema, type CreateZoneResponse, type GetZonesResponse, type ErrorResponse } from "../types/zones.types";

export async function createZone(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = createZoneSchema.parse(body);
    
    // Insert the zone into the database
    const [newZone] = await db
      .insert(zones)
      .values({
        name: validatedData.name,
        cityId: validatedData.cityId,
        latitude: validatedData.latitude || null,
        longitude: validatedData.longitude || null,
        isActive: validatedData.isActive,
      })
      .returning();
    
    const response: CreateZoneResponse = {
      success: true,
      message: "Zone created successfully",
      data: newZone,
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating zone:", error);
    
    if (error instanceof z.ZodError) {
      const errorResponse: ErrorResponse = {
        success: false,
        message: "Validation error",
        errors: error.errors,
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }
    
    const errorResponse: ErrorResponse = {
      success: false,
      message: "Internal server error",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function getZones(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cityId = searchParams.get('city_id');
    
    // Filter by city_id if provided
    const zonesData = cityId 
      ? await db.select().from(zones).where(eq(zones.cityId, parseInt(cityId)))
      : await db.select().from(zones);
    
    const response: GetZonesResponse = {
      success: true,
      data: zonesData,
    };
    
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching zones:", error);
    
    const errorResponse: ErrorResponse = {
      success: false,
      message: "Internal server error",
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
