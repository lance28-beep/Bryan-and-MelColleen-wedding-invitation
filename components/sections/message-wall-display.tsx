"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      // Stagger the animation of messages
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="relative rounded-lg overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #F7E7CE 0%, #EADBC8 50%, #F8D0B8 100%)',
              boxShadow: '0 0 0 1px rgba(212,175,55,0.2), 0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            <div className="absolute inset-0 border border-[#D4AF37]/40 rounded-lg" />
            <div className="relative z-10 py-4 px-4 sm:py-5 sm:px-5 md:py-6 md:px-7">
              <Skeleton className="h-16 sm:h-20 md:h-24 w-full mb-3 sm:mb-4 bg-[#EADBC8]/60" />
              <div className="flex items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-[#D4AF37]/30">
                <Skeleton className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EADBC8]/60" />
                <div className="flex-1 space-y-1.5 sm:space-y-2">
                  <Skeleton className="h-3 sm:h-3.5 w-20 sm:w-24 bg-[#EADBC8]/60" />
                  <Skeleton className="h-2.5 sm:h-3 w-16 sm:w-20 bg-[#EADBC8]/60" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-[#EADBC8]/80 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg border border-[#D4AF37]/40">
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-[#C68484]" />
        </div>
        <h3 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#C68484] mb-2 sm:mb-3 uppercase tracking-wider">
          No Messages Yet
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-[#7A3E3E] font-[family-name:var(--font-crimson)] font-light max-w-md mx-auto leading-relaxed tracking-wide">
          Be the first to share your heartfelt wishes for the happy couple!
        </p>
        <div className="mt-4 sm:mt-6 flex justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#C68484]/80" />
            <span className="text-[10px] sm:text-xs font-[family-name:var(--font-crimson)] text-[#C68484]/80">Your message will appear here</span>
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#C68484]/80" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      {visibleMessages.map((msg, index) => (
        <div
          key={index}
          className={`relative transition-all duration-300 group rounded-xl sm:rounded-2xl overflow-hidden ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0 animate-fade-in-up'
          } group-hover:shadow-lg`}
          style={{
            transitionDelay: `${index * 100}ms`,
            background: 'linear-gradient(135deg, #F7E7CE 0%, #EADBC8 50%, #F8D0B8 100%)',
            boxShadow: '0 0 0 1px rgba(212,175,55,0.25), 0 4px 20px rgba(198,132,132,0.08), inset 0 1px 0 rgba(255,255,255,0.4)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#F7E7CE] via-[#EADBC8] to-[#F8D0B8]" />
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              background: 'radial-gradient(circle at center, rgba(246,193,199,0.2) 0%, transparent 70%)',
            }}
          />
          
          <div className="absolute inset-0 border-2 border-[#D4AF37]/40 rounded-xl sm:rounded-2xl group-hover:border-[#D4AF37]/60 transition-colors duration-300" />
          
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-[3rem]" aria-hidden />
          
          <div className="relative z-10 py-5 px-4 sm:py-6 sm:px-6 md:py-7 md:px-8">
            <div className="relative">
              {/* Quotation marks - Soft Gold for elegant emphasis */}
              <span className="absolute -left-0.5 -top-2 sm:-left-1 sm:-top-2.5 md:-left-1.5 md:-top-3 text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-crimson)] leading-none select-none text-[#D4AF37]/70 group-hover:text-[#D4AF37]/90 transition-colors duration-300" aria-hidden>{'"'}</span>
              <div className="relative pl-8 sm:pl-10 md:pl-12 pr-4 sm:pr-6 md:pr-8 pt-1 sm:pt-2 pb-2 sm:pb-3">
                <p className="text-[#7A3E3E] text-sm sm:text-base md:text-lg leading-[1.7] sm:leading-[1.75] font-[family-name:var(--font-crimson)] font-light tracking-wide">{msg.message}</p>
              </div>
              <span className="absolute -right-0.5 -bottom-0.5 sm:-right-1 sm:-bottom-1 md:-right-1.5 md:-bottom-1.5 text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-crimson)] leading-none select-none text-[#D4AF37]/70 group-hover:text-[#D4AF37]/90 transition-colors duration-300" aria-hidden>{'"'}</span>
            </div>
            
            <div className="flex items-center justify-between pt-4 sm:pt-5 border-t-2 border-[#D4AF37]/30 mt-1">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#F6C1C7] rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 border-2 border-[#D4AF37]/50">
                    <span className="text-[#7A3E3E] font-[family-name:var(--font-crimson)] text-xs sm:text-sm font-bold">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                </div>
                <div className="min-w-0">
                  <h4 className="font-[family-name:var(--font-crimson)] text-[#7A3E3E] text-sm sm:text-base md:text-lg font-semibold leading-tight truncate">{msg.name}</h4>
                  <span className="text-[10px] sm:text-xs text-[#C68484] font-[family-name:var(--font-crimson)] tracking-wide font-medium">
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                </div>
              </div>
              <Heart className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 text-[#C68484]/70 fill-[#C68484]/40 group-hover:text-[#C68484] group-hover:fill-[#C68484]/70 transition-all duration-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
