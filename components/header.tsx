"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/language-toggle"
import { Menu, X, Package  } from "lucide-react"
import BrandLogo from "./brand-logo"
import GenZLogo from "./genz-logo"

// Menu item type definition
interface MenuItem {
  id: string
  label: string
  href: string
}

// Menu items configuration
const menuItems: MenuItem[] = [
  {
    id: "track",
    label: "Track Order",
    href: "#track-section"
  },
  {
    id: "calculate",
    label: "Calculate Price", 
    href: "#calculate-section"
  },
  {
    id: "faq",
    label: "FAQ",
    href: "#faq-section"
  }
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto flex h-18 items-center justify-between px-4">
          {/* Left Side - Logo & Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              {/* <BrandLogo className="w-[125px]" mode="light" /> */}
              <GenZLogo className="w-[125px]" mode="light" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Side - CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Phone Number - Desktop */}
            <a 
              href="tel:09610003030" 
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              09610 003030
            </a>
            
            {/* Separator */}
            <div className="h-4 w-px bg-border"></div>
            
            {/* href="/dashboard/orders/new" */}
            <LanguageToggle />
            <Link
              href="/login"
              className="inline-flex items-center bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full font-medium transition-all duration-200 hover:shadow-lg text-sm"
            >
              <Package className="h-4 w-4 mr-2" />
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button & Helper */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Helper Phone Link - Mobile */}
            <a 
              href="tel:09610003030" 
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <svg className="w-5 h-5 text-foreground hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </a>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <nav className="container mx-auto px-4 py-6 space-y-6">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}

              <div className="border-t pt-4 space-y-4">
                {/* Phone Number */}
                <a 
                  href="tel:09610003030" 
                  className="flex items-center justify-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  09610003030
                </a>
                
                <div className="flex items-center justify-center">
                  <LanguageToggle />
                </div>
                <Link
                  href="/dashboard/orders/new"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full inline-flex justify-center items-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-medium py-3 px-6 text-sm"
                >
                  Book Now
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
      <div className="h-18"></div>
    </>
  );
}
