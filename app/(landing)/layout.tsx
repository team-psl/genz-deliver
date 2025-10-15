import type React from "react"
// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20 flex flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  )
}
