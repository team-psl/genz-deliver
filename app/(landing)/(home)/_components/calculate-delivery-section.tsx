"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { 
  Calculator, 
  MapPin, 
  Package, 
  Weight, 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  Truck,
  Zap,
  Timer,
  FileText,
  Box,
  Shield,
  Cpu
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"

// Zod validation schema
const deliveryFormSchema = z.object({
  fromCity: z.string().min(1, "Please select a pickup city"),
  toCity: z.string().min(1, "Please select a destination city"),
  deliveryType: z.string().min(1, "Please select a delivery speed"),
  productType: z.string().min(1, "Please select a package type"),
  productWeight: z.string().min(1, "Please select a weight range"),
}).refine((data) => data.fromCity !== data.toCity, {
  message: "Pickup and destination cities must be different",
  path: ["toCity"],
})

type DeliveryFormData = z.infer<typeof deliveryFormSchema>

export function CalculateDeliverySection() {
  const [totalCost, setTotalCost] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [calculationProgress, setCalculationProgress] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState<string>("")

  const form = useForm<DeliveryFormData>({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: {
      fromCity: "",
      toCity: "",
      deliveryType: "",
      productType: "",
      productWeight: "",
    },
  })

  const deliveryTypeIcons = {
    normal: Truck,
    express: Zap,
    "same-day": Timer
  }

  const productTypeIcons = {
    document: FileText,
    parcel: Box,
    fragile: Shield,
    electronics: Cpu
  }

  const onSubmit = async (data: DeliveryFormData) => {
    setIsCalculating(true)
    setShowSuccess(false)
    setCalculationProgress(0)

    try {
      // Simulate realistic API call with progress tracking
      const steps = [
        { message: "Analyzing route...", progress: 20 },
        { message: "Calculating distance...", progress: 40 },
        { message: "Processing delivery options...", progress: 60 },
        { message: "Computing final price...", progress: 80 },
        { message: "Finalizing quote...", progress: 100 }
      ]

      for (const step of steps) {
        setCalculationProgress(step.progress)
        await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
      }

      // Enhanced realistic cost calculation
      let baseCost = 0
      let breakdown = {
        baseRate: 0,
        distanceCost: 0,
        speedSurcharge: 0,
        weightCharge: 0,
        handlingFee: 0,
        serviceTax: 0
      }
      
      // Base rate by delivery type
      const baseRates = {
        normal: 50,
        express: 80,
        "same-day": 150
      }
      breakdown.baseRate = baseRates[data.deliveryType as keyof typeof baseRates]
      baseCost += breakdown.baseRate

      // Distance-based pricing (more realistic)
      const cityDistances: Record<string, Record<string, { distance: number; rate: number }>> = {
        dhaka: { 
          dhaka: { distance: 0, rate: 0 }, 
          chittagong: { distance: 244, rate: 30 }, 
          sylhet: { distance: 196, rate: 25 }, 
          bagerhat: { distance: 280, rate: 35 }, 
          narshingdi: { distance: 50, rate: 15 } 
        },
        chittagong: { 
          dhaka: { distance: 244, rate: 30 }, 
          chittagong: { distance: 0, rate: 0 }, 
          sylhet: { distance: 168, rate: 20 }, 
          bagerhat: { distance: 320, rate: 40 }, 
          narshingdi: { distance: 200, rate: 25 } 
        },
        sylhet: { 
          dhaka: { distance: 196, rate: 25 }, 
          chittagong: { distance: 168, rate: 20 }, 
          sylhet: { distance: 0, rate: 0 }, 
          bagerhat: { distance: 400, rate: 50 }, 
          narshingdi: { distance: 180, rate: 22 } 
        },
        bagerhat: { 
          dhaka: { distance: 280, rate: 35 }, 
          chittagong: { distance: 320, rate: 40 }, 
          sylhet: { distance: 400, rate: 50 }, 
          bagerhat: { distance: 0, rate: 0 }, 
          narshingdi: { distance: 250, rate: 30 } 
        },
        narshingdi: { 
          dhaka: { distance: 50, rate: 15 }, 
          chittagong: { distance: 200, rate: 25 }, 
          sylhet: { distance: 180, rate: 22 }, 
          bagerhat: { distance: 250, rate: 30 }, 
          narshingdi: { distance: 0, rate: 0 } 
        }
      }
      
      const routeInfo = cityDistances[data.fromCity]?.[data.toCity] || { distance: 100, rate: 20 }
      breakdown.distanceCost = routeInfo.rate
      baseCost += breakdown.distanceCost

      // Speed surcharge (additional to base rate difference)
      if (data.deliveryType === "express") {
        breakdown.speedSurcharge = 20
      } else if (data.deliveryType === "same-day") {
        breakdown.speedSurcharge = 50
      }
      baseCost += breakdown.speedSurcharge
      
      // Weight-based pricing (more granular)
      const weightCharges = {
        "0-0.5": 0,
        "0.5-1": 10,
        "1-2": 20,
        "2-5": 35,
        "5+": 60
      }
      breakdown.weightCharge = weightCharges[data.productWeight as keyof typeof weightCharges] || 0
      baseCost += breakdown.weightCharge
      
      // Product handling fees
      const handlingFees = {
        document: 5,
        parcel: 10,
        fragile: 25,
        electronics: 20
      }
      breakdown.handlingFee = handlingFees[data.productType as keyof typeof handlingFees] || 0
      baseCost += breakdown.handlingFee

      // Service tax (15% on total before tax)
      breakdown.serviceTax = Math.round(baseCost * 0.15)
      baseCost += breakdown.serviceTax
      
      // Round to nearest 5 taka for realistic pricing
      const finalCost = Math.round(baseCost / 5) * 5
      
      // Debug logging
      console.log("Calculation complete:", {
        baseCost,
        finalCost,
        breakdown,
        data
      })
      
      // Calculate estimated delivery time
      const deliveryTimes = {
        normal: "2-3 business days",
        express: "Next business day",
        "same-day": "Within 6 hours"
      }
      const estimatedDeliveryTime = deliveryTimes[data.deliveryType as keyof typeof deliveryTimes]
      
      setEstimatedTime(estimatedDeliveryTime)
      setTotalCost(finalCost)
      setShowSuccess(true)
      
      console.log("States set:", { finalCost, estimatedDeliveryTime, showSuccess: true })
      
      setTimeout(() => setShowSuccess(false), 5000)
    } catch (error) {
      console.error("Calculation error:", error)
      // Add error handling here if needed
    } finally {
      setIsCalculating(false)
    }
  }

  // Watch form values for real-time updates
  const watchedValues = form.watch()
  
  // Track previous form values to reset cost when form changes
  const prevFormValues = useRef<string>("")
  
  useEffect(() => {
    const currentFormString = JSON.stringify([
      watchedValues.fromCity,
      watchedValues.toCity,
      watchedValues.deliveryType,
      watchedValues.productType,
      watchedValues.productWeight
    ])
    
    if (prevFormValues.current !== "" && prevFormValues.current !== currentFormString && totalCost) {
      setTotalCost(null)
      setShowSuccess(false)
      setCalculationProgress(0)
      setEstimatedTime("")
    }
    
    prevFormValues.current = currentFormString
  }, [watchedValues.fromCity, watchedValues.toCity, watchedValues.deliveryType, watchedValues.productType, watchedValues.productWeight, totalCost])

  return (
    <section
      id="calculate-section"
      className="py-16 lg:py-24 bg-gradient-to-br from-background via-background to-secondary/20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Calculator className="h-4 w-4" />
              Delivery Calculator
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Calculate Your <span className="text-primary">Delivery Cost</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get an instant, accurate quote for your delivery. Our smart
              calculator considers distance, delivery speed, and package details
              to give you the best price.
            </p>
          </div>

          {/* Main Calculator Card */}
          <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Form Section */}
            <div className="lg:col-span-3">
              <Card className="bg-red-100/15 border-red-200/50 backdrop-blur-sm border-2 shadow-2xl shadow-black/5">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Delivery Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* From City */}
                        <FormField
                          control={form.control}
                          name="fromCity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-foreground flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-green-600" />
                                From City
                              </FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="h-10 w-full bg-background border-border hover:border-primary/50 transition-colors focus:ring-2 focus:ring-primary/20">
                                    <SelectValue placeholder="Select pickup city" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="dhaka">Dhaka</SelectItem>
                                    <SelectItem value="chittagong">
                                      Chittagong
                                    </SelectItem>
                                    <SelectItem value="sylhet">
                                      Sylhet
                                    </SelectItem>
                                    <SelectItem value="bagerhat">
                                      Bagerhat
                                    </SelectItem>
                                    <SelectItem value="narshingdi">
                                      Narshingdi
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        {/* To City */}
                        <FormField
                          control={form.control}
                          name="toCity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-foreground flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-red-600" />
                                To City
                              </FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="h-10 w-full bg-background border-border hover:border-primary/50 transition-colors focus:ring-2 focus:ring-primary/20">
                                    <SelectValue placeholder="Select destination city" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="dhaka">Dhaka</SelectItem>
                                    <SelectItem value="chittagong">
                                      Chittagong
                                    </SelectItem>
                                    <SelectItem value="sylhet">
                                      Sylhet
                                    </SelectItem>
                                    <SelectItem value="bagerhat">
                                      Bagerhat
                                    </SelectItem>
                                    <SelectItem value="narshingdi">
                                      Narshingdi
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        {/* Delivery Type */}
                        <FormField
                          control={form.control}
                          name="deliveryType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-foreground flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-600" />
                                Delivery Speed
                              </FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="h-10 w-full bg-background border-border hover:border-primary/50 transition-colors focus:ring-2 focus:ring-primary/20">
                                    <SelectValue placeholder="Select speed" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="normal">
                                      <div className="flex items-center gap-2">
                                        <Truck className="h-3 w-3 text-blue-500" />
                                        <span>Standard (2-3 days)</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="express">
                                      <div className="flex items-center gap-2">
                                        <Zap className="h-3 w-3 text-orange-500" />
                                        <span>Express (Next day)</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="same-day">
                                      <div className="flex items-center gap-2">
                                        <Timer className="h-3 w-3 text-red-500" />
                                        <span>Same Day (6 hours)</span>
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        {/* Package Type */}
                        <FormField
                          control={form.control}
                          name="productType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-foreground flex items-center gap-2">
                                <Package className="h-4 w-4 text-purple-600" />
                                Package Type
                              </FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="h-10 w-full bg-background border-border hover:border-primary/50 transition-colors focus:ring-2 focus:ring-primary/20">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="document">
                                      <div className="flex items-center gap-2">
                                        <FileText className="h-3 w-3 text-blue-500" />
                                        <span>Document</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="parcel">
                                      <div className="flex items-center gap-2">
                                        <Box className="h-3 w-3 text-green-500" />
                                        <span>Regular Parcel</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="fragile">
                                      <div className="flex items-center gap-2">
                                        <Shield className="h-3 w-3 text-orange-500" />
                                        <span>Fragile Items</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="electronics">
                                      <div className="flex items-center gap-2">
                                        <Cpu className="h-3 w-3 text-purple-500" />
                                        <span>Electronics</span>
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Package Weight - Full Width */}
                      <FormField
                        control={form.control}
                        name="productWeight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-foreground flex items-center gap-2">
                              <Weight className="h-4 w-4 text-orange-600" />
                              Package Weight
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="h-10 w-full bg-background border-border hover:border-primary/50 transition-colors focus:ring-2 focus:ring-primary/20">
                                  <SelectValue placeholder="Select weight range" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0-0.5">
                                    0 - 0.5 kg
                                  </SelectItem>
                                  <SelectItem value="0.5-1">
                                    0.5 - 1 kg
                                  </SelectItem>
                                  <SelectItem value="1-2">1 - 2 kg</SelectItem>
                                  <SelectItem value="2-5">2 - 5 kg</SelectItem>
                                  <SelectItem value="5+">5+ kg</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      {/* Route Display */}
                      {watchedValues.fromCity && watchedValues.toCity && (
                        <div className="flex items-center justify-center py-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-full">
                            <ArrowRight className="h-4 w-4 text-primary" />
                            <span className="font-medium capitalize">
                              {watchedValues.fromCity} → {watchedValues.toCity}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Calculate Button with Progress */}
                      <div className="space-y-3">
                        <Button
                          type="submit"
                          disabled={isCalculating}
                          className={cn(
                            "w-full h-11 text-sm font-medium transition-all duration-200",
                            "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary",
                            "shadow-md hover:shadow-lg hover:shadow-primary/25",
                            isCalculating && "animate-pulse"
                          )}
                        >
                          {isCalculating ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                              Calculating... {calculationProgress}%
                            </>
                          ) : (
                            <>
                              <Calculator className="mr-2 h-4 w-4" />
                              Calculate Delivery Cost
                            </>
                          )}
                        </Button>

                        {/* Progress Bar */}
                        {isCalculating && (
                          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${calculationProgress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Cost Display Card */}
                <Card
                  className={cn(
                    "bg-red-100/15 border-red-200/50 backdrop-blur-sm border-2 shadow-2xl shadow-black/5",
                    totalCost
                      ? "border-primary/20 shadow-lg shadow-primary/5"
                      : "border-border/50"
                  )}
                >
                  <CardContent className="p-6">
                    {totalCost ? (
                      <div className="text-center space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-3">
                          <div className="text-3xl font-bold text-primary">
                            ৳{totalCost}
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <Badge
                              variant="secondary"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Quote Ready
                            </Badge>
                            {estimatedTime && (
                              <Badge
                                variant="outline"
                                className="text-blue-600 border-blue-200"
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                {estimatedTime}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                          {watchedValues.fromCity && watchedValues.toCity && (
                            <div className="text-center">
                              <div className="text-xs text-muted-foreground mb-1">
                                Route
                              </div>
                              <div className="text-sm font-medium capitalize">
                                {watchedValues.fromCity} →{" "}
                                {watchedValues.toCity}
                              </div>
                            </div>
                          )}
                          {watchedValues.deliveryType && (
                            <div className="text-center">
                              <div className="text-xs text-muted-foreground mb-1">
                                Speed
                              </div>
                              <div className="flex items-center justify-center gap-1 text-sm font-medium">
                                {watchedValues.deliveryType === "normal" && (
                                  <Truck className="h-3 w-3" />
                                )}
                                {watchedValues.deliveryType === "express" && (
                                  <Zap className="h-3 w-3" />
                                )}
                                {watchedValues.deliveryType === "same-day" && (
                                  <Timer className="h-3 w-3" />
                                )}
                                <span className="capitalize">
                                  {watchedValues.deliveryType}
                                </span>
                              </div>
                            </div>
                          )}
                          {watchedValues.productType && (
                            <div className="text-center">
                              <div className="text-xs text-muted-foreground mb-1">
                                Type
                              </div>
                              <div className="flex items-center justify-center gap-1 text-sm font-medium">
                                {watchedValues.productType === "document" && (
                                  <FileText className="h-3 w-3" />
                                )}
                                {watchedValues.productType === "parcel" && (
                                  <Box className="h-3 w-3" />
                                )}
                                {watchedValues.productType === "fragile" && (
                                  <Shield className="h-3 w-3" />
                                )}
                                {watchedValues.productType ===
                                  "electronics" && <Cpu className="h-3 w-3" />}
                                <span className="capitalize">
                                  {watchedValues.productType}
                                </span>
                              </div>
                            </div>
                          )}
                          {watchedValues.productWeight && (
                            <div className="text-center">
                              <div className="text-xs text-muted-foreground mb-1">
                                Weight
                              </div>
                              <div className="text-sm font-medium">
                                {watchedValues.productWeight} kg
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-border/50 space-y-3">
                          <Button
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => {
                              // Handle booking logic here
                              alert(
                                `Booking for ৳${totalCost} - Feature coming soon!`
                              );
                            }}
                          >
                            <Package className="mr-2 h-4 w-4" />
                            Book This Delivery
                          </Button>
                          <div className="text-xs text-muted-foreground text-center">
                            * All charges included • No hidden fees
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-3 py-6">
                        <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Calculator className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-base font-medium text-foreground">
                            Ready to Calculate
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Fill in all fields and click calculate
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <Card className="bg-blue-50/50 border-blue-200/50">
                    <CardContent className="p-4 text-center">
                      <Truck className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-xs text-blue-600 font-medium">
                        Fast Delivery
                      </div>
                      <div className="text-xs text-blue-500">
                        Same day available
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50/50 border-green-200/50">
                    <CardContent className="p-4 text-center">
                      <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="text-xs text-green-600 font-medium">
                        Secure
                      </div>
                      <div className="text-xs text-green-500">
                        100% Safe delivery
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50/50 border-purple-200/50">
                    <CardContent className="p-4 text-center">
                      <MapPin className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-xs text-purple-600 font-medium">
                        Tracking
                      </div>
                      <div className="text-xs text-purple-500">
                        Real-time updates
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

