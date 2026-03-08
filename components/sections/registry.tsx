"use client";

import { Section } from "@/components/section";
import { Heart } from "lucide-react";

export function Registry() {
  return (
    <Section
      id="registry"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Section Header — soft dark overlay for white text readability */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <div className="relative max-w-xl mx-auto rounded-2xl py-6 sm:py-8 px-6 sm:px-8" style={{ background: "rgba(0,0,0,0.3)" }}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-semibold text-white mb-4 sm:mb-6 uppercase tracking-[0.12em] sm:tracking-[0.15em]" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
            Gift Registry
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-white font-light max-w-xl mx-auto leading-relaxed tracking-wide px-4" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
            Your presence is the greatest gift we could ask for
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="relative group">
          <div
            className="relative rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-14 transition-all duration-300 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #F7E7CE 0%, #EADBC8 50%, #F8D0B8 100%)",
              boxShadow:
                "0 0 0 1px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#F7E7CE] via-[#EADBC8] to-[#F8D0B8] z-0" />
            <div
              className="absolute inset-0 opacity-60 z-0"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(246,193,199,0.15) 0%, transparent 70%)",
              }}
            />
            <div className="absolute inset-0 border border-[#D4AF37]/40 rounded-xl sm:rounded-2xl z-0" />

            <div className="relative z-10 flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-10">
              {/* Heart icon */}
              <div className="bg-[#EADBC8]/80 p-2.5 sm:p-3 rounded-full shadow-lg border border-[#D4AF37]/30">
                <Heart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#C68484]" />
              </div>

              {/* Main message */}
              <div className="text-center space-y-5 sm:space-y-6 max-w-2xl">
                {/* First message */}
                <div>
                  <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                    <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                    <div className="w-1.5 h-1.5 bg-[#C68484]/60 rounded-full" />
                    <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                  </div>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-crimson)] font-light text-[#C68484] leading-relaxed tracking-wide">
                    Your presence at our wedding is the most treasured blessing.
                  </p>
                </div>

                {/* Second message */}
                <div>
                  <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-light text-[#7A3E3E] leading-relaxed tracking-wide">
                    Should you wish to honor us with a gift, a monetary blessing
                    toward our future together would be sincerely appreciated.
                  </p>
                  <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6">
                    <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                    <div className="w-1.5 h-1.5 bg-[#C68484]/60 rounded-full" />
                    <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
