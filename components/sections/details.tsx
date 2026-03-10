"use client"

import { Section } from "@/components/section"
import { Shirt, Copy, Check, Navigation, MapPin, Mail, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import StarBorder from "@/components/ui/StarBorder"

const CEREMONY_IMAGES = [
  "/Details/CampEdgar.png",
] as const
const RECEPTION_IMAGES = [
  "/Details/Padre Pio Pavilion B.png",
] as const
const VENUE_IMAGE_INTERVAL_MS = 4000

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [ceremonyImageIndex, setCeremonyImageIndex] = useState(0)
  const [receptionImageIndex, setReceptionImageIndex] = useState(0)

  // Rotate venue images every 4 seconds with smooth crossfade
  useEffect(() => {
    const ceremonyId = setInterval(() => {
      setCeremonyImageIndex((i) => (i + 1) % CEREMONY_IMAGES.length)
    }, VENUE_IMAGE_INTERVAL_MS)
    
    const receptionId = setInterval(() => {
      setReceptionImageIndex((i) => (i + 1) % RECEPTION_IMAGES.length)
    }, VENUE_IMAGE_INTERVAL_MS)

    return () => {
      clearInterval(ceremonyId)
      clearInterval(receptionId)
    }
  }, [])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Venue information (aligned with hero and FAQ)
  const ceremonyVenueName = "Nature's Village Resort - Camp Edgar"
  const ceremonyVenueDetail = "Talisay City, Negros Occidental"
  const ceremonyVenue = `${ceremonyVenueName}, ${ceremonyVenueDetail}`
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(ceremonyVenue)}`
  const ceremonyVenuePageLink = "https://naturesvillageresort.com/accommodations/camp-edgar/"

  const receptionVenueName = "Nature's Village Resort - Padre Pio B Function Hall"
  const receptionVenueDetail = "Talisay City, Negros Occidental"
  const receptionAddress = ""
  const receptionVenue = `${receptionVenueName}, ${receptionVenueDetail}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(receptionVenue)}`
  const receptionVenuePageLink = "https://naturesvillageresort.com/accommodations/padre-pio-pavilion-b/"

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <Section id="details" className="relative py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Header — soft dark overlay for white text readability */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <div className="relative max-w-2xl mx-auto rounded-2xl py-8 sm:py-10 md:py-12 px-6 sm:px-8" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-semibold text-white mb-4 sm:mb-6 uppercase"
            style={{ letterSpacing: "0.12em", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
          >
            Event Details
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
          <p
            className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-white/95 font-light max-w-xl mx-auto leading-relaxed px-2"
            style={{ letterSpacing: "0.08em", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          >
            Everything you need to know about our special day
          </p>
        </div>
      </div>

      {/* Venue and Event Information */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 md:mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
        
              {/* Ceremony Card */}
              <StarBorder
                as="div"
                className="relative group w-full"
                color="#D4AF37"
                speed="5s"
              >
          {/* Main card */}
          <div 
            className="relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #F7E7CE 0%, #EADBC8 50%, #F8D0B8 100%)',
              boxShadow: '0 0 0 1px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.12), 0 30px 90px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F7E7CE] via-[#EADBC8] to-[#F8D0B8] z-0" />
            <div 
              className="absolute inset-0 opacity-60 z-0"
              style={{
                background: 'radial-gradient(circle at center, rgba(246,193,199,0.15) 0%, transparent 70%)',
              }}
            />
            
            {/* Elegant border — Soft Gold */}
            <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl border border-[#D4AF37]/40 group-hover:border-[#D4AF37]/60 transition-colors z-0" />
            
            {/* Venue Image */}
            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] overflow-hidden">
                {CEREMONY_IMAGES.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt="Ceremony Venue"
                    fill
                    className={`object-cover transition-all duration-1000 ease-in-out group-hover:scale-105 ${
                      i === ceremonyImageIndex ? "opacity-100 z-[1]" : "opacity-0 z-0"
                    }`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                    priority={i === 0}
                  />
                ))}
              {/* Soft dark overlay for contrast - rgba(0,0,0,0.25-0.35) */}
              <div className="absolute inset-0 bg-black/30 z-[2] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[2] pointer-events-none" />
              
              {/* Venue name overlay */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6 z-10 isolate pointer-events-none">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-ephesis)] text-[#F7E7CE] mb-1 sm:mb-2" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
                  The Ceremony
                </p>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-semibold text-white mb-0.5 sm:mb-1 uppercase leading-tight" style={{ letterSpacing: "0.1em", textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
                  Nature&apos;s Village Resort
                  <span className="block text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-light text-[#F7E7CE] mt-0.5">Camp Edgar</span>
                </h3>
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-white/95 tracking-wide" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
                  Talisay City, Negros Occidental
                </p>
              </div>
            </div>

            {/* Event Details Content */}
            <div className="relative z-10 p-3 sm:p-5 md:p-7 lg:p-9">
              <div className="bg-[#EADBC8]/60 rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border border-[#D4AF37]/30">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#C68484] mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-semibold text-[#A45C5C] mb-1.5 sm:mb-2 uppercase tracking-wide" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
                      Location
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] text-[#7A3E3E] leading-relaxed" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                      {ceremonyVenueName}
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#C68484]/90 leading-relaxed mt-1">
                      {ceremonyVenueDetail}
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#7A3E3E] leading-relaxed mt-1">
                      Ceremony Time: 4:30 PM
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="bg-white p-1.5 sm:p-2 md:p-2.5 rounded-lg border border-[#D4AF37]/30 shadow-sm">
                      <QRCodeSVG
                        value={ceremonyMapsLink}
                        size={80}
                        level="M"
                        includeMargin={false}
                        fgColor="#000000"
                        bgColor="#FFFFFF"
                      />
                    </div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-crimson)] text-[#C68484]/90 italic text-center max-w-[80px]">
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => openInMaps(ceremonyMapsLink)}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-[#C68484] hover:bg-[#F6C1C7] text-[#F7E7CE] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-[#D4AF37]/40"
                  aria-label="Get directions to ceremony venue"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>Get Directions</span>
                </button>
                <a
                  href={ceremonyVenuePageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-[#EADBC8]/80 border-2 border-[#D4AF37]/40 hover:border-[#D4AF37]/60 hover:bg-[#F8D0B8]/80 text-[#7A3E3E] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] no-underline"
                  aria-label="View ceremony venue on Nature's Village Resort website"
                >
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-[#C68484]" />
                  <span className="text-[#C68484]">View Venue</span>
                </a>
                <button
                  onClick={() => copyToClipboard(ceremonyVenue, 'ceremony')}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-[#EADBC8]/80 border-2 border-[#D4AF37]/40 hover:border-[#D4AF37]/60 hover:bg-[#F8D0B8]/80 text-[#7A3E3E] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  aria-label="Copy ceremony venue address"
                >
                  {copiedItems.has('ceremony') ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-[#C68484]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-[#C68484]" />
                  )}
                  <span className="text-[#C68484]">{copiedItems.has('ceremony') ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          </div>
        </StarBorder>

              {/* Reception Card */}
              <StarBorder
                as="div"
                className="relative group w-full"
                color="#D4AF37"
                speed="5s"
              >
          {/* Main card */}
          <div 
            className="relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #F7E7CE 0%, #EADBC8 50%, #F8D0B8 100%)',
              boxShadow: '0 0 0 1px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.12), 0 30px 90px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F7E7CE] via-[#EADBC8] to-[#F8D0B8] z-0" />
            <div 
              className="absolute inset-0 opacity-60 z-0"
              style={{
                background: 'radial-gradient(circle at center, rgba(246,193,199,0.15) 0%, transparent 70%)',
              }}
            />
            
            {/* Elegant border — Soft Gold */}
            <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl border border-[#D4AF37]/40 group-hover:border-[#D4AF37]/60 transition-colors z-0" />
            
            {/* Venue Image */}
            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] overflow-hidden">
                {RECEPTION_IMAGES.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt="Reception Venue"
                    fill
                    className={`object-cover transition-all duration-1000 ease-in-out group-hover:scale-105 ${
                      i === receptionImageIndex ? "opacity-100 z-[1]" : "opacity-0 z-0"
                    }`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                    priority={false}
                  />
                ))}
              {/* Soft dark overlay for contrast - rgba(0,0,0,0.25-0.35) */}
              <div className="absolute inset-0 bg-black/30 z-[2] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[2] pointer-events-none" />
              
              {/* Venue name overlay */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6 z-10 isolate pointer-events-none">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-ephesis)] text-[#F7E7CE] mb-1 sm:mb-2" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
                  The Reception
                </p>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-semibold text-white mb-0.5 sm:mb-1 uppercase leading-tight" style={{ letterSpacing: "0.1em", textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
                  Nature&apos;s Village Resort
                  <span className="block text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-light text-[#F7E7CE] mt-0.5">Padre Pio B Function Hall</span>
                </h3>
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-white/95 tracking-wide" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
                  Talisay City, Negros Occidental
                </p>
              </div>
            </div>

            {/* Event Details Content */}
            <div className="relative z-10 p-3 sm:p-5 md:p-7 lg:p-9">
              <div className="bg-[#EADBC8]/60 rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border border-[#D4AF37]/30">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#C68484] mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-semibold text-[#A45C5C] mb-1.5 sm:mb-2 uppercase tracking-wide" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
                      Location
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] text-[#7A3E3E] leading-relaxed" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                      {receptionVenueName}
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#C68484]/90 leading-relaxed mt-1">
                      {receptionVenueDetail}
                    </p>
                    {receptionAddress && (
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#C68484]/90 leading-relaxed">
                      {receptionAddress}
                    </p>
                    )}
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#7A3E3E] leading-relaxed mt-1">
                      Reception Time: 6:00 PM
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="bg-white p-1.5 sm:p-2 md:p-2.5 rounded-lg border border-[#D4AF37]/30 shadow-sm">
                      <QRCodeSVG
                        value={receptionMapsLink}
                        size={80}
                        level="M"
                        includeMargin={false}
                        fgColor="#000000"
                        bgColor="#FFFFFF"
                      />
                    </div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-crimson)] text-[#C68484]/90 italic text-center max-w-[80px]">
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => openInMaps(receptionMapsLink)}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-[#C68484] hover:bg-[#F6C1C7] text-[#F7E7CE] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-[#D4AF37]/40"
                  aria-label="Get directions to reception venue"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>Get Directions</span>
                </button>
                <a
                  href={receptionVenuePageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-[#EADBC8]/80 border-2 border-[#D4AF37]/40 hover:border-[#D4AF37]/60 hover:bg-[#F8D0B8]/80 text-[#7A3E3E] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] no-underline"
                  aria-label="View reception venue on Nature's Village Resort website"
                >
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-[#C68484]" />
                  <span className="text-[#C68484]">View Venue</span>
                </a>
                <button
                  onClick={() => copyToClipboard(receptionVenue, 'reception')}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-[#EADBC8]/80 border-2 border-[#D4AF37]/40 hover:border-[#D4AF37]/60 hover:bg-[#F8D0B8]/80 text-[#7A3E3E] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  aria-label="Copy reception venue address"
                >
                  {copiedItems.has('reception') ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-[#C68484]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-[#C68484]" />
                  )}
                  <span className="text-[#C68484]">{copiedItems.has('reception') ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          </div>
        </StarBorder>
      </div>

      {/* Attire Information */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header — soft dark overlay for white text readability */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="relative max-w-xl mx-auto rounded-2xl py-6 sm:py-8 px-6 sm:px-8" style={{ background: "rgba(0,0,0,0.3)" }}>
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
              <div className="h-px w-10 sm:w-14 md:w-20 bg-white/50" />
              <Shirt className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <div className="h-px w-10 sm:w-14 md:w-20 bg-white/50" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-[family-name:var(--font-crimson)] font-semibold text-white mb-0 uppercase" style={{ letterSpacing: "0.12em", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
              Attire Guidelines
            </h3>
          </div>
        </div>

        {/* Attire Cards */}
        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          {/* Guest Attire */}
          <StarBorder
            as="div"
            className="relative group w-full"
            color="#D4AF37"
            speed="5s"
          >
            <div 
              className="relative rounded-xl sm:rounded-2xl p-4 sm:p-7 md:p-9 transition-all duration-300 overflow-hidden"
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
              <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-xl sm:rounded-2xl" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                {/* Attire Guidelines — structured with color palettes */}
                <div className="space-y-7 sm:space-y-8 text-center">
                  {/* Principal Sponsors */}
                  <div className="space-y-3">
                    <h4 className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] tracking-[0.26em] uppercase text-[#7A3E3E]" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
                      Principal Sponsors
                    </h4>
                    <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#7A3E3E] leading-relaxed" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                      Male: <span className="font-semibold text-[#A45C5C]">Classic cream Barong with black pants</span>
                      <br />
                      Female: <span className="font-semibold text-[#A45C5C]">Beige/khaki long gown or formal attire</span>
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      {["#E6CAB4", "#E5D4BA", "#EFEBE0"].map((hex) => (
                        <div key={hex} className="flex flex-col items-center gap-1">
                          <span
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/60 shadow-sm"
                            style={{ backgroundColor: hex }}
                            aria-hidden
                          />
                          <span className="text-[9px] sm:text-[10px] font-[family-name:var(--font-crimson)] text-[#7A3E3E]/80">
                            {hex}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px w-16 sm:w-24 mx-auto bg-[#D4AF37]/30" />

                  {/* Bridesmaids & Groomsmen */}
                  <div className="space-y-3">
                    <h4 className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] tracking-[0.26em] uppercase text-[#7A3E3E]" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
                      Bridesmaids &amp; Groomsmen
                    </h4>
                    <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#7A3E3E] leading-relaxed" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                      Bridesmaids: <span className="font-semibold text-[#A45C5C]">Champagne long gown</span>
                      <br />
                      Groomsmen: <span className="font-semibold text-[#A45C5C]">Classic cream Barong with cream pants</span>
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      {["#FEF7DB"].map((hex) => (
                        <div key={hex} className="flex flex-col items-center gap-1">
                          <span
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/60 shadow-sm"
                            style={{ backgroundColor: hex }}
                            aria-hidden
                          />
                          <span className="text-[9px] sm:text-[10px] font-[family-name:var(--font-crimson)] text-[#7A3E3E]/80">
                            {hex}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px w-16 sm:w-24 mx-auto bg-[#D4AF37]/30" />

                  {/* Guests */}
                  <div className="space-y-3">
                    <h4 className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] tracking-[0.26em] uppercase text-[#7A3E3E]" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
                      Guests
                    </h4>
                    <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#7A3E3E] leading-relaxed" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                      Semi-formal attire in soft tones of{" "}
                      <span className="font-semibold text-[#A45C5C]">
                        pink, peach, beige, champagne, and gray
                      </span>
                      .
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {["#FBDFD4", "#FACEB3", "#FEF7DB", "#EFEBE0", "#E5D4BA"].map((hex) => (
                        <div key={hex} className="flex flex-col items-center gap-1">
                          <span
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/60 shadow-sm"
                            style={{ backgroundColor: hex }}
                            aria-hidden
                          />
                          <span className="text-[9px] sm:text-[10px] font-[family-name:var(--font-crimson)] text-[#7A3E3E]/80">
                            {hex}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StarBorder>
        </div>

        {/* Important Reminders Section */}
        <StarBorder
          as="div"
          className="relative group mt-10 sm:mt-14 md:mt-16 w-full"
          color="#D4AF37"
          speed="5s"
        >
          <div 
            className="relative rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-9 transition-all duration-300 overflow-hidden"
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
            <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-xl sm:rounded-2xl" />
            
            <div className="relative z-10">
              <h4 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#A45C5C] mb-6 sm:mb-7 md:mb-8 uppercase text-center" style={{ letterSpacing: "0.12em", textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
                Gentle Reminder
              </h4>
              
              <div className="space-y-5 sm:space-y-6 md:space-y-7">
                <div className="bg-[#EADBC8]/60 rounded-xl p-5 sm:p-6 md:p-7 border border-[#D4AF37]/30">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#C68484] mt-0.5 flex-shrink-0" aria-hidden />
                    <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#7A3E3E] leading-relaxed" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                      With love, we kindly ask that this invitation not be shared and be honored only by those who received it.
                    </p>
                  </div>
                </div>

                <div className="bg-[#EADBC8]/60 rounded-xl p-5 sm:p-6 md:p-7 border border-[#D4AF37]/30">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#C68484] mt-0.5 flex-shrink-0" aria-hidden />
                    <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#7A3E3E] leading-relaxed" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                      Your invitation will show clearly where we will be celebrating together—ceremony &amp; reception, or reception only.
                    </p>
                  </div>
                </div>

                <div className="bg-[#EADBC8]/60 rounded-xl p-5 sm:p-6 md:p-7 border border-[#D4AF37]/30">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Shirt className="w-5 h-5 sm:w-6 sm:h-6 text-[#C68484] mt-0.5 flex-shrink-0" aria-hidden />
                      <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#7A3E3E] leading-relaxed" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                        Please no slippers or overly casual outfits.
                      </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StarBorder>
      </div>
    </Section>
  )
}

