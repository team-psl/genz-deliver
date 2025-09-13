"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import { useState } from "react"

export function TrackOrderSection() {
  const [trackingNumber, setTrackingNumber] = useState("")

  const handleTrackOrder = () => {
    if (trackingNumber.trim()) {
      // Navigate to tracking page or show modal
      console.log("Tracking order:", trackingNumber)
      // In a real app, you would navigate to tracking page or show tracking modal
      alert(`Tracking order: ${trackingNumber}`)
    } else {
      alert("Please enter a tracking number")
    }
  }

  return (
    <section id="track-section" className="py-32 bg-red-100/15">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Track Your <span className="text-primary">Order</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Enter your tracking number to get real-time updates on your package delivery status.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <div className="flex-1 w-full">
              <Label htmlFor="tracking-number" className="sr-only">
                Tracking Number
              </Label>
              <Input
                id="tracking-number"
                placeholder="Enter your tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrackOrder()}
                className="h-14 text-base px-6 bg-background"
                aria-label="Enter your tracking number"
              />
            </div>
            <Button 
              onClick={handleTrackOrder}
              className="h-14 flex w-[150px] justify-center items-center"
              aria-label="Track your order"
            >
              <Search className="mr-2 h-5 w-5" />
              Track Order
            </Button>
          </div>

          <div className="mt-8 p-6 bg-background rounded-2xl border border-border/50 max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground">
              <strong>Sample tracking numbers:</strong> TRK123456789, DLV987654321, PKG456789123
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
