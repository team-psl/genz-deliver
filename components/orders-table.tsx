"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

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

interface OrdersTableProps {
  orders: Order[]
  onOrderClick: (order: Order) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "in-transit":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "out-for-delivery":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200"
    case "pending":
      return "bg-orange-100 text-orange-800 hover:bg-orange-200"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
}

const formatStatus = (status: string) => {
  switch (status) {
    case "in-transit":
      return "In Transit"
    case "out-for-delivery":
      return "Out for Delivery"
    case "delivered":
      return "Delivered"
    case "pending":
      return "Pending"
    default:
      return status
  }
}

export function OrdersTable({ orders, onOrderClick }: OrdersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order ID</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Recipient</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">From → To</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => onOrderClick(order)}
            >
              <td className="py-4 px-4 font-medium">{order.id}</td>
              <td className="py-4 px-4">
                <div>
                  <div className="font-medium">{order.recipientName}</div>
                  <div className="text-sm text-muted-foreground">{order.recipientPhone}</div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="text-sm">
                  <div className="truncate max-w-48">{order.pickupAddress}</div>
                  <div className="text-muted-foreground">↓</div>
                  <div className="truncate max-w-48">{order.deliveryAddress}</div>
                </div>
              </td>
              <td className="py-4 px-4">
                <Badge className={getStatusColor(order.status)}>{formatStatus(order.status)}</Badge>
              </td>
              <td className="py-4 px-4 font-medium">৳{order.amount}</td>
              <td className="py-4 px-4 text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOrderClick(order)
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && <div className="text-center py-8 text-muted-foreground">No orders found</div>}
    </div>
  )
}
