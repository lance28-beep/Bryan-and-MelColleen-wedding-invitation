"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { MessageCircle, Heart, Sparkles, Send } from "lucide-react"
import { Section } from "@/components/section"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MessageWallDisplay from "./message-wall-display"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageFormProps {
  onSuccess?: () => void
  onMessageSent?: () => void
}

function MessageForm({ onSuccess, onMessageSent }: MessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSd4b7BITaYDUR4nIFYJllC7bLs5MFyFhw444I1m9jh_dGfY7Q/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      toast({
        title: "Message Sent! 💌",
        description: "Your heartfelt wishes have been delivered",
        duration: 3000,
      })

      setIsSubmitted(true)
      setNameValue("")
      setMessageValue("")
      formRef.current?.reset()
      
      // Reset submitted state after animation
      setTimeout(() => setIsSubmitted(false), 1000)
      
      if (onSuccess) onSuccess()
      if (onMessageSent) onMessageSent()
    } catch (error) {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full max-w-lg mx-auto px-4 sm:px-0">
      <div 
        className={`relative w-full transition-all duration-300 overflow-hidden rounded-xl ${
          isSubmitted ? 'animate-bounce' : ''
        }`}
        style={{
          background: 'linear-gradient(135deg, #F7E7CE 0%, #EADBC8 50%, #F8D0B8 100%)',
          boxShadow: '0 0 0 1px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.3)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7E7CE] via-[#EADBC8] to-[#F8D0B8]" />
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: 'radial-gradient(circle at center, rgba(246,193,199,0.15) 0%, transparent 70%)',
          }}
        />
        <div className={`absolute inset-[1px] rounded-xl border border-[#D4AF37]/40 transition-all duration-300 ${
          isFocused ? 'border-[#D4AF37]/70' : ''
        }`} />
        
        {/* Success animation overlay */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-[#F6C1C7]/40 flex items-center justify-center z-20 pointer-events-none">
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <div className="w-16 h-16 bg-[#C68484] rounded-full flex items-center justify-center shadow-lg border border-[#D4AF37]/40">
                <Sparkles className="h-8 w-8 text-[#F7E7CE]" fill="currentColor" />
              </div>
              <p className="text-[#C68484] font-semibold text-lg font-[family-name:var(--font-crimson)]">Sent!</p>
            </div>
          </div>
        )}
        
        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          {/* Header with icon */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="relative inline-block mb-2 sm:mb-3">
              <div className="relative w-9 h-9 sm:w-12 sm:h-12 bg-[#EADBC8]/80 rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-[#D4AF37]/40">
                <MessageCircle className="h-4 w-4 sm:h-6 sm:w-6 text-[#C68484]" />
              </div>
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-semibold text-[#C68484] mb-1.5 sm:mb-2 uppercase tracking-[0.12em]">
              Share Your Love
            </h3>
            <p className="text-xs sm:text-sm text-[#7A3E3E] font-[family-name:var(--font-crimson)] font-light tracking-wide leading-relaxed px-1">
              Your message will be treasured forever
            </p>
          </div>

          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="space-y-3 sm:space-y-4 md:space-y-5"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {/* Name Field */}
            <div className="space-y-2 sm:space-y-2.5">
              <label className="block text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#C68484] uppercase tracking-wider">
                Your Name
              </label>
              <div className="relative">
                <Input
                  name="name"
                  required
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your name"
                  className={`w-full border border-[#D4AF37]/40 rounded py-2 sm:py-2.5 px-3 sm:px-4 text-sm sm:text-base font-[family-name:var(--font-crimson)] text-[#7A3E3E] placeholder:text-[#C68484]/60 transition-all duration-200 bg-[#EADBC8]/60 focus:outline-none ${
                    focusedField === 'name' 
                      ? 'border-[#D4AF37]/70 shadow-sm' 
                      : 'hover:border-[#D4AF37]/50'
                  }`}
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2 sm:space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#C68484] uppercase tracking-wider">
                  Your Message
                </label>
                {messageValue && (
                  <span className={`text-xs font-[family-name:var(--font-crimson)] transition-colors ${
                    messageValue.length > 500 ? 'text-red-500/90' : 'text-[#C68484]/70'
                  }`}>
                    {messageValue.length}/500
                  </span>
                )}
              </div>
              <div className="relative">
                <Textarea
                  name="message"
                  required
                  value={messageValue}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setMessageValue(e.target.value)
                    }
                  }}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Share your love, memories, or well wishes..."
                  className={`w-full border border-[#D4AF37]/40 rounded min-h-[100px] sm:min-h-[120px] text-sm sm:text-base font-[family-name:var(--font-crimson)] text-[#7A3E3E] placeholder:text-[#C68484]/60 transition-all duration-200 resize-none bg-[#EADBC8]/60 py-2 sm:py-2.5 px-3 sm:px-4 focus:outline-none ${
                    focusedField === 'message' 
                      ? 'border-[#D4AF37]/70 shadow-sm' 
                      : 'hover:border-[#D4AF37]/50'
                  }`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !nameValue.trim() || !messageValue.trim()}
              className="w-full !bg-[#C68484] !hover:bg-[#F6C1C7] active:bg-[#C68484] text-[#F7E7CE] py-2.5 sm:py-3 px-6 sm:px-8 text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold shadow-md transition-all duration-300 hover:scale-105 active:scale-100 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none border border-[#D4AF37]/40 tracking-wider uppercase"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch(
      "https://script.google.com/macros/s/AKfycbzsFSs-oHXiiOMQVK3OZzonkU7GBrN1JNwuBq7sUWtLx_Vcnl-ZQMyzj4su5kMi1tU3Nw/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        const rows: string[][] = data.GoogleSheetData
        const [header, ...entries] = rows
        const idxName = header.findIndex((h: string) => h.toLowerCase().includes("name"))
        const idxMsg = header.findIndex((h: string) => h.toLowerCase().includes("message"))
        const idxTime = header.findIndex((h: string) => h.toLowerCase().includes("timestamp"))
        const parsed = entries
          .map((row: string[]) => ({
            timestamp: row[idxTime],
            name: row[idxName],
            message: row[idxMsg],
          }))
          .reverse()
        setMessages(parsed)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <Section id="messages" className="py-10 sm:py-16 md:py-20 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section — soft dark overlay for white text readability */}
         <div className="text-center mb-8 sm:mb-12 md:mb-16">
           <div className="relative max-w-2xl mx-auto rounded-2xl py-6 sm:py-8 px-6 sm:px-8 mb-8 sm:mb-10" style={{ background: "rgba(0,0,0,0.3)" }}>
             <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-semibold text-white mb-4 sm:mb-6 md:mb-8 text-balance uppercase tracking-[0.12em] sm:tracking-[0.15em]" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
               Love Messages
             </h2>
             <h3 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-ephesis)] text-white mb-2 sm:mb-3 md:mb-4" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
               Share Your Heartfelt Wishes
             </h3>
             <p className="text-sm sm:text-base md:text-lg text-white font-[family-name:var(--font-crimson)] font-light leading-relaxed max-w-2xl mx-auto px-2 sm:px-4 tracking-wide" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
               Your messages of love and joy will be treasured forever.
               Share your memories, well wishes, and congratulations for the happy couple.
             </p>
           </div>
        </div>

        {/* Form Section */}
        <div className="flex justify-center mb-10 sm:mb-14 md:mb-20">
          <div className="relative max-w-2xl w-full">
            <MessageForm onMessageSent={fetchMessages} />
          </div>
        </div>

        {/* Messages Display Section */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-10 md:mb-14">
            <div className="relative max-w-xl mx-auto rounded-2xl py-6 sm:py-8 px-6 sm:px-8" style={{ background: "rgba(0,0,0,0.3)" }}>
              <div className="relative w-10 h-10 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-5 shadow-lg border border-white/30">
                <Heart className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-white mb-2 sm:mb-3 font-semibold" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                Messages from Loved Ones
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-white font-[family-name:var(--font-crimson)] font-light max-w-2xl mx-auto px-2 sm:px-4 tracking-wide" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                Read the beautiful messages shared by family and friends
              </p>
            </div>
          </div>
          
          <MessageWallDisplay messages={messages} loading={loading} />
        </div>

      </div>
    </Section>
  )
}
