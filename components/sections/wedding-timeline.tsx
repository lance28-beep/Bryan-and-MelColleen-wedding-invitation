"use client"

import { Heart } from "lucide-react"
import Image from "next/image"
import StarBorder from "@/components/ui/StarBorder"

interface TimelineEvent {
  time: string
  event: string
  image?: string
  Icon?: React.ComponentType<{ className?: string }>
}

const timelineEvents: TimelineEvent[] = [
  { time: "4:00 PM", event: "Guest Arrival & Fellowship", image: "/TimelineImage/arrivalimage.png" },
  { time: "4:30 PM", event: "Ceremony Begins", image: "/TimelineImage/WeddingCeremony.png" },
  { time: "6:00 PM", event: "Early Dinner & Celebration", image: "/TimelineImage/DinnerTime.png" },
  { time: "8:00 PM", event: "Closing Blessings & Fond Farewell", image: "/TimelineImage/ext.png" },
]

export function WeddingTimeline() {
  return (
    <section
      id="timeline"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden bg-transparent"
    >
      {/* Section Header — soft dark overlay for white text readability */}
      <div className="relative z-10 text-center mb-6 sm:mb-10 md:mb-12 px-3 sm:px-4 md:px-6">
        <div className="relative max-w-xl mx-auto rounded-2xl py-6 sm:py-8 px-6 sm:px-8" style={{ background: "rgba(0,0,0,0.3)" }}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-semibold text-white mb-3 sm:mb-4 md:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
            Wedding Program Flow
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-white font-light max-w-xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
            Join us throughout the day
          </p>
        </div>
      </div>

      {/* Central Card Container - same dark card as Entourage */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        <StarBorder
          as="div"
          className="relative group w-full"
          color="#D4AF37"
          speed="5s"
        >
          <div
            className="relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #F7E7CE 0%, #EADBC8 50%, #F8D0B8 100%)',
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

            <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl border border-[#D4AF37]/40 group-hover:border-[#D4AF37]/60 transition-colors z-0" />

            {/* Card content */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
              {/* Timeline Events */}
              <div className="relative">
                <div className="absolute left-8 sm:left-10 md:left-12 lg:left-16 xl:left-[4.5rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37]/30 via-[#D4AF37]/50 to-[#D4AF37]/30 hidden sm:block" />

                <div className="space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12">
                  {timelineEvents.map((item, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
                        <div className="flex-shrink-0 relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36">
                          {item.Icon ? (
                            <item.Icon className="w-full h-full text-[#C68484]" />
                          ) : item.image ? (
                            <Image
                              src={item.image}
                              alt={item.event}
                              width={96}
                              height={96}
                              className="w-full h-full object-contain opacity-90"
                            />
                          ) : null}
                        </div>

                        <div className="flex-1 pt-1 sm:pt-2 md:pt-3 lg:pt-4">
                          <div className="mb-2 sm:mb-3 md:mb-4">
                            <span className="inline-block text-[10px] sm:text-xs md:text-sm lg:text-base font-[family-name:var(--font-crimson)] font-semibold text-[#C68484] uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] bg-[#EADBC8]/80 px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full border border-[#D4AF37]/40">
                              {item.time}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-[family-name:var(--font-crimson)] font-normal text-[#7A3E3E] leading-tight">
                            {item.event}
                          </h3>
                        </div>
                      </div>

                      {index < timelineEvents.length - 1 && (
                        <div className="absolute left-8 top-20 sm:hidden w-0.5 h-6 bg-gradient-to-b from-[#D4AF37]/30 to-[#D4AF37]/50" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 my-8 sm:my-10 md:my-12 lg:my-16 xl:my-20">
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                <div className="w-1.5 h-1.5 bg-[#D4AF37]/50 rounded-full" />
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#C68484]" fill="currentColor" />
                <div className="w-1.5 h-1.5 bg-[#D4AF37]/50 rounded-full" />
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
              </div>

              {/* Thank you message - quote style */}
              <div className="relative rounded-lg sm:rounded-xl border border-[#D4AF37]/30 bg-[#EADBC8]/60 p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">

                <blockquote className="relative max-w-lg mx-auto text-center">
                  <div className="space-y-4 sm:space-y-6 font-[family-name:var(--font-crimson)] font-light text-[#7A3E3E] text-sm sm:text-base md:text-lg leading-relaxed tracking-wide">
                    <p className="italic">With grateful hearts before Him, we begin our forever.</p>
                    <div className="pt-2 sm:pt-4 border-t border-[#D4AF37]/40 max-w-[200px] mx-auto" />
                    <p className="not-italic font-normal">
                      &ldquo;Love bears all things, believes all things, hopes all things, endures all things.&rdquo;
                    </p>
                    <p className="text-xs sm:text-sm text-[#C68484] uppercase tracking-widest mt-1">— 1 Corinthians 13:7</p>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </StarBorder>
      </div>
    </section>
  )
}
