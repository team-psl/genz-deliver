"use client"

import type * as React from "react"
import { createContext, useContext, useState } from "react"

type Language = "en" | "bn"

type Translations = {
  [key: string]: {
    en: string
    bn: string
  }
}

const translations: Translations = {
  // Header
  "header.home": { en: "Home", bn: "হোম" },
  "header.track": { en: "Track Parcel", bn: "পার্সেল ট্র্যাক করুন" },
  "header.pricing": { en: "Pricing", bn: "মূল্য" },
  "header.contact": { en: "Contact Us", bn: "যোগাযোগ" },
  "header.signin": { en: "Sign In", bn: "সাইন ইন" },
  "header.booknow": { en: "Book Now", bn: "এখনই বুক করুন" },

  // Hero Section
  "hero.title": { en: "Fast, Reliable", bn: "দ্রুত, নির্ভরযোগ্য" },
  "hero.titleHighlight": { en: "Parcel Delivery", bn: "পার্সেল ডেলিভারি" },
  "hero.subtitle": {
    en: "Send your parcels anywhere in the city with Pathao Courier. Track in real-time, affordable pricing, and 24/7 customer support.",
    bn: "পাঠাও কুরিয়ারের সাথে শহরের যেকোনো জায়গায় আপনার পার্সেল পাঠান। রিয়েল-টাইম ট্র্যাকিং, সাশ্রয়ী মূল্য এবং ২৪/৭ গ্রাহক সহায়তা।",
  },
  "hero.googleSignin": { en: "Sign in with Google", bn: "গুগল দিয়ে সাইন ইন করুন" },
  "hero.facebookSignin": { en: "Sign in with Facebook", bn: "ফেসবুক দিয়ে সাইন ইন করুন" },
  "hero.dashboard": { en: "Go to Dashboard", bn: "ড্যাশবোর্ডে যান" },

  // Features
  "features.fastDelivery": { en: "Fast Delivery", bn: "দ্রুত ডেলিভারি" },
  "features.fastDeliveryDesc": { en: "Same day delivery available", bn: "একই দিনে ডেলিভারি উপলব্ধ" },
  "features.secure": { en: "100% Secure", bn: "১০০% নিরাপদ" },
  "features.secureDesc": { en: "Safe and reliable delivery", bn: "নিরাপদ এবং নির্ভরযোগ্য ডেলিভারি" },
  "features.tracking": { en: "Real-time Tracking", bn: "রিয়েল-টাইম ট্র্যাকিং" },
  "features.trackingDesc": { en: "Track your parcel live", bn: "আপনার পার্সেল লাইভ ট্র্যাক করুন" },

  // Dashboard
  "dashboard.title": { en: "Dashboard", bn: "ড্যাশবোর্ড" },
  "dashboard.welcome": { en: "Welcome back", bn: "স্বাগতম" },
  "dashboard.createOrder": { en: "Create New Order", bn: "নতুন অর্ডার তৈরি করুন" },
  "dashboard.totalOrders": { en: "Total Orders", bn: "মোট অর্ডার" },
  "dashboard.delivered": { en: "Delivered", bn: "ডেলিভার হয়েছে" },
  "dashboard.inTransit": { en: "In Transit", bn: "পথে আছে" },
  "dashboard.pending": { en: "Pending", bn: "অপেক্ষমাণ" },
  "dashboard.recentOrders": { en: "Recent Orders", bn: "সাম্প্রতিক অর্ডার" },
  "dashboard.searchOrders": { en: "Search orders...", bn: "অর্ডার খুঁজুন..." },

  // Order Form
  "order.title": { en: "Create New Order", bn: "নতুন অর্ডার তৈরি করুন" },
  "order.subtitle": {
    en: "Fill in the details to create a new delivery order",
    bn: "নতুন ডেলিভারি অর্ডার তৈরি করতে বিস্তারিত পূরণ করুন",
  },
  "order.recipientDetails": { en: "Recipient Details", bn: "প্রাপকের বিবরণ" },
  "order.deliveryDetails": { en: "Delivery Details", bn: "ডেলিভারির বিবরণ" },
  "order.recipientPhone": { en: "Recipient's Phone", bn: "প্রাপকের ফোন" },
  "order.recipientSecondaryPhone": { en: "Recipient's Secondary Phone", bn: "প্রাপকের দ্বিতীয় ফোন" },
  "order.recipientName": { en: "Recipient's Name", bn: "প্রাপকের নাম" },
  "order.recipientAddress": { en: "Recipient's Address", bn: "প্রাপকের ঠিকানা" },
  "order.deliveryArea": { en: "Delivery Area", bn: "ডেলিভারি এলাকা" },
  "order.specialInstructions": { en: "Special Instructions", bn: "বিশেষ নির্দেশনা" },
  "order.deliveryType": { en: "Delivery Type", bn: "ডেলিভারির ধরন" },
  "order.totalWeight": { en: "Total Weight", bn: "মোট ওজন" },
  "order.quantity": { en: "Quantity", bn: "পরিমাণ" },
  "order.amountToCollect": { en: "Amount to Collect", bn: "সংগ্রহ করার পরিমাণ" },
  "order.itemDescription": { en: "Item Description & Price", bn: "পণ্যের বিবরণ ও দাম" },
  "order.createOrder": { en: "Create Order", bn: "অর্ডার তৈরি করুন" },

  // Common
  "common.loading": { en: "Loading...", bn: "লোড হচ্ছে..." },
  "common.search": { en: "Search", bn: "খুঁজুন" },
  "common.cancel": { en: "Cancel", bn: "বাতিল" },
  "common.save": { en: "Save", bn: "সংরক্ষণ" },
  "common.edit": { en: "Edit", bn: "সম্পাদনা" },
  "common.delete": { en: "Delete", bn: "মুছুন" },
}

type I18nProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
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
  const [language, setLanguage] = useState<Language>(
    () => (localStorage?.getItem("pathao-language") as Language) || defaultLanguage,
  )

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  const value = {
    language,
    setLanguage: (language: Language) => {
      localStorage?.setItem("pathao-language", language)
      setLanguage(language)
    },
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
