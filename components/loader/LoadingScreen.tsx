"use client"

import React, { useEffect, useState } from "react"
interface LoadingScreenProps {
  onComplete: () => void
}

// Wedding date: April 19, 2026 → 04 19 26
const GHOST_NUMBERS = ["04", "19", "26"]
const COUPLE_NAMES = { groom: "Bryan", bride: "Colleen" }

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)
  const [monogramVisible, setMonogramVisible] = useState(false)
  const [nameVisible, setNameVisible] = useState(false)
  const [supportVisible, setSupportVisible] = useState(false)
  const [progressVisible, setProgressVisible] = useState(false)

  useEffect(() => {
    const t0 = setTimeout(() => setMonogramVisible(true), 80)
    const t1 = setTimeout(() => setNameVisible(true), 280)
    const t2 = setTimeout(() => setSupportVisible(true), 540)
    const t3 = setTimeout(() => setProgressVisible(true), 740)
    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 2
      })
    }, 160)

    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onComplete, 500)
    }, 8000)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-500 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading invitation"
    >
      {/* Champagne Glow → Soft Beige gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #F7E7CE 0%, #EADBC8 100%)",
        }}
      />

      {/* Ghosted background numbers — decorative, Peach Whisper */}
      <div
        className="absolute inset-0 pointer-events-none flex flex-col items-end justify-center pr-6 sm:pr-10 md:pr-14 lg:pr-20 gap-0 select-none"
        aria-hidden
      >
        {GHOST_NUMBERS.map((num, i) => (
          <span
            key={num}
            className="text-[7rem] sm:text-[9rem] md:text-[11rem] lg:text-[13rem] font-bold leading-[0.85] transition-opacity duration-1000 ease-out"
            style={{
              fontFamily: "var(--font-crimson)",
              color: "rgba(248, 208, 184, 0.4)",
              letterSpacing: "-0.03em",
              opacity: nameVisible ? 1 : 0,
              transitionDelay: `${i * 80}ms`,
            }}
          >
            {num}
          </span>
        ))}
      </div>

      {/* Main content — centered */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6 sm:px-8 md:px-10 text-center">
        {/* Monogram — top */}
        <div
          className={`mb-8 sm:mb-10 transition-all duration-700 ease-out flex justify-center ${
            monogramVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div
            className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36"
            style={{
              backgroundColor: "#7B3F3F",
              maskImage: 'url("/monogram/newMonogramv2.png")',
              WebkitMaskImage: 'url("/monogram/newMonogramv2.png")',
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              boxShadow:
                "0 0 18px rgba(123, 63, 63, 0.7), 0 0 32px rgba(123, 63, 63, 0.5)",
            }}
          />
        </div>

        {/* Names — staggered entrance */}
        <h1
          className={`transition-all duration-700 ease-out mb-3 sm:mb-4 ${
            nameVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] text-[#C68484] uppercase font-[family-name:var(--font-crimson)]">
            {COUPLE_NAMES.groom}
          </span>
          <span className="text-2xl sm:text-3xl md:text-4xl mx-2 font-[family-name:var(--font-ephesis)] font-normal text-[#F6C1C7]">
            &amp;
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] text-[#C68484] uppercase font-[family-name:var(--font-crimson)]">
            {COUPLE_NAMES.bride}
          </span>
        </h1>

        {/* Supporting line */}
        <p
          className={`text-[10px] sm:text-xs tracking-[0.3em] text-[#C68484] uppercase mb-12 sm:mb-14 font-[family-name:var(--font-crimson)] transition-all duration-600 ease-out ${
            supportVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          Together with their families
        </p>

        {/* Loading + progress — staggered */}
        <div
          className={`transition-all duration-600 ease-out ${
            progressVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-xs sm:text-sm tracking-[0.22em] text-[#C68484] uppercase mb-5 sm:mb-6 font-[family-name:var(--font-crimson)]">
            Preparing your invitation
          </p>

          {/* Progress bar — track: Soft Beige, fill: Dusty Rose, subtle gold accent */}
          <div className="w-full max-w-[220px] mx-auto mb-3">
            <div
              className="h-0.5 sm:h-1 rounded-full overflow-hidden border border-[#D4AF37]/30"
              style={{ backgroundColor: "rgba(234, 219, 200, 0.8)" }}
              role="presentation"
            >
              <div
                className="h-full rounded-full transition-all duration-300 ease-out min-w-[2px]"
                style={{
                  width: `${Math.max(progress, 2)}%`,
                  backgroundColor: "#C68484",
                }}
              />
            </div>
          </div>
          <p
            className="text-[10px] sm:text-xs tracking-[0.25em] text-[#C68484] font-[family-name:var(--font-crimson)] tabular-nums"
            aria-live="polite"
          >
            {progress}%
          </p>
        </div>
      </div>
    </div>
  )
}
