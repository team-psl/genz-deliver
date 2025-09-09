"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Package, Truck } from "lucide-react"

interface Order {
  id: string
  recipientName: string
  recipientPhone: string
  pickupAddress: string
  deliveryAddress: string
  status: string
  amount: number
  createdAt: string
  deliveredAt?: string
  trackingHistory: Array<{
    status: string
    timestamp: string
  }>
}

interface OrderTrackingModalProps {
  order: Order
  isOpen: boolean
  onClose: () => void
}

const getStatusIcon = (status: string, isCompleted: boolean) => {
  if (isCompleted) {
    return <CheckCircle className="h-6 w-6 text-green-600" />
  }

  switch (status.toLowerCase()) {
    case "order confirmed":
      return <Package className="h-6 w-6 text-orange-600" />
    case "picked up":
      return <Package className="h-6 w-6 text-blue-600" />
    case "in transit":
      return <Truck className="h-6 w-6 text-blue-600" />
    case "out for delivery":
      return <Truck className="h-6 w-6 text-purple-600" />
    case "delivered":
      return <CheckCircle className="h-6 w-6 text-green-600" />
    default:
      return <Clock className="h-6 w-6 text-gray-400" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800"
    case "in-transit":
      return "bg-blue-100 text-blue-800"
    case "out-for-delivery":
      return "bg-purple-100 text-purple-800"
    case "pending":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function OrderTrackingModal({ order, isOpen, onClose }: OrderTrackingModalProps) {
  const formatStatus = (status: string) => {
    switch (status) {
      case "in-transit":
        return "In Transit"
      case "out-for-delivery":
        return "Out for Delivery"
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order Tracking - {order.id}</span>
            <Badge className={getStatusColor(order.status)}>{formatStatus(order.status)}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Recipient</h4>
              <p className="font-medium">{order.recipientName}</p>
              <p className="text-sm text-muted-foreground">{order.recipientPhone}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Amount</h4>
              <p className="font-medium text-lg">৳{order.amount}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Pickup Address</h4>
              <p className="text-sm">{order.pickupAddress}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Delivery Address</h4>
              <p className="text-sm">{order.deliveryAddress}</p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Timeline</h3>
            <div className="space-y-4">
              {order.trackingHistory.map((event, index) => {
                const isCompleted = true
                const isLast = index === order.trackingHistory.length - 1

                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      {getStatusIcon(event.status, isCompleted)}
                      {!isLast && <div className="w-0.5 h-8 bg-green-200 mt-2" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</p>
                      </div>
                      {event.status === "Order has been assigned" && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Order has been assigned to (Md, Mehedi Hasan-01319400845) for delivery
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
