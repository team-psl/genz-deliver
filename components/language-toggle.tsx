"use client"
import { Languages } from "lucide-react"
import { useI18n } from "@/lib/i18n-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const { language, setLanguage } = useI18n()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Button variant="outline" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          <span className="text-xs">{language === "en" ? "EN" : "বাং"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-50 min-w-[120px] bg-background border border-border shadow-md">
        <DropdownMenuItem 
          onClick={() => setLanguage("en")}
          className="cursor-pointer hover:bg-accent"
        >
          <span className="mr-2">🇺🇸</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("bn")}
          className="cursor-pointer hover:bg-accent"
        >
          <span className="mr-2">🇧🇩</span>
          বাংলা
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
