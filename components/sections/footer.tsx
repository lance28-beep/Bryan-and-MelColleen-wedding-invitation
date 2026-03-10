"use client";

import { motion } from "motion/react";
import { MapPin, Calendar } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <footer
      className="relative z-20 mt-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #F7E7CE 0%, #EADBC8 50%, #F8D0B8 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 -4px 24px rgba(198,132,132,0.08)",
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Save The Date – aligned with hero section */}
        <motion.div
          className="flex justify-center px-4 mb-16"
          variants={fadeInUp}
        >
          <div className="max-w-xl md:max-w-2xl w-full text-center">
            {/* Monogram – deep rose to match site palette */}
            <div className="mb-8 sm:mb-9 md:mb-10 flex justify-center">
              <div
                className="h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72"
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
                    "0 0 26px rgba(123, 63, 63, 0.7), 0 0 46px rgba(123, 63, 63, 0.5)",
                }}
              />
            </div>

            {/* Fine divider */}
            <div className="mb-6 sm:mb-7 md:mb-8 flex justify-center">
              <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
            </div>

            {/* Date + time block */}
            <div className="mb-7 sm:mb-9 md:mb-10">
              <p className="text-[11px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.38em] text-[#C68484]/90 uppercase mb-4 sm:mb-5">
                April
              </p>
              <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14 mb-3 sm:mb-4">
                <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.3em] text-[#C68484]/80 uppercase">
                  Sunday
                </p>
                <p className="text-4xl sm:text-5xl md:text-[3.25rem] font-[family-name:var(--font-crimson)] text-[#C68484] leading-none font-semibold">
                  19
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.3em] text-[#C68484]/80 uppercase">
                  At 4:30 PM
                </p>
              </div>
              <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] tracking-[0.3em] text-[#C68484]/90 uppercase">
                2026
              </p>
            </div>

            {/* Fine divider */}
            <div className="mt-6 sm:mt-7 md:mt-8 mb-6 sm:mb-7 flex justify-center">
              <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
            </div>

            {/* Location block */}
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              <div className="space-y-2 sm:space-y-3">
                <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.3em] text-[#C68484]/80 uppercase">
                  Ceremony
                </p>
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] tracking-[0.2em] text-[#7A3E3E] uppercase font-semibold">
                Nature's Village Resort - Camp Edgar
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.16em] text-[#C68484]/90 uppercase">
                  Talisay City, Negros Occidental
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.3em] text-[#C68484]/80 uppercase">
                  Reception
                </p>
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] tracking-[0.2em] text-[#7A3E3E] uppercase font-semibold">
                  Nature&apos;s Village Resort - Padre Pio B Function Hall
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] tracking-[0.16em] text-[#C68484]/90 uppercase">
                  Talisay City, Negros Occidental
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center mb-12"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Couple Info – aligned with hero */}
          {/* <motion.div className="max-w-md" variants={fadeInUp}>
            <div className="mb-8">
              <div className="mb-6">
                <Image
                  src="/monogram/monogram.png"
                  alt="Japoi & Regine"
                  width={80}
                  height={80}
                  className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 object-contain object-center brightness-0 invert"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-crimson)] font-semibold text-zinc-100 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-6">
              Japoi & Regine
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 font-[family-name:var(--font-crimson)] text-zinc-300 font-medium">
                  <Calendar className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                  <span className="text-base sm:text-lg">March 15, 2026 • Sunday</span>
                </div>
                <div className="flex items-center gap-3 font-[family-name:var(--font-crimson)] text-zinc-300 font-medium">
                  <MapPin className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Twin Lakes Tagaytay, Glass House • Tagaytay, Philippines</span>
                </div>
              </div>
            </div>
          </motion.div> */}
        </motion.div>

        {/* Bottom Row */}
        <motion.div
          className="border-t border-[#D4AF37]/40 pt-8"
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-[#7A3E3E] font-[family-name:var(--font-crimson)] text-sm sm:text-base font-semibold">
                © {year} Bryan & Mel Colleen. All rights reserved.
              </p>
              <p className="text-[#C68484]/90 font-[family-name:var(--font-crimson)] text-sm sm:text-base mt-1 font-medium">
                Made with 💕 for our special day
              </p>
            </div>

            <div className="text-center md:text-right space-y-1">
              <p className="text-[#7A3E3E] font-[family-name:var(--font-crimson)] text-xs sm:text-sm font-medium">
                Developed by{" "}
                <a
                  href="https://lance28-beep.github.io/portfolio-website/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C68484] hover:text-[#7A3E3E] transition-colors duration-200 underline decoration-[#D4AF37]/60 hover:decoration-[#D4AF37] font-semibold"
                >
                  Lance Valle
                </a>
              </p>
              <p className="text-[#7A3E3E] font-[family-name:var(--font-crimson)] text-xs sm:text-sm font-medium">
                Want a website like this? Visit{" "}
                <a
                  href="https://www.facebook.com/WeddingInvitationNaga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C68484] hover:text-[#7A3E3E] transition-colors duration-200 underline decoration-[#D4AF37]/60 hover:decoration-[#D4AF37] font-semibold"
                >
                  Wedding Invitation Naga
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}