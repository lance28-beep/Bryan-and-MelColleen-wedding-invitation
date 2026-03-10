"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/section";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "When and where is the wedding?",
    answer:
      "Ceremony will be held on Sunday, April 19, 2026, at 4:30 PM at Nature's Village Resort - Camp Edgar, Talisay City, Negros Occidental. The reception will follow at Nature's Village Resort - Padre Pio B Function Hall at 6:00 PM.",
  },
  {
    question: "What is the dress code?",
    answer:
      "Guest Attire: semi-formal attire for guestss attire in soft tones of pink, peach, beige, champagne, and light gray.",
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      "Please confirm your attendance by April 5, 2026. We have reserved seats for you, and we look forward to celebrating with you! Your response helps us finalize our guest list and seating arrangements.\n\n[RSVP_LINK]Click here to RSVP[/RSVP_LINK]",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "As we celebrate this moment with our closest loved ones, we kindly ask that attendance be limited to those named on the invitation. Thank you for your understanding and cooperation!",
  },
  {
    question: "Am I invited to the ceremony, the reception, or both?",
    answer:
      "Your invitation will indicate where we will be celebrating together—ceremony & reception, or reception only. If you’re unsure, please feel free to reach out to us directly.",
  },
  {
    question: "Are children allowed?",
    answer:
      "We love your little ones, but to keep the celebration intimate, we kindly request an adults-only event. Children in our family and the entourage are the exception. We appreciate your understanding!",
  },
  {
    question: "What is your gift policy?",
    answer:
      "Your presence at our wedding is the most precious gift we could ask for! If you wish to honor us with a monetary gift, please refer to our Gift Registry section for more details.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "We'd love for everyone to be fully present. Please avoid posting photos during the celebration or ahead of time. We want everyone to be in the moment with us!",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP. We want to ensure everyone is comfortable and well-fed!",
  },
  {
    question: "How do I get to the venue?",
    answer:
      "You can use the 'Get Directions' button in the Event Details section to open Google Maps for easy navigation to Nature's Village Resort - East Garden (Ceremony) and Nature's Village Resort - Padre Pio B Function Hall (Reception).",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes! Nature's Village Resort has parking facilities. We recommend arriving 15-20 minutes early to secure a spot and get settled comfortably.",
  },
  {
    question: "What should I do if I need to cancel or update my RSVP?",
    answer:
      "You can update your RSVP by searching for your name in the RSVP section and submitting a new response. We appreciate your timely communication!",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section
      id="faq"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Section Header — soft dark overlay for white text readability */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <div className="relative max-w-xl mx-auto rounded-2xl py-6 sm:py-8 px-6 sm:px-8" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-semibold text-white mb-4 sm:mb-6 uppercase tracking-[0.12em] sm:tracking-[0.15em]" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
            Frequently Asked Questions
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-white font-light max-w-xl mx-auto leading-relaxed tracking-wide px-4" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
            Everything you need to know
          </p>
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="relative group">
          <div
            className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-300 overflow-hidden"
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

            {/* FAQ items */}
            <div className="relative z-10 space-y-2.5 sm:space-y-3 md:space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                const contentId = `faq-item-${index}`;
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border border-[#D4AF37]/40 bg-[#EADBC8]/60 hover:bg-[#EADBC8]/80 hover:border-[#D4AF37]/60 transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group/btn w-full px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EADBC8] transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className="font-[family-name:var(--font-crimson)] font-semibold text-[#7A3E3E] pr-3 sm:pr-4 text-xs sm:text-sm md:text-base leading-relaxed group-hover/btn:text-[#C68484] transition-colors duration-200">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-[#C68484]/80 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:text-[#C68484]`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-[#EADBC8]/40 border-t border-[#D4AF37]/30">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className="text-[#7A3E3E] leading-relaxed text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] whitespace-pre-line">
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a
                                href="#guest-list"
                                className="text-[#C68484] underline font-semibold hover:text-[#7A3E3E] transition-colors inline-flex items-center gap-1"
                                onClick={(e) => {
                                  e.preventDefault();
                                  document
                                    .getElementById("guest-list")
                                    ?.scrollIntoView({ behavior: "smooth" });
                                }}
                              >
                                {
                                  item.answer.match(
                                    /\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/,
                                  )?.[1]
                                }
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : (
                            <p className="text-[#7A3E3E] leading-relaxed text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] whitespace-pre-line">
                              {item.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
