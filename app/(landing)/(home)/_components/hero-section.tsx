"use client"
import { Button } from "@/components/ui/button"
import { Package, Clock, Shield, Truck, ArrowRight, MapPin, Calculator } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative md:h-screen overflow-hidden">
      {/* Pathao Courier Background Image - Responsive */}
      <div 
        className="absolute inset-0 md:bg-cover max-md:bg-contain max-md:bg-top bg-center bg-no-repeat bg-accent"
        style={{
          backgroundImage: 'url(https://merchant.pathao.com/assets/hero_image_mobile.351b2caf.png)'
        }}
      />
      
      {/* Desktop Background Image */}
      <div 
        className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://pathao.com/bn/wp-content/uploads/sites/6/2018/12/05-Courier.png)'
        }}
      />
      
      {/* White Fade Overlay - Top to Bottom */}
      <div className="absolute md:hidden inset-0 bg-gradient-to-b from-white/65 via-white/85 to-white/75 " />
      
      {/* Additional Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-transparent to-background/30" />

      <div className="container mx-auto px-4 pt-20 pb-8 relative z-10 h-full flex flex-col">
        <div className="text-center space-y-6 max-w-4xl mx-auto flex-1 flex flex-col justify-start">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium backdrop-blur-sm">
              <Truck className="h-3 w-3" />
              #1 Trusted Courier Service in Bangladesh
            </div>

            {/* Hero Content */}
            <div className="space-y-4">
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Deliver Anywhere,
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Anytime
                </span>
              </h1>
              <p className="text-base md:text-lg md:text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Experience Bangladesh's most reliable courier service. Track packages in real-time, 
                get instant pricing, and enjoy doorstep delivery across the country.
              </p>
            </div>

             {/* CTA Buttons */}
             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <a
                 href="/dashboard/orders/new"
                 className="inline-flex items-center text-sm px-8 py-3 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
               >
                 <Calculator className="mr-2 h-4 w-4" />
                 Book Now
                 <ArrowRight className="ml-2 h-4 w-4" />
               </a>
               
               <a
                 href="#track-section"
                 className="inline-flex items-center text-sm px-8 py-3 h-12 bg-white/80 backdrop-blur-sm border border-primary/30 text-foreground hover:bg-white hover:border-primary rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
               >
                 <MapPin className="mr-2 h-4 w-4" />
                 Track Your Order
               </a>
             </div>

            {/* Quick Stats */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-center">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-foreground">50,000+ Customers</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-foreground">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-foreground">Same Day Delivery</span>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group flex flex-col items-center space-y-2 text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 hover:bg-white/70 transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">Lightning Fast</p>
                  <p className="text-xs text-muted-foreground">Same day delivery across Dhaka</p>
                </div>
              </div>
              
              <div className="group flex flex-col items-center space-y-2 text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 hover:bg-white/70 transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">100% Secure</p>
                  <p className="text-xs text-muted-foreground">Insurance coverage guaranteed</p>
                </div>
              </div>
              
              <div className="group flex flex-col items-center space-y-2 text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 hover:bg-white/70 transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">Live Tracking</p>
                  <p className="text-xs text-muted-foreground">Real-time delivery updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
