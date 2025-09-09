"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { OrdersTable } from "@/components/orders-table"
import { OrderTrackingModal } from "@/components/order-tracking-modal"
import { useAuth } from "@/lib/auth"
import { Package, Plus, Search, TrendingUp, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    recipientName: "John Doe",
    recipientPhone: "01712345678",
    pickupAddress: "Dhanmondi 27, Dhaka",
    deliveryAddress: "Gulshan 2, Dhaka",
    status: "delivered",
    amount: 150,
    createdAt: "2024-01-15T10:30:00Z",
    deliveredAt: "2024-01-15T16:45:00Z",
    trackingHistory: [
      { status: "Order confirmed", timestamp: "2024-01-15T10:30:00Z" },
      { status: "Picked up", timestamp: "2024-01-15T11:15:00Z" },
      { status: "In transit", timestamp: "2024-01-15T13:20:00Z" },
      { status: "Out for delivery", timestamp: "2024-01-15T15:30:00Z" },
      { status: "Delivered", timestamp: "2024-01-15T16:45:00Z" },
    ],
  },
  {
    id: "ORD-002",
    recipientName: "Sarah Ahmed",
    recipientPhone: "01798765432",
    pickupAddress: "Uttara Sector 7, Dhaka",
    deliveryAddress: "Banani, Dhaka",
    status: "in-transit",
    amount: 200,
    createdAt: "2024-01-16T09:15:00Z",
    trackingHistory: [
      { status: "Order confirmed", timestamp: "2024-01-16T09:15:00Z" },
      { status: "Picked up", timestamp: "2024-01-16T10:30:00Z" },
      { status: "In transit", timestamp: "2024-01-16T12:45:00Z" },
    ],
  },
  {
    id: "ORD-003",
    recipientName: "Mohammad Rahman",
    recipientPhone: "01634567890",
    pickupAddress: "Mirpur 10, Dhaka",
    deliveryAddress: "Old Dhaka, Dhaka",
    status: "pending",
    amount: 120,
    createdAt: "2024-01-17T14:20:00Z",
    trackingHistory: [{ status: "Order confirmed", timestamp: "2024-01-17T14:20:00Z" }],
  },
  {
    id: "ORD-004",
    recipientName: "Fatima Khan",
    recipientPhone: "01556789012",
    pickupAddress: "Wari, Dhaka",
    deliveryAddress: "Tejgaon, Dhaka",
    status: "out-for-delivery",
    amount: 180,
    createdAt: "2024-01-17T11:00:00Z",
    trackingHistory: [
      { status: "Order confirmed", timestamp: "2024-01-17T11:00:00Z" },
      { status: "Picked up", timestamp: "2024-01-17T12:15:00Z" },
      { status: "In transit", timestamp: "2024-01-17T14:30:00Z" },
      { status: "Out for delivery", timestamp: "2024-01-17T16:00:00Z" },
    ],
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null)

  if (!user) {
    redirect("/")
  }

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.recipientPhone.includes(searchTerm),
  )

  const stats = {
    total: mockOrders.length,
    delivered: mockOrders.filter((o) => o.status === "delivered").length,
    pending: mockOrders.filter((o) => o.status === "pending").length,
    inTransit: mockOrders.filter((o) => o.status === "in-transit" || o.status === "out-for-delivery").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || "User"}</p>
          </div>
          <Link href="/create-order">
            <Button size="lg" className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Order
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.inTransit}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>Recent Orders</CardTitle>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <OrdersTable orders={filteredOrders} onOrderClick={(order) => setSelectedOrder(order)} />
          </CardContent>
        </Card>

        {/* Order Tracking Modal */}
        {selectedOrder && (
          <OrderTrackingModal order={selectedOrder} isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}
      </div>
    </div>
  )
}
