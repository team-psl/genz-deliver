import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Shield, Package, Users, MapPin, Truck } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Same-day and express delivery options available nationwide.",
      color: "blue",
      bgColor: "bg-blue-50/80",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200/50",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Insured packages with guaranteed safe delivery protection.",
      color: "green",
      bgColor: "bg-green-50/80",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-200/50",
    },
    {
      icon: Package,
      title: "Live Tracking",
      description: "Real-time GPS updates and instant delivery notifications.",
      color: "purple",
      bgColor: "bg-purple-50/80",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200/50",
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs.",
      color: "orange",
      bgColor: "bg-orange-50/80",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200/50",
    },
    {
      icon: MapPin,
      title: "Wide Coverage",
      description: "Delivering across all major cities and towns nationwide.",
      color: "red",
      bgColor: "bg-red-50/80",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      borderColor: "border-red-200/50",
    },
    {
      icon: Truck,
      title: "Best Rates",
      description: "Competitive pricing with transparent, no hidden fees.",
      color: "indigo",
      bgColor: "bg-indigo-50/80",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      borderColor: "border-indigo-200/50",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Why Choose Our <span className="text-primary">Courier Service</span>?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Reliable, fast, and secure parcel delivery with features designed for seamless shipping experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative p-6 rounded-2xl ${feature.bgColor} ${feature.borderColor} border backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
