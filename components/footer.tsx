import Link from "next/link"
import { Phone, Mail } from "lucide-react"
import BrandLogo from "./brand-logo"

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-secondary/80 via-secondary to-secondary/90 text-secondary-foreground">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full translate-y-16 -translate-x-16"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/5 rounded-full"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <BrandLogo className="w-[140px]" mode="light" />
            </Link>
            <p className="text-secondary-foreground/80 text-sm leading-relaxed max-w-sm">
              Fast, reliable, and affordable courier service across Bangladesh. Your trusted delivery partner.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-secondary-foreground">Quick Access</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="#track-section" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                Track Order
              </a>
              <a href="#calculate-section" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                Calculate Price
              </a>
              <Link href="/dashboard/orders/new" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                Book Now
              </Link>
              <a href="#faq-section" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                FAQ
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-secondary-foreground">Get in Touch</h3>
            <div className="space-y-3">
              <a 
                href="tel:09610003030" 
                className="flex items-center gap-3 text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span>09610 003030</span>
              </a>
              
              <a 
                href="mailto:support@courier.com" 
                className="flex items-center gap-3 text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span>support@courier.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-secondary-foreground/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/70">
            <p>© 2025 Courier Service. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-secondary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-secondary-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
