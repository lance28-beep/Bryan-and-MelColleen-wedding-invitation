"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import NextImage from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
import { Section } from "@/components/section"
// Removed circular gallery in favor of a responsive masonry layout

// Wedding palette — align with loading & hero (champagne + dusty rose)
const palette = {
  // Deep dusty rose for headings / accents
  deep: "#7B3F3F",
  // Primary dusty rose
  medium: "#C68484",
  // Soft gold accent
  sage: "#D4AF37",
  // Champagne base
  cream: "#F7E7CE",
  // Slightly deeper rose for buttons
  terracotta: "#B06E6E",
} as const

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const GALLERY_DECO_FILTER =
  "brightness(0) saturate(100%) invert(73%) sepia(20%) saturate(680%) hue-rotate(315deg) brightness(98%) contrast(95%)"

const galleryItems = [
  { image: "/mobile-background/mobile (1).png", text: " " },   
  { image: "/mobile-background/mobile (2).png", text: " " },
  { image: "/mobile-background/mobile (3).png", text: " " },
  { image: "/mobile-background/mobile (4).png", text: " " },
  { image: "/mobile-background/mobile (5).png", text: " " },


]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  // reserved for potential skeleton tracking; not used after fade-in simplification
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)
  const [zoomScale, setZoomScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null)
  const [pinchStartScale, setPinchStartScale] = useState(1)
  const [lastTap, setLastTap] = useState(0)
  const [panStart, setPanStart] = useState<{ x: number; y: number; panX: number; panY: number } | null>(null)

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex
      if (direction === 'next') {
        newIndex = (prevIndex + 1) % galleryItems.length
      } else {
        newIndex = (prevIndex - 1 + galleryItems.length) % galleryItems.length
      }
      setSelectedImage(galleryItems[newIndex])
      return newIndex
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === 'ArrowLeft') navigateImage('prev')
      if (e.key === 'ArrowRight') navigateImage('next')
      if (e.key === 'Escape') setSelectedImage(null)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, currentIndex, navigateImage])

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedImage])

  // Preload adjacent images for smoother nav
  useEffect(() => {
    if (selectedImage) {
      const next = new Image()
      next.src = galleryItems[(currentIndex + 1) % galleryItems.length].image
      const prev = new Image()
      prev.src = galleryItems[(currentIndex - 1 + galleryItems.length) % galleryItems.length].image
    }
  }, [selectedImage, currentIndex])

  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))
  const resetZoom = () => {
    setZoomScale(1)
    setPan({ x: 0, y: 0 })
    setPanStart(null)
  }

  return (
    <div
      className="relative w-full"
      style={{ backgroundColor: palette.cream }}
    >
      {/* Full-bleed layered background — same as hero (inline styles so it always applies) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            background: `linear-gradient(165deg, ${palette.cream} 0%, ${palette.sage}18 40%, ${palette.medium}08 70%, ${palette.deep}06 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ background: `radial-gradient(ellipse 80% 50% at 50% 20%, ${palette.terracotta} 0%, transparent 60%)` }}
        />
      </div>

      <Section
        id="gallery"
        className="relative z-10 py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
      >
      {/* Corner floral decoration - aligned with Details section */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <NextImage
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute top-0 left-0 w-auto h-auto max-w-[120px] sm:max-w-[160px] md:max-w-[200px] opacity-20"
          style={{ transform: "scaleY(-1)", filter: GALLERY_DECO_FILTER }}
          priority={false}
        />
        <NextImage
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute top-0 right-0 w-auto h-auto max-w-[120px] sm:max-w-[160px] md:max-w-[200px] opacity-20"
          style={{ transform: "scaleX(-1) scaleY(-1)", filter: GALLERY_DECO_FILTER }}
          priority={false}
        />
        <NextImage
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute bottom-0 left-0 w-auto h-auto max-w-[120px] sm:max-w-[160px] md:max-w-[200px] opacity-20"
          style={{ filter: GALLERY_DECO_FILTER }}
          priority={false}
        />
        <NextImage
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute bottom-0 right-0 w-auto h-auto max-w-[120px] sm:max-w-[160px] md:max-w-[200px] opacity-20"
          style={{ transform: "scaleX(-1)", filter: GALLERY_DECO_FILTER }}
          priority={false}
        />
      </div>

      {/* Header — wedding palette & copy */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6">
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] mb-2`}
          style={{ color: palette.medium }}
        >
          Our Story in Frames
        </p>
        <h2
          className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-2 sm:mb-3`}
          style={{ color: palette.deep }}
        >
          Gallery
        </h2>
        <p
          className={`${cormorant.className} text-xs sm:text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed px-2 mb-3 sm:mb-4`}
          style={{ color: palette.medium }}
        >
          From our first chapter to this beautiful season of commitment, every moment has been a testament to love, faith, and grace. We share these memories with heartfelt gratitude as we look forward to the lifetime that awaits us.
        </p>

        {/* Decorative element — sage dividers (hero style) */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <span className="h-px w-10 sm:w-14 rounded-full" style={{ backgroundColor: palette.sage }} />
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full opacity-80" style={{ backgroundColor: palette.sage }} />
            <span className="w-1.5 h-1.5 rounded-full opacity-50" style={{ backgroundColor: palette.sage }} />
            <span className="w-1.5 h-1.5 rounded-full opacity-80" style={{ backgroundColor: palette.sage }} />
          </div>
          <span className="h-px w-10 sm:w-14 rounded-full" style={{ backgroundColor: palette.sage }} />
        </div>
      </div>

      {/* Gallery content */}
      <div className="relative z-10 w-full">
        <div className="flex justify-center px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl w-full">
            {isLoading ? (
                <div className="flex items-center justify-center h-64 sm:h-80 md:h-96">
                <div className="w-12 h-12 border-[3px] border-[#C68484]/30 border-t-[#C68484] rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {/* Mobile: swipeable sliding gallery (scroll-snap carousel) */}
                <div className="sm:hidden">
                  <div
                    className="flex gap-3 overflow-x-auto px-1 pb-3 snap-x snap-mandatory scroll-px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    aria-label="Gallery carousel"
                  >
                    {galleryItems.map((item, index) => (
                      <button
                        key={item.image + index}
                        type="button"
                        className="group relative snap-center shrink-0 w-[82%] overflow-hidden rounded-lg bg-white/90 backdrop-blur-sm border transition-all duration-300 active:border-[#8F553D]/60"
                        style={{ borderColor: `${palette.sage}40` }}
                        onClick={() => {
                          setSelectedImage(item)
                          setCurrentIndex(index)
                        }}
                        aria-label={`Open image ${index + 1}`}
                      >
                        {/* Subtle glow on active (mobile) */}
                        <div className="absolute -inset-0.5 rounded-lg opacity-0 group-active:opacity-100 transition-opacity duration-300 blur-sm" style={{ background: `linear-gradient(to bottom right, ${palette.sage}30, ${palette.terracotta}15)` }} />

                        <div className="relative aspect-[3/4] overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.text || `Gallery image ${index + 1}`}
                            loading="lazy"
                            decoding="async"
                            sizes="90vw"
                            className="w-full h-full object-cover transition-transform duration-500 group-active:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="absolute top-2 right-2 backdrop-blur-sm rounded-full px-2 py-1" style={{ backgroundColor: `${palette.deep}99` }}>
                          <span className="text-xs font-medium text-white">
                            {index + 1}/{galleryItems.length}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <p className="mt-2 text-center text-xs font-[family-name:var(--font-crimson)] tracking-wide" style={{ color: palette.medium }}>
                    Swipe to explore
                  </p>
                </div>

                {/* Tablet/Desktop: existing grid */}
                <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
                  {galleryItems.map((item, index) => (
                    <button
                      key={item.image + index}
                      type="button"
                      className="group relative w-full overflow-hidden rounded-xl bg-white/90 backdrop-blur-sm border transition-all duration-300 hover:border-[#8F553D]/50"
                      style={{ borderColor: `${palette.sage}40` }}
                      onClick={() => {
                        setSelectedImage(item)
                        setCurrentIndex(index)
                      }}
                      aria-label={`Open image ${index + 1}`}
                    >
                      {/* Subtle glow on hover */}
                      <div className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" style={{ background: `linear-gradient(to bottom right, ${palette.sage}25, ${palette.terracotta}12)` }} />

                      <div className="relative aspect-[3/4] md:aspect-square overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.text || `Gallery image ${index + 1}`}
                          loading="lazy"
                          decoding="async"
                          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Image counter badge */}
                      <div className="absolute top-2 right-2 backdrop-blur-sm rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: `${palette.deep}99` }}>
                        <span className="text-xs font-medium text-white">
                          {index + 1}/{galleryItems.length}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={() => {
            setSelectedImage(null)
            resetZoom()
          }}
        >
            <div
              className="relative max-w-6xl w-full h-full sm:h-auto flex flex-col items-center justify-center"
              onTouchStart={(e) => {
                if (e.touches.length === 1) {
                  const now = Date.now()
                  if (now - lastTap < 300) {
                    setZoomScale((s) => (s > 1 ? 1 : 2))
                    setPan({ x: 0, y: 0 })
                  }
                  setLastTap(now)
                  const t = e.touches[0]
                  setTouchStartX(t.clientX)
                  setTouchDeltaX(0)
                  if (zoomScale > 1) {
                    setPanStart({ x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y })
                  }
                }
                if (e.touches.length === 2) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX
                  const dy = e.touches[0].clientY - e.touches[1].clientY
                  const dist = Math.hypot(dx, dy)
                  setPinchStartDist(dist)
                  setPinchStartScale(zoomScale)
                }
              }}
              onTouchMove={(e) => {
                if (e.touches.length === 2 && pinchStartDist) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX
                  const dy = e.touches[0].clientY - e.touches[1].clientY
                  const dist = Math.hypot(dx, dy)
                  const scale = clamp((dist / pinchStartDist) * pinchStartScale, 1, 3)
                  setZoomScale(scale)
                } else if (e.touches.length === 1) {
                  const t = e.touches[0]
                  if (zoomScale > 1 && panStart) {
                    const dx = t.clientX - panStart.x
                    const dy = t.clientY - panStart.y
                    setPan({ x: panStart.panX + dx, y: panStart.panY + dy })
                  } else if (touchStartX !== null) {
                    setTouchDeltaX(t.clientX - touchStartX)
                  }
                }
              }}
              onTouchEnd={() => {
                setPinchStartDist(null)
                setPanStart(null)
                if (zoomScale === 1 && Math.abs(touchDeltaX) > 50) {
                  navigateImage(touchDeltaX > 0 ? 'prev' : 'next')
                }
                setTouchStartX(null)
                setTouchDeltaX(0)
              }}
            >
            {/* Top bar with counter and close */}
            <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 sm:p-6">
              {/* Image counter */}
              <div className="backdrop-blur-md rounded-full px-4 py-2 border" style={{ backgroundColor: "rgba(0,0,0,0.4)", borderColor: `${palette.sage}50` }}>
                <span className="text-sm sm:text-base font-medium" style={{ color: palette.cream }}>
                  {currentIndex + 1} / {galleryItems.length}
                </span>
              </div>
              
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                  resetZoom()
                }}
                className="bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full p-2 sm:p-3 transition-all duration-200 border border-white/20 hover:border-white/40"
                aria-label="Close lightbox"
              >
                <X size={20} className="sm:w-6 sm:h-6 text-white" />
              </button>
            </div>

            {/* Navigation buttons */}
            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('prev')
                    resetZoom()
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-white/20 hover:border-white/40"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('next')
                    resetZoom()
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-white/20 hover:border-white/40"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>
              </>
            )}

            {/* Image container */}
            <div className="relative w-full h-full flex items-center justify-center pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden">
              <div
                className="relative inline-block max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.text || "Gallery image"}
                  style={{ 
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`, 
                    transition: pinchStartDist ? 'none' : 'transform 200ms ease-out' 
                  }}
                  className="max-w-full max-h-[75vh] sm:max-h-[85vh] object-contain rounded-lg shadow-2xl will-change-transform"
                />
                
                {/* Zoom reset button */}
                {zoomScale > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      resetZoom()
                    }}
                    className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white rounded-full px-3 py-1.5 text-xs font-medium border border-white/20 transition-all duration-200"
                  >
                    Reset Zoom
                  </button>
                )}
              </div>
            </div>

            {/* Bottom hint for mobile */}
            {galleryItems.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:hidden z-20">
                <p className="text-xs text-white/60 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                  Swipe to navigate
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      </Section>
    </div>
  )
}