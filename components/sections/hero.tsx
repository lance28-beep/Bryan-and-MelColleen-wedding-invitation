"use client"

import { useEffect, useState } from "react"
import StarBorder from "@/components/ui/StarBorder"
import { siteConfig } from "@/content/site"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-center min-h-screen py-16 sm:py-20">
        {/* Main invitation card */}
        <StarBorder
          as="div"
          className={`w-full max-w-xl md:max-w-2xl relative rounded-[22px] sm:rounded-[26px] md:rounded-[30px] transition-all duration-700 ease-out overflow-hidden ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          color="#D4AF37"
          speed="5s"
        >
        <div
          className="h-full w-full rounded-[22px] sm:rounded-[26px] md:rounded-[30px] text-center px-6 sm:px-10 md:px-14 py-10 sm:py-12 md:py-14"
          style={{
            background: 'linear-gradient(135deg, #F7E7CE 0%, #EADBC8 50%, #F8D0B8 100%)',
            boxShadow: '0 0 0 1px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.15), 0 30px 90px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
          }}
        >
          {/* Elegant border — Soft Gold subtle accent */}
          <div 
            className="absolute inset-0 rounded-[22px] sm:rounded-[26px] md:rounded-[30px]"
            style={{
              padding: '1px',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0.15) 50%, rgba(212,175,55,0.3) 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          
          {/* Inner border for refinement */}
          <div className="absolute inset-[1px] rounded-[21px] sm:rounded-[25px] md:rounded-[29px] border border-[#D4AF37]/25" />
          
          {/* Content wrapper */}
          <div className="relative z-10">
            {/* Monogram */}
            <div className="mb-8 sm:mb-9 md:mb-10 flex justify-center">
              <div
                className="h-36 w-36 sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-48 lg:w-48"
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
                    "0 0 22px rgba(123, 63, 63, 0.65), 0 0 40px rgba(123, 63, 63, 0.45)",
                }}
              />
            </div>

            {/* Small intro text */}
            <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.32em] text-[#C68484] uppercase mb-6 sm:mb-7">
              Together with their families
            </p>

            {/* Names block */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-6 sm:mb-7 md:mb-8">
              {/* Groom */}
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl md:text-[3rem] leading-none font-[family-name:var(--font-crimson)] tracking-[0.2em] text-[#C68484] uppercase">
                 {siteConfig.couple.groomNickname}
                </p>
              </div>

              {/* AND */}
              <p className="text-[10px] sm:text-xs tracking-[0.3em] font-[family-name:var(--font-crimson)] text-[#C68484]/80 uppercase">
                and
              </p>

              {/* Bride */}
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl md:text-[3rem] leading-none font-[family-name:var(--font-crimson)] tracking-[0.2em] text-[#C68484] uppercase">
                  {siteConfig.couple.brideNickname}
                </p>
              </div>
            </div>

          {/* Invite line */}
          <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.32em] text-[#C68484] uppercase mb-6 sm:mb-7">
            warmly invite you to celebrate their marriage
          </p>

          {/* Fine divider — Soft Gold subtle accent */}
          <div className="mt-6 sm:mt-7 md:mt-8 mb-6 sm:mb-7 flex justify-center">
            <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          </div>

          {/* Invitation message */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 max-w-md mx-auto">
            <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#C68484]/95 leading-relaxed italic">
              With hearts full of love and joy,
              we invite you to join us for an intimate celebration
              as we unite our lives in marriage,
              placing God at the center of our union.
            </p>
            <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#C68484]/95 leading-relaxed italic">
              By His grace our paths have been woven together,
              and in His presence we vow to walk side by side,
              guided by faith, love, and devotion.
            </p>
            <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#C68484]/95 leading-relaxed italic">
              Your presence will be a blessing,
              adding warmth to a day that is both
              a celebration of love and a testimony of His goodness.
            </p>
          </div>
          </div>
          </div>
        </StarBorder>
      </div>
    </section>
  )
}
