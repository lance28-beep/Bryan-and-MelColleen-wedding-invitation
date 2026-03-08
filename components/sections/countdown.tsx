"use client"

import { useEffect, useState } from "react"
import { Section } from "@/components/section"
import Counter from "@/components/counter"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target: April 19, 2026 at 4:30 PM GMT+8
      // Compute using UTC to avoid timezone parsing inconsistencies across browsers
      // 4:30 PM GMT+8 == 8:30 AM UTC
      const targetDate = Date.UTC(2026, 3, 19, 8, 30, 0) // April is month 3 (0-indexed)
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // Wedding has passed or is happening now
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      {/* Solid card — Soft Beige 95%, soft gold border, gentle shadow */}
      <div className="relative group">
        <div 
          className="relative rounded-lg sm:rounded-xl px-2.5 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 transition-all duration-300 min-w-[60px] sm:min-w-[70px] md:min-w-[85px] lg:min-w-[95px] overflow-hidden"
          style={{
            background: 'rgba(234, 219, 200, 0.95)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
          }}
        >
          {/* Counter — darker romantic tone for readability */}
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={value >= 100 ? [100, 10, 1] : [10, 1]}
              fontSize={28}
              padding={4}
              gap={2}
              textColor="#7A3E3E"
              fontWeight={700}
              borderRadius={6}
              horizontalPadding={3}
              gradientHeight={0}
              gradientFrom="transparent"
              gradientTo="transparent"
            />
          </div>
        </div>
      </div>

      {/* Compact label - white for readability on dark section background */}
      <span
        className="text-[10px] sm:text-xs font-[family-name:var(--font-crimson)] font-semibold text-white uppercase tracking-wide"
        style={{ letterSpacing: '2px', textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}
      >
        {label}
      </span>
    </div>
  )

  return (
    <Section
      id="countdown"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Soft dark overlay for contrast — 25–35% opacity */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          background: 'rgba(0, 0, 0, 0.28)',
        }}
        aria-hidden
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
        </div>
        <h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-semibold text-white mb-4 sm:mb-6 uppercase tracking-[0.12em] sm:tracking-[0.15em]"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)', letterSpacing: '2px' }}
        >
          Countdown to Our Special Day
        </h2>
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
        </div>
        <p
          className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-white font-light max-w-xl mx-auto leading-relaxed px-2"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)', letterSpacing: '2px' }}
        >
          Every moment brings us closer to forever
        </p>
      </div>

      {/* Main countdown container - Compact for mobile */}
      <div className="relative z-10">
        <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-10 sm:mb-14 md:mb-18 px-3 sm:px-4">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Wedding date presentation */}
        <div className="flex justify-center px-3 sm:px-4 md:px-6">
          <div className="max-w-xl w-full">
              {/* Save The Date Header */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]/60" />
                  <div className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full" />
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]/60" />
                </div>
                <p
                  className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold text-white uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-3 sm:mb-4"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)', letterSpacing: '2px' }}
                >
                  Save The Date
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]/60" />
                  <div className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full" />
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]/60" />
                </div>
              </div>

              {/* Date Section */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <div className="mb-3 sm:mb-4 md:mb-5">
                  <p
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-ephesis)] text-white leading-none"
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
                  >
                    April
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-5 sm:mb-6">
                  <p
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-crimson)] font-semibold text-white leading-none"
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
                  >
                    19
                  </p>
                  <div className="h-10 sm:h-12 md:h-16 lg:h-20 w-[2px] bg-gradient-to-b from-[#D4AF37]/50 via-[#D4AF37]/70 to-[#D4AF37]/50" />
                  <p
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-crimson)] font-semibold text-white leading-none"
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
                  >
                    2026
                  </p>
                </div>
              </div>

              {/* Time Section */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]/60" />
                  <div className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full" />
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]/60" />
                </div>
                <p
                  className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-semibold text-white tracking-wide mb-3 sm:mb-4"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)', letterSpacing: '2px' }}
                >
                  4:30 PM
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]/60" />
                  <div className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full" />
                  <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]/60" />
                </div>
              </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
