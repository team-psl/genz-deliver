import { type NextRequest, NextResponse } from "next/server"
import type { CreateOrderRequest, CreateOrderResponse, GetOrdersResponse, Order } from "@/lib/types"

// Mock database - replace with real database integration
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    recipientName: "John Doe",
    recipientPhone: "01712345678",
    recipientAddress: "House 123, Road 456, Dhanmondi, Dhaka",
    deliveryArea: "Dhanmondi",
    pickupAddress: "Office ABC, Gulshan 2, Dhaka",
    deliveryAddress: "House 123, Road 456, Dhanmondi, Dhaka",
    status: "delivered",
    amount: 150,
    deliveryType: "normal",
    totalWeight: "0-0.5",
    quantity: 1,
    itemDescription: "Documents and files",
    specialInstructions: "Handle with care",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T16:45:00Z",
    deliveredAt: "2024-01-15T16:45:00Z",
    trackingHistory: [
      { status: "Order confirmed", timestamp: "2024-01-15T10:30:00Z" },
      { status: "Picked up", timestamp: "2024-01-15T11:15:00Z" },
      { status: "In transit", timestamp: "2024-01-15T13:20:00Z" },
      { status: "Out for delivery", timestamp: "2024-01-15T15:30:00Z" },
      { status: "Delivered", timestamp: "2024-01-15T16:45:00Z" },
    ],
  },
]

export async function POST(request: NextRequest): Promise<NextResponse<CreateOrderResponse>> {
  try {
    const orderData: CreateOrderRequest = await request.json()

    console.log("[API Route] Received order creation request:", orderData)

    // Validate required fields
    const requiredFields = ["recipientName", "recipientPhone", "recipientAddress", "deliveryArea", "itemDescription"]
    const missingFields = requiredFields.filter((field) => !orderData[field as keyof CreateOrderRequest])

    if (missingFields.length > 0) {
      console.log("[API Route] Missing required fields:", missingFields)
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      )
    }

    // Generate new order ID
    const orderId = `ORD-${Date.now().toString().slice(-6)}`

    // Create new order object
    const newOrder: Order = {
      id: orderId,
      recipientName: orderData.recipientName,
      recipientPhone: orderData.recipientPhone,
      recipientSecondaryPhone: orderData.recipientSecondaryPhone,
      recipientAddress: orderData.recipientAddress,
      deliveryArea: orderData.deliveryArea,
      pickupAddress: orderData.pickupAddress || "Default Pickup Location",
      deliveryAddress: orderData.recipientAddress,
      status: "pending",
      amount: Number.parseFloat(orderData.amountToCollect) || 0,
      deliveryType: orderData.deliveryType,
      totalWeight: orderData.totalWeight,
      quantity: orderData.quantity,
      itemDescription: orderData.itemDescription,
      specialInstructions: orderData.specialInstructions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      trackingHistory: [
        {
          status: "Order confirmed",
          timestamp: new Date().toISOString(),
          description: "Order has been confirmed and is being processed",
        },
      ],
    }

    // Add to mock database
    mockOrders.push(newOrder)

    console.log("[API Route] Order created successfully:", newOrder)

    return NextResponse.json(
      {
        success: true,
        data: newOrder,
        message: "Order created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[API Route] Order creation failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest): Promise<NextResponse<GetOrdersResponse>> {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    console.log("[API Route] Fetching orders for user:", userId)

    // In a real app, filter by userId
    const orders = mockOrders

    console.log("[API Route] Returning orders:", orders.length)

    return NextResponse.json({
      success: true,
      data: orders,
      message: "Orders fetched successfully",
    })
  } catch (error) {
    console.error("[API Route] Orders fetch failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    )
  }
}
