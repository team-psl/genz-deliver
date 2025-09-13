"use client"

import type * as React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Import JSON translations
import enTranslations from "./translations/en.json"
import bnTranslations from "./translations/bn.json"

type Language = "en" | "bn"

type TranslationData = Record<string, any>

// Helper function to get nested translation value
const getNestedTranslation = (obj: TranslationData, path: string): string => {
  const result = path.split('.').reduce((current: any, key: string) => {
    return current?.[key]
  }, obj)
  return typeof result === 'string' ? result : path
}

type I18nProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
}

// Create translations map
const translations = {
  en: enTranslations,
  bn: bnTranslations,
}

type I18nProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const initialState: I18nProviderState = {
  language: "en",
  setLanguage: () => null,
  t: () => "",
}

const I18nProviderContext = createContext<I18nProviderState>(initialState)

export function I18nProvider({ children, defaultLanguage = "en", ...props }: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydrate from localStorage after component mounts
  useEffect(() => {
    const storedLanguage = localStorage?.getItem("pathao-language") as Language
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "bn")) {
      setLanguage(storedLanguage)
    }
    setIsHydrated(true)
  }, [])

  const t = (key: string): string => {
    const currentTranslations = translations[language]
    return getNestedTranslation(currentTranslations, key)
  }

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    if (typeof window !== "undefined") {
      localStorage?.setItem("pathao-language", newLanguage)
    }
  }

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
  }

  return (
    <I18nProviderContext.Provider {...props} value={value}>
      {children}
    </I18nProviderContext.Provider>
  )
}

export const useI18n = () => {
  const context = useContext(I18nProviderContext)

  if (context === undefined) throw new Error("useI18n must be used within an I18nProvider")

  return context
}
