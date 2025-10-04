import { z } from "zod";

// Validation schemas
export const createCitySchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().max(100).optional(),
  isActive: z.number().min(0).max(1).optional().default(1),
});

// Type definitions
export type CreateCityRequest = z.infer<typeof createCitySchema>;

export type City = {
  id: number;
  name: string;
  slug: string | null;
  isActive: number;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCityResponse = {
  success: boolean;
  message: string;
  data: City;
};

export type GetCitiesResponse = {
  success: boolean;
  data: City[];
};

export type ErrorResponse = {
  success: false;
  message: string;
  errors?: any[];
};
