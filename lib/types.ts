export interface OrderFormData {
  recipientPhone: string
  recipientSecondaryPhone: string
  recipientName: string
  recipientAddress: string
  deliveryArea: string
  specialInstructions: string
  deliveryType: string
  totalWeight: string
  quantity: number
  amountToCollect: string
  itemDescription: string
}

export interface Order {
  id: string
  recipientName: string
  recipientPhone: string
  recipientSecondaryPhone?: string
  recipientAddress: string
  deliveryArea: string
  pickupAddress?: string
  deliveryAddress: string
  status: "pending" | "accepted" | "picked" | "in-transit" | "out-for-delivery" | "delivered" | "cancelled"
  amount: number
  deliveryType: string
  totalWeight: string
  quantity: number
  itemDescription: string
  specialInstructions?: string
  createdAt: string
  updatedAt: string
  deliveredAt?: string
  trackingHistory: TrackingEvent[]
}

export interface TrackingEvent {
  status: string
  timestamp: string
  location?: string
  description?: string
}

export interface CreateOrderRequest extends OrderFormData {
  pickupAddress?: string
}

export interface CreateOrderResponse {
  success: boolean
  data?: Order
  error?: string
  message?: string
}

export interface GetOrdersResponse {
  success: boolean
  data?: Order[]
  error?: string
  message?: string
}

export interface GetOrderResponse {
  success: boolean
  data?: Order
  error?: string
  message?: string
}

export interface UpdateOrderRequest {
  status?: Order["status"]
  trackingEvent?: Omit<TrackingEvent, "timestamp">
}

export interface UpdateOrderResponse {
  success: boolean
  data?: Order
  error?: string
  message?: string
}
