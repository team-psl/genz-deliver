import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  Truck, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

const stats = [
  {
    title: "Total Orders",
    value: "1,234",
    change: "+12.5%",
    trend: "up",
    icon: Package,
    description: "Orders this month"
  },
  {
    title: "Active Deliveries",
    value: "89",
    change: "+5.2%", 
    trend: "up",
    icon: Truck,
    description: "Currently in transit"
  },
  // {
  //   title: "Total Customers",
  //   value: "567",
  //   change: "+8.1%",
  //   trend: "up", 
  //   icon: Users,
  //   description: "Active customers"
  // },
  // {
  //   title: "Revenue",
  //   value: "$12,345",
  //   change: "-2.3%",
  //   trend: "down",
  //   icon: DollarSign,
  //   description: "This month"
  // }
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    status: "delivered",
    amount: "$45.99",
    date: "2 hours ago"
  },
  {
    id: "ORD-002", 
    customer: "Sarah Johnson",
    status: "in-transit",
    amount: "$32.50",
    date: "4 hours ago"
  },
  {
    id: "ORD-003",
    customer: "Mike Davis", 
    status: "pending",
    amount: "$78.25",
    date: "6 hours ago"
  },
  {
    id: "ORD-004",
    customer: "Emily Brown",
    status: "delivered", 
    amount: "$56.75",
    date: "8 hours ago"
  }
]

function getStatusBadge(status: string) {
  switch (status) {
    case "delivered":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Delivered</Badge>
    case "in-transit":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Truck className="w-3 h-3 mr-1" />In Transit</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your courier service today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="w-4 h-4 mr-2" />
            Schedule Pickup
          </Button>
          <Button asChild>
            <a href="/dashboard/orders/new">
              <Package className="w-4 h-4 mr-2" />
              Create Order
            </a>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className={`flex items-center ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest courier orders and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(order.status)}
                    <div className="text-right">
                      <p className="font-medium">{order.amount}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                View All Orders
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>
              Key performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Delivered Today</span>
              </div>
              <span className="font-bold">23</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <span className="text-sm">In Transit</span>
              </div>
              <span className="font-bold">89</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span className="text-sm">Pending Pickup</span>
              </div>
              <span className="font-bold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm">Delayed</span>
              </div>
              <span className="font-bold">3</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Success Rate</span>
                <span className="font-bold text-green-600">96.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}