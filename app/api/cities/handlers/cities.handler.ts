import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { cities } from "@/db/schemas/cities.schema";
import { createCitySchema, type CreateCityResponse, type GetCitiesResponse, type ErrorResponse } from "../types/cities.types";

export async function createCity(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = createCitySchema.parse(body);
    
    // Insert the city into the database
    const [newCity] = await db
      .insert(cities)
      .values({
        name: validatedData.name,
        slug: validatedData.slug || null,
        isActive: validatedData.isActive,
      })
      .returning();
    
    const response: CreateCityResponse = {
      success: true,
      message: "City created successfully",
      data: newCity,
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating city:", error);
    
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

export async function getCities() {
  try {
    const allCities = await db.select().from(cities);
    
    const response: GetCitiesResponse = {
      success: true,
      data: allCities,
    };
    
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching cities:", error);
    
    const errorResponse: ErrorResponse = {
      success: false,
      message: "Internal server error",
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
