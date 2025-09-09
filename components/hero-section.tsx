"use client"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { useI18n } from "@/lib/i18n-provider"
import { Package, Clock, Shield, Truck } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const { user, signIn } = useAuth()
  const { t } = useI18n()

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    try {
      await signIn(provider)
    } catch (error) {
      console.error("Social login failed:", error)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/10 overflow-hidden">
      {/* Animated Truck Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="truck-animation absolute top-1/2 -translate-y-1/2 opacity-10">
          <Truck className="h-20 w-20 text-primary truck-shadow" />
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/delivery-truck-and-courier-service-background-patt.jpg')] bg-cover bg-center opacity-5" />

      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              {t("hero.title")} <span className="text-primary">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6">
                  {t("hero.dashboard")}
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6" onClick={() => handleSocialLogin("google")}>
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {t("hero.googleSignin")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-transparent"
                  onClick={() => handleSocialLogin("facebook")}
                >
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  {t("hero.facebookSignin")}
                </Button>
              </div>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg text-foreground">{t("features.fastDelivery")}</p>
                <p className="text-muted-foreground">{t("features.fastDeliveryDesc")}</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg text-foreground">{t("features.secure")}</p>
                <p className="text-muted-foreground">{t("features.secureDesc")}</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg text-foreground">{t("features.tracking")}</p>
                <p className="text-muted-foreground">{t("features.trackingDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
