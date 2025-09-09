import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Shield, Package } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: "Real-Time Tracking",
      description: "Track your parcel every step of the way with live GPS updates and delivery notifications.",
    },
    {
      icon: Shield,
      title: "Affordable Pricing",
      description: "Competitive rates with transparent pricing. No hidden fees, just honest delivery costs.",
    },
    {
      icon: Package,
      title: "24/7 Customer Support",
      description: "Our dedicated support team is available round the clock to assist with your deliveries.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Pathao Courier?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide reliable, fast, and secure parcel delivery services across the city with features designed for
            your convenience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
