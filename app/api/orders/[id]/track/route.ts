import { type NextRequest, NextResponse } from "next/server"
import type { GetOrderResponse } from "@/lib/types"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<GetOrderResponse>> {
  try {
    const orderId = params.id

    console.log("[API Route] Tracking order:", orderId)

    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          error: "Order ID is required",
        },
        { status: 400 },
      )
    }

    // Mock tracking data - replace with real tracking service integration
    const trackingData = {
      id: orderId,
      recipientName: "John Doe",
      recipientPhone: "01712345678",
      recipientAddress: "House 123, Road 456, Dhanmondi, Dhaka",
      deliveryArea: "Dhanmondi",
      pickupAddress: "Office ABC, Gulshan 2, Dhaka",
      deliveryAddress: "House 123, Road 456, Dhanmondi, Dhaka",
      status: "in-transit" as const,
      amount: 150,
      deliveryType: "normal",
      totalWeight: "0-0.5",
      quantity: 1,
      itemDescription: "Documents and files",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: new Date().toISOString(),
      trackingHistory: [
        {
          status: "Order confirmed",
          timestamp: "2024-01-15T10:30:00Z",
          location: "Pathao Hub - Gulshan",
          description: "Order has been confirmed and is being processed",
        },
        {
          status: "Picked up",
          timestamp: "2024-01-15T11:15:00Z",
          location: "Office ABC, Gulshan 2",
          description: "Package has been picked up from sender",
        },
        {
          status: "In transit",
          timestamp: "2024-01-15T13:20:00Z",
          location: "Pathao Hub - Dhanmondi",
          description: "Package is on the way to delivery hub",
        },
      ],
    }

    console.log("[API Route] Tracking data:", trackingData)

    return NextResponse.json({
      success: true,
      data: trackingData,
      message: "Order tracking data fetched successfully",
    })
  } catch (error) {
    console.error("[API Route] Order tracking failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    )
  }
}
