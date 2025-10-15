"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const targetDate = new Date("November 1, 2025 00:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
        setIsExpired(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsExpired(true)
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-12">
          {/* Main Title */}
          <div className="space-y-6">
            <h1 className="font-heading text-4xl md:text-6xl lg:text-8xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
              Something is
              <br />
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Coming
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              November 1st, 2025
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-emerald-100/80 via-teal-50/60 to-cyan-100/80 dark:from-emerald-900/30 dark:via-teal-900/20 dark:to-cyan-900/30 border-emerald-200/50 dark:border-emerald-700/30 shadow-2xl backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                {isExpired ? (
                  <div className="text-center space-y-4">
                    <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                      🎉 It's Here! 🎉
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                      Something amazing has arrived!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {/* Days */}
                    <div className="text-center space-y-2">
                      <div className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl p-4 md:p-6 shadow-lg shadow-emerald-500/25">
                        {timeLeft.days.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                        Days
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="text-center space-y-2">
                      <div className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-2xl p-4 md:p-6 shadow-lg shadow-teal-500/25">
                        {timeLeft.hours.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                        Hours
                      </div>
                    </div>

                    {/* Minutes */}
                    <div className="text-center space-y-2">
                      <div className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-cyan-500 to-emerald-500 text-white rounded-2xl p-4 md:p-6 shadow-lg shadow-cyan-500/25">
                        {timeLeft.minutes.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                        Minutes
                      </div>
                    </div>

                    {/* Seconds */}
                    <div className="text-center space-y-2">
                      <div className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-emerald-400 to-teal-400 text-white rounded-2xl p-4 md:p-6 shadow-lg shadow-emerald-400/25">
                        {timeLeft.seconds.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                        Seconds
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
