import { BookingForm } from "@/components/booking-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book Delivery - Pathao Courier",
  description: "Book your parcel delivery with Pathao Courier. Fast, reliable, and affordable.",
}

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Book Your Delivery</h1>
            <p className="text-lg text-muted-foreground">
              Fill in the details below to get an instant quote and book your parcel delivery
            </p>
          </div>
          <BookingForm />
        </div>
      </div>
    </div>
  )
}
