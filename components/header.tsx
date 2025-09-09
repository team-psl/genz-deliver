"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuthDialog } from "@/components/auth-dialog"
import { UserMenu } from "@/components/user-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useAuth } from "@/lib/auth"
import { useI18n } from "@/lib/i18n-provider"
import { Menu, X, Package } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">Pathao Courier</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t("header.home")}
          </Link>
          <Link href="/track" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t("header.track")}
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t("header.pricing")}
          </Link>
          <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t("header.contact")}
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          <LanguageToggle />
          {user ? (
            <UserMenu />
          ) : (
            <>
              <AuthDialog>
                <Button variant="outline" size="sm">
                  {t("header.signin")}
                </Button>
              </AuthDialog>
              <Link href="/book">
                <Button size="sm">{t("header.booknow")}</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link href="/" className="block text-sm font-medium text-foreground hover:text-primary">
              {t("header.home")}
            </Link>
            <Link href="/track" className="block text-sm font-medium text-foreground hover:text-primary">
              {t("header.track")}
            </Link>
            <Link href="/pricing" className="block text-sm font-medium text-foreground hover:text-primary">
              {t("header.pricing")}
            </Link>
            <Link href="/contact" className="block text-sm font-medium text-foreground hover:text-primary">
              {t("header.contact")}
            </Link>
            <div className="flex items-center space-x-2 pt-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
            <div className="flex flex-col space-y-2 pt-4">
              {user ? (
                <UserMenu />
              ) : (
                <>
                  <AuthDialog>
                    <Button variant="outline" size="sm">
                      {t("header.signin")}
                    </Button>
                  </AuthDialog>
                  <Link href="/book">
                    <Button size="sm">{t("header.booknow")}</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
