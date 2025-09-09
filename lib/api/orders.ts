import type {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrdersResponse,
  GetOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from "@/lib/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

class OrdersAPI {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  async createOrder(orderData: CreateOrderRequest): Promise<CreateOrderResponse> {
    console.log("[API] Creating order with data:", orderData)

    try {
      const response = await this.request<CreateOrderResponse>("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      })

      console.log("[API] Order creation response:", response)
      return response
    } catch (error) {
      console.error("[API] Order creation failed:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  async getOrders(userId?: string): Promise<GetOrdersResponse> {
    console.log("[API] Fetching orders for user:", userId)

    try {
      const endpoint = userId ? `/orders?userId=${userId}` : "/orders"
      const response = await this.request<GetOrdersResponse>(endpoint)

      console.log("[API] Orders fetch response:", response)
      return response
    } catch (error) {
      console.error("[API] Orders fetch failed:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  async getOrder(orderId: string): Promise<GetOrderResponse> {
    console.log("[API] Fetching order:", orderId)

    try {
      const response = await this.request<GetOrderResponse>(`/orders/${orderId}`)

      console.log("[API] Order fetch response:", response)
      return response
    } catch (error) {
      console.error("[API] Order fetch failed:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  async updateOrder(orderId: string, updateData: UpdateOrderRequest): Promise<UpdateOrderResponse> {
    console.log("[API] Updating order:", orderId, "with data:", updateData)

    try {
      const response = await this.request<UpdateOrderResponse>(`/orders/${orderId}`, {
        method: "PATCH",
        body: JSON.stringify(updateData),
      })

      console.log("[API] Order update response:", response)
      return response
    } catch (error) {
      console.error("[API] Order update failed:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  async trackOrder(orderId: string): Promise<GetOrderResponse> {
    console.log("[API] Tracking order:", orderId)

    try {
      const response = await this.request<GetOrderResponse>(`/orders/${orderId}/track`)

      console.log("[API] Order tracking response:", response)
      return response
    } catch (error) {
      console.error("[API] Order tracking failed:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }
}

export const ordersAPI = new OrdersAPI()
