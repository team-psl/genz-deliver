"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { LocationPicker } from "@/components/location-picker"
import { useAuth } from "@/lib/auth"
import { AuthDialog } from "@/components/auth-dialog"
import { MapPin, Package, Clock, Calculator, CheckCircle } from "lucide-react"

interface BookingData {
  pickupLocation: string
  pickupContactName: string
  pickupContactPhone: string
  dropoffLocation: string
  dropoffContactName: string
  dropoffContactPhone: string
  parcelType: string
  parcelWeight: string
  parcelSize: string
  parcelValue: string
  deliveryTime: string
  specialInstructions: string
}

export function BookingForm() {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    pickupLocation: "",
    pickupContactName: "",
    pickupContactPhone: "",
    dropoffLocation: "",
    dropoffContactName: "",
    dropoffContactPhone: "",
    parcelType: "",
    parcelWeight: "",
    parcelSize: "",
    parcelValue: "",
    deliveryTime: "",
    specialInstructions: "",
  })

  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [pickupCoordinates, setPickupCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const [dropoffCoordinates, setDropoffCoordinates] = useState<{ lat: number; lng: number } | null>(null)

  const calculatePrice = () => {
    let basePrice = 50 // Base price in BDT

    // Distance-based pricing (mock calculation)
    if (pickupCoordinates && dropoffCoordinates) {
      const distance =
        Math.sqrt(
          Math.pow(pickupCoordinates.lat - dropoffCoordinates.lat, 2) +
            Math.pow(pickupCoordinates.lng - dropoffCoordinates.lng, 2),
        ) * 111 // Rough conversion to km
      basePrice += Math.round(distance * 15) // 15 BDT per km
    }

    // Weight-based pricing
    const weight = Number.parseFloat(bookingData.parcelWeight) || 0
    if (weight > 5) basePrice += (weight - 5) * 10

    // Size-based pricing
    if (bookingData.parcelSize === "large") basePrice += 30
    else if (bookingData.parcelSize === "medium") basePrice += 15

    // Delivery time pricing
    if (bookingData.deliveryTime === "express") basePrice += 50
    else if (bookingData.deliveryTime === "same-day") basePrice += 25

    setEstimatedPrice(basePrice)
  }

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLocationChange = (
    field: "pickupLocation" | "dropoffLocation",
    value: string,
    coordinates?: { lat: number; lng: number },
  ) => {
    handleInputChange(field, value)
    if (field === "pickupLocation") {
      setPickupCoordinates(coordinates || null)
    } else {
      setDropoffCoordinates(coordinates || null)
    }
  }

  const handleNextStep = () => {
    if (step === 2) calculatePrice()
    setStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleConfirmBooking = () => {
    // Here you would typically send the booking data to your backend
    console.log("Booking confirmed:", {
      ...bookingData,
      pickupCoordinates,
      dropoffCoordinates,
    })
    setBookingConfirmed(true)
  }

  if (bookingConfirmed) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Your parcel booking has been confirmed. You will receive a confirmation email shortly.
          </p>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="font-medium">
              Booking ID:{" "}
              <span className="text-primary">PTC-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">Track your parcel using this booking ID</p>
          </div>
          <Button onClick={() => (window.location.href = "/")}>Back to Home</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-xl">Step {step} of 3</CardTitle>
              <div className="flex space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-4">Pickup & Delivery Details</h3>

                  {/* Pickup Information */}
                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium text-foreground flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      Pickup Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="pickup-location">Pickup Address *</Label>
                        <LocationPicker
                          value={bookingData.pickupLocation}
                          onChange={(value, coordinates) => handleLocationChange("pickupLocation", value, coordinates)}
                          placeholder="Enter pickup address"
                          showMap={true}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickup-contact-name">Contact Name *</Label>
                        <Input
                          id="pickup-contact-name"
                          placeholder="Contact person name"
                          value={bookingData.pickupContactName}
                          onChange={(e) => handleInputChange("pickupContactName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickup-contact-phone">Contact Phone *</Label>
                        <Input
                          id="pickup-contact-phone"
                          placeholder="Contact phone number"
                          value={bookingData.pickupContactPhone}
                          onChange={(e) => handleInputChange("pickupContactPhone", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Delivery Information */}
                  <div className="space-y-4 mt-6">
                    <h4 className="font-medium text-foreground flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-green-600" />
                      Delivery Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="dropoff-location">Delivery Address *</Label>
                        <LocationPicker
                          value={bookingData.dropoffLocation}
                          onChange={(value, coordinates) => handleLocationChange("dropoffLocation", value, coordinates)}
                          placeholder="Enter delivery address"
                          showMap={true}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dropoff-contact-name">Contact Name *</Label>
                        <Input
                          id="dropoff-contact-name"
                          placeholder="Recipient name"
                          value={bookingData.dropoffContactName}
                          onChange={(e) => handleInputChange("dropoffContactName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dropoff-contact-phone">Contact Phone *</Label>
                        <Input
                          id="dropoff-contact-phone"
                          placeholder="Recipient phone number"
                          value={bookingData.dropoffContactPhone}
                          onChange={(e) => handleInputChange("dropoffContactPhone", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-4">Parcel Details</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parcel-type">Parcel Type *</Label>
                      <Select
                        value={bookingData.parcelType}
                        onValueChange={(value) => handleInputChange("parcelType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select parcel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="documents">Documents</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="food">Food Items</SelectItem>
                          <SelectItem value="fragile">Fragile Items</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parcel-weight">Weight (kg) *</Label>
                      <Input
                        id="parcel-weight"
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        value={bookingData.parcelWeight}
                        onChange={(e) => handleInputChange("parcelWeight", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parcel-size">Package Size *</Label>
                      <Select
                        value={bookingData.parcelSize}
                        onValueChange={(value) => handleInputChange("parcelSize", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small (up to 30cm)</SelectItem>
                          <SelectItem value="medium">Medium (30-60cm)</SelectItem>
                          <SelectItem value="large">Large (60cm+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parcel-value">Declared Value (BDT)</Label>
                      <Input
                        id="parcel-value"
                        type="number"
                        placeholder="0"
                        value={bookingData.parcelValue}
                        onChange={(e) => handleInputChange("parcelValue", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="delivery-time">Delivery Time *</Label>
                      <Select
                        value={bookingData.deliveryTime}
                        onValueChange={(value) => handleInputChange("deliveryTime", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select delivery time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard (2-3 days)</SelectItem>
                          <SelectItem value="same-day">Same Day (+25 BDT)</SelectItem>
                          <SelectItem value="express">Express (1-2 hours) (+50 BDT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="special-instructions">Special Instructions</Label>
                      <Textarea
                        id="special-instructions"
                        placeholder="Any special handling instructions..."
                        value={bookingData.specialInstructions}
                        onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-4">Review & Confirm</h3>

                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Pickup Details</h4>
                      <p className="text-sm text-muted-foreground">{bookingData.pickupLocation}</p>
                      <p className="text-sm text-muted-foreground">
                        {bookingData.pickupContactName} - {bookingData.pickupContactPhone}
                      </p>
                      {pickupCoordinates && (
                        <Badge variant="outline" className="text-xs mt-1">
                          GPS: {pickupCoordinates.lat.toFixed(4)}, {pickupCoordinates.lng.toFixed(4)}
                        </Badge>
                      )}
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Delivery Details</h4>
                      <p className="text-sm text-muted-foreground">{bookingData.dropoffLocation}</p>
                      <p className="text-sm text-muted-foreground">
                        {bookingData.dropoffContactName} - {bookingData.dropoffContactPhone}
                      </p>
                      {dropoffCoordinates && (
                        <Badge variant="outline" className="text-xs mt-1">
                          GPS: {dropoffCoordinates.lat.toFixed(4)}, {dropoffCoordinates.lng.toFixed(4)}
                        </Badge>
                      )}
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Parcel Information</h4>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary">{bookingData.parcelType}</Badge>
                        <Badge variant="secondary">{bookingData.parcelWeight} kg</Badge>
                        <Badge variant="secondary">{bookingData.parcelSize}</Badge>
                        <Badge variant="secondary">{bookingData.deliveryTime}</Badge>
                      </div>
                      {bookingData.specialInstructions && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <strong>Instructions:</strong> {bookingData.specialInstructions}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handlePrevStep} disabled={step === 1}>
                Previous
              </Button>

              {step < 3 ? (
                <Button
                  onClick={handleNextStep}
                  disabled={
                    (step === 1 && (!bookingData.pickupLocation || !bookingData.dropoffLocation)) ||
                    (step === 2 &&
                      (!bookingData.parcelType ||
                        !bookingData.parcelWeight ||
                        !bookingData.parcelSize ||
                        !bookingData.deliveryTime))
                  }
                >
                  Next
                </Button>
              ) : (
                <div className="space-x-2">
                  {!user ? (
                    <AuthDialog>
                      <Button>Sign In to Confirm</Button>
                    </AuthDialog>
                  ) : (
                    <Button onClick={handleConfirmBooking}>Confirm Booking</Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Price Estimate */}
        {step >= 2 && estimatedPrice > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-primary" />
                Price Estimate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">৳{estimatedPrice}</div>
                <p className="text-sm text-muted-foreground">
                  {pickupCoordinates && dropoffCoordinates
                    ? "Based on GPS coordinates"
                    : "Final price may vary based on actual distance"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Service Features */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Why Choose Pathao Courier?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Fast Delivery</p>
                <p className="text-xs text-muted-foreground">Same day and express options available</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Package className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Real-time Tracking</p>
                <p className="text-xs text-muted-foreground">Track your parcel every step of the way</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Safe & Secure</p>
                <p className="text-xs text-muted-foreground">100% safe delivery guarantee</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
