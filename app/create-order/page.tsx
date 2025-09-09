"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth"
import { useI18n } from "@/lib/i18n-provider"
import { ordersAPI } from "@/lib/api/orders"
import type { OrderFormData } from "@/lib/types"
import { Search, Plus, Minus, HelpCircle, CheckCircle } from "lucide-react"
import { redirect } from "next/navigation"

export default function CreateOrderPage() {
  const { user } = useAuth()
  const { t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null)

  const [formData, setFormData] = useState<OrderFormData>({
    recipientPhone: "",
    recipientSecondaryPhone: "",
    recipientName: "",
    recipientAddress: "",
    deliveryArea: "",
    specialInstructions: "",
    deliveryType: "normal",
    totalWeight: "0-0.5",
    quantity: 1,
    amountToCollect: "",
    itemDescription: "",
  })

  if (!user) {
    redirect("/")
  }

  const handleInputChange = (field: keyof OrderFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleQuantityChange = (increment: boolean) => {
    setFormData((prev) => ({
      ...prev,
      quantity: increment ? prev.quantity + 1 : Math.max(1, prev.quantity - 1),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      console.log("Order form submission data:", formData)

      // Call API to create order
      const response = await ordersAPI.createOrder(formData)

      if (response.success && response.data) {
        setSubmitSuccess(true)
        setCreatedOrderId(response.data.id)
        console.log("Order created successfully:", response.data)
      } else {
        setSubmitError(response.error || "Failed to create order")
      }
    } catch (error) {
      console.error("Order creation failed:", error)
      setSubmitError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Order Created Successfully!</h2>
            <p className="text-muted-foreground mb-6">Your order has been created and is being processed.</p>
            {createdOrderId && (
              <div className="bg-muted p-4 rounded-lg mb-6">
                <p className="font-medium">
                  Order ID: <span className="text-primary">{createdOrderId}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">Use this ID to track your order</p>
              </div>
            )}
            <div className="space-y-2">
              <Button onClick={() => (window.location.href = "/dashboard")} className="w-full">
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitSuccess(false)
                  setCreatedOrderId(null)
                  setFormData({
                    recipientPhone: "",
                    recipientSecondaryPhone: "",
                    recipientName: "",
                    recipientAddress: "",
                    deliveryArea: "",
                    specialInstructions: "",
                    deliveryType: "normal",
                    totalWeight: "0-0.5",
                    quantity: 1,
                    amountToCollect: "",
                    itemDescription: "",
                  })
                }}
                className="w-full"
              >
                Create Another Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("order.title")}</h1>
            <p className="text-muted-foreground">{t("order.subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recipient Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t("order.recipientDetails")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="recipient-phone">{t("order.recipientPhone")}</Label>
                    <Input
                      id="recipient-phone"
                      placeholder="Enter phone number"
                      value={formData.recipientPhone}
                      onChange={(e) => handleInputChange("recipientPhone", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient-secondary-phone">{t("order.recipientSecondaryPhone")}</Label>
                    <Input
                      id="recipient-secondary-phone"
                      placeholder="Enter phone number"
                      value={formData.recipientSecondaryPhone}
                      onChange={(e) => handleInputChange("recipientSecondaryPhone", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient-name">{t("order.recipientName")}</Label>
                    <Input
                      id="recipient-name"
                      placeholder="Type Name"
                      value={formData.recipientName}
                      onChange={(e) => handleInputChange("recipientName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient-address">{t("order.recipientAddress")}</Label>
                    <Textarea
                      id="recipient-address"
                      placeholder="Enter full address"
                      value={formData.recipientAddress}
                      onChange={(e) => handleInputChange("recipientAddress", e.target.value)}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delivery-area">{t("order.deliveryArea")}</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="delivery-area"
                        placeholder="Search Area"
                        value={formData.deliveryArea}
                        onChange={(e) => handleInputChange("deliveryArea", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="special-instructions">{t("order.specialInstructions")}</Label>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Textarea
                      id="special-instructions"
                      placeholder="Type here"
                      value={formData.specialInstructions}
                      onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t("order.deliveryDetails")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="delivery-type">{t("order.deliveryType")}</Label>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Select
                      value={formData.deliveryType}
                      onValueChange={(value) => handleInputChange("deliveryType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Normal Delivery" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal Delivery</SelectItem>
                        <SelectItem value="express">Express Delivery</SelectItem>
                        <SelectItem value="same-day">Same Day Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="total-weight">{t("order.totalWeight")}</Label>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Select
                        value={formData.totalWeight}
                        onValueChange={(value) => handleInputChange("totalWeight", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="0-0.5" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-0.5">0-0.5</SelectItem>
                          <SelectItem value="0.5-1">0.5-1</SelectItem>
                          <SelectItem value="1-2">1-2</SelectItem>
                          <SelectItem value="2-5">2-5</SelectItem>
                          <SelectItem value="5+">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="quantity">{t("order.quantity")}</Label>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center border rounded-md">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-10 w-10 p-0"
                          onClick={() => handleQuantityChange(false)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="flex-1 text-center py-2 border-x">{formData.quantity}</div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-10 w-10 p-0"
                          onClick={() => handleQuantityChange(true)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="amount-to-collect">{t("order.amountToCollect")}</Label>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="amount-to-collect"
                      placeholder="Enter the amount including delivery charge"
                      value={formData.amountToCollect}
                      onChange={(e) => handleInputChange("amountToCollect", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="item-description">{t("order.itemDescription")}</Label>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Textarea
                      id="item-description"
                      placeholder="Type items' names & their prices"
                      value={formData.itemDescription}
                      onChange={(e) => handleInputChange("itemDescription", e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              {submitError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">{submitError}</div>
              )}
              <Button type="submit" size="lg" className="px-12" disabled={isSubmitting}>
                {isSubmitting ? "Creating Order..." : t("order.createOrder")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
