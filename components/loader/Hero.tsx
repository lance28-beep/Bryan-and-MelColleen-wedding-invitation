"use client"

import { useEffect, useState } from "react"
interface HeroProps {
  onOpen: () => void
  visible: boolean
}

const BACKGROUND_VIDEO_SRC =
  "/background_music/Simple wedding peach blossom  Background Video - Video Effects (1080p, h264).mp4"

export function Hero({ onOpen, visible }: HeroProps) {
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setContentVisible(true), 300)
      return () => clearTimeout(t)
    }
    setContentVisible(false)
  }, [visible])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        visible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      {/* Background video — loop, muted for autoplay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        >
          <source src={encodeURI(BACKGROUND_VIDEO_SRC)} type="video/mp4" />
        </video>
        {/* Gradient overlays — warm champagne/dusty rose tint for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(247,231,206,0.25), rgba(198,132,132,0.55))",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(234,219,200,0.3) 100%)",
          }}
        />
      </div>

      {/* Content — aligned with sections/hero typography */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-md mx-auto h-full">
        {/* Monogram — same asset and style as sections/hero */}
        <div
          className={`mb-auto mt-8 transition-all duration-1000 ease-out ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
            <div
              className="h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 drop-shadow-lg"
              style={{
                background: "linear-gradient(135deg, #C68484 0%, #F6C1C7 100%)",
                maskImage: 'url("/monogram/monogram.png")',
                WebkitMaskImage: 'url("/monogram/monogram.png")',
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col items-center justify-end w-full gap-5 sm:gap-6 pb-14 sm:pb-16 md:pb-20">
          <h2
            className={`text-6xl md:text-8xl transform -rotate-6 transition-all duration-1000 ease-out delay-200 ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontWeight: 400,
              color: "#F7E7CE",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            You are
          </h2>

          <h1
            className={`text-5xl md:text-7xl font-bold tracking-wider uppercase transition-all duration-1000 ease-out delay-300 text-[#C68484] ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              letterSpacing: "0.05em",
            }}
          >
            Invited!
          </h1>

          <button
            type="button"
            onClick={onOpen}
            className={`px-10 py-4 text-sm font-[family-name:var(--font-crimson)] tracking-[0.2em] uppercase rounded-sm border border-[#D4AF37]/50 bg-[#C68484] text-[#F7E7CE] transition-all duration-500 delay-500 hover:bg-[#F6C1C7] hover:border-[#F8D0B8]/70 active:scale-[0.98] ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Open Invitation
          </button>
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
