import { z } from "zod";

// Validation schemas
export const createZoneSchema = z.object({
  name: z.string().min(1).max(100),
  cityId: z.number().int().positive(),
  latitude: z.string().max(20).optional(),
  longitude: z.string().max(20).optional(),
  isActive: z.number().min(0).max(1).optional().default(1),
});

// Type definitions
export type CreateZoneRequest = z.infer<typeof createZoneSchema>;

export type Zone = {
  id: number;
  name: string;
  cityId: number;
  latitude: string | null;
  longitude: string | null;
  isActive: number;
  deletedAt: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type CreateZoneResponse = {
  success: boolean;
  message: string;
  data: Zone;
};

export type GetZonesResponse = {
  success: boolean;
  data: Zone[];
};

export type ErrorResponse = {
  success: false;
  message: string;
  errors?: any[];
};
