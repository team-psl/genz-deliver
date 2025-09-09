import Link from "next/link"
import { Package, Facebook, Twitter, Instagram, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <span className="font-heading text-xl font-bold">Pathao Courier</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Fast, reliable, and affordable parcel delivery service across Dhaka. Your trusted delivery partner.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Book Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/track"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Track Parcel
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-primary-foreground/80">Same Day Delivery</li>
              <li className="text-primary-foreground/80">Express Delivery</li>
              <li className="text-primary-foreground/80">Standard Delivery</li>
              <li className="text-primary-foreground/80">Bulk Delivery</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-foreground/80" />
                <span className="text-primary-foreground/80">+880 1700-000000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-foreground/80" />
                <span className="text-primary-foreground/80">support@pathaocourier.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary-foreground/80 mt-0.5" />
                <span className="text-primary-foreground/80">
                  House 123, Road 45
                  <br />
                  Gulshan 2, Dhaka 1212
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80 text-sm">
            © 2024 Pathao Courier. All rights reserved. Built with ❤️ in Bangladesh.
          </p>
        </div>
      </div>
    </footer>
  )
}
