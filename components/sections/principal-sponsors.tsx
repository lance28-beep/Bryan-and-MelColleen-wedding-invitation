"use client"

import React from "react"
import { useEffect, useMemo, useState } from "react"
import { Section } from "@/components/section"
import { Loader2, Users } from "lucide-react"
import StarBorder from "@/components/ui/StarBorder"

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

export function PrincipalSponsors() {
  // Helper component for name items with alignment
  const NameItem = ({ name, align = "center" }: { name: string, align?: "left" | "center" | "right" }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`flex flex-col ${containerAlign} justify-center py-0.5 sm:py-1 md:py-1.5 w-full`}>
        <p className={`text-[#7A3E3E] text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-medium leading-tight sm:leading-snug break-words ${textAlign}`}>{name}</p>
      </div>
    )
  }

  // Remote data state
  const [sponsors, setSponsors] = useState<PrincipalSponsor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSponsors = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/principal-sponsor", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load principal sponsors")
      const data: PrincipalSponsor[] = await res.json()
      setSponsors(data)
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load principal sponsors")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSponsors()

    // Set up auto-refresh listener for dashboard updates
    const handleSponsorsUpdate = () => {
      setTimeout(() => {
        fetchSponsors()
      }, 1000)
    }

    window.addEventListener("sponsorsUpdated", handleSponsorsUpdate)

    return () => {
      window.removeEventListener("sponsorsUpdated", handleSponsorsUpdate)
    }
  }, [])

  // Keep sponsors as pairs to ensure alignment
  const sponsorPairs = useMemo(() => 
    sponsors.filter(s => s.MalePrincipalSponsor || s.FemalePrincipalSponsor),
    [sponsors]
  )

  return (
    <Section
      id="sponsors"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20"
    >
      {/* Header — soft dark overlay for white text readability */}
      <div className="relative z-10 text-center mb-6 sm:mb-10 md:mb-12 px-3 sm:px-4 md:px-6">
        <div className="relative max-w-2xl mx-auto rounded-2xl py-6 sm:py-8 px-6 sm:px-8" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-semibold text-white mb-3 sm:mb-4 md:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
            Godparents of Marriage
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-white font-light max-w-2xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
            With deep appreciation, we honor our Godparents of Marriage, who will stand beside us as guiding figures, offering wisdom, prayers, and love as we begin this journey together.
          </p>
        </div>
      </div>

      {/* Central Card Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Main card with elegant styling */}
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
              boxShadow: '0 0 0 1px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#F7E7CE] via-[#EADBC8] to-[#F8D0B8] z-0" />
            <div 
              className="absolute inset-0 opacity-60 z-0"
              style={{
                background: 'radial-gradient(circle at center, rgba(246,193,199,0.15) 0%, transparent 70%)',
              }}
            />
            
            <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl border border-[#D4AF37]/40 group-hover:border-[#D4AF37]/60 transition-colors z-0" />
            {/* Card content */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
              {isLoading ? (
                <div className="flex items-center justify-center py-12 sm:py-16 md:py-24">
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 animate-spin text-[#C68484]" />
                    <span className="text-[#C68484]/90 font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg">
                      Loading sponsors...
                    </span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12 sm:py-16 md:py-24">
                  <div className="text-center">
                    <p className="text-red-600 font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg mb-3 sm:mb-4">{error}</p>
                    <button
                      onClick={fetchSponsors}
                      className="text-[#C68484] hover:text-[#7A3E3E] font-[family-name:var(--font-crimson)] underline transition-colors duration-300 text-sm sm:text-base"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : sponsorPairs.length === 0 ? (
                <div className="text-center py-12 sm:py-16 md:py-24">
                  <Users className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-[#C68484]/60 mx-auto mb-3 sm:mb-4" />
                  <p className="text-[#C68484]/90 font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg">
                    No sponsors yet
                  </p>
                </div>
              ) : (
                <div className="mb-3 sm:mb-5 md:mb-7 lg:mb-9">
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-1 sm:gap-y-1.5 md:gap-y-2 items-stretch">
                    {sponsorPairs.map((pair, idx) => (
                      <React.Fragment key={`sponsor-pair-${idx}`}>
                        <div key={`male-${idx}-${pair.MalePrincipalSponsor || 'empty'}`} className="px-2 sm:px-3 md:px-4">
                          {pair.MalePrincipalSponsor ? (
                            <NameItem name={pair.MalePrincipalSponsor} align="right" />
                          ) : (
                            <div className="py-0.5 sm:py-1 md:py-1.5" />
                          )}
                        </div>
                        <div key={`female-${idx}-${pair.FemalePrincipalSponsor || 'empty'}`} className="px-2 sm:px-3 md:px-4">
                          {pair.FemalePrincipalSponsor ? (
                            <NameItem name={pair.FemalePrincipalSponsor} align="left" />
                          ) : (
                            <div className="py-0.5 sm:py-1 md:py-1.5" />
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </StarBorder>
      </div>
    </Section>
  )
}
