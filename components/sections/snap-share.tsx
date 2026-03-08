"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Copy,
  Check,
  Download,
  Camera,
  Share2
} from "lucide-react";
import { Section } from "@/components/section";
import { QRCodeCanvas } from "qrcode.react";

export function SnapShare() {
  const [copiedHashtag, setCopiedHashtag] = useState(false);
  const [copiedDriveLink, setCopiedDriveLink] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const websiteUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://example.com";
  const driveLink =
    "https://drive.google.com/drive/folders/1eJomPIugRVmAnuvLVkcXO-3ieILxQbOH?usp=sharing";
  const hashtags = ["#BryanAndMelColleen","#BryanMelColleen2026"];  
  const shareText = `Join us in celebrating Bryan & Mel Colleen's special day! Check out their wedding website: ${websiteUrl} ${hashtags.join(" ")} 💕`;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const checkMobile = () => setIsMobile(window.innerWidth < 640);

    checkMobile();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHashtag(true);
      setTimeout(() => setCopiedHashtag(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const copyDriveLink = async () => {
    try {
      await navigator.clipboard.writeText(driveLink);
      setCopiedDriveLink(true);
      setTimeout(() => setCopiedDriveLink(false), 2000);
    } catch (err) {
      console.error("Failed to copy Drive link: ", err);
    }
  };

  const shareOnSocial = (
    platform: "instagram" | "facebook" | "twitter" | "tiktok",
  ) => {
    const encodedUrl = encodeURIComponent(websiteUrl);
    const encodedText = encodeURIComponent(shareText);

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`,
    };

    const target = urls[platform];
    if (target) {
      window.open(target, "_blank", "width=600,height=400");
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById(
      "snapshare-qr",
    ) as HTMLCanvasElement | null;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "wedding-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadDriveQRCode = () => {
    const canvas = document.getElementById(
      "drive-qr",
    ) as HTMLCanvasElement | null;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "wedding-drive-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const openDrive = () => {
    window.open(driveLink, "_blank", "noopener,noreferrer");
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardStyle = {
    background:
      "linear-gradient(135deg, #F7E7CE 0%, #EADBC8 50%, #F8D0B8 100%)",
    boxShadow:
      "0 0 0 1px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.3)",
  };

  return (
    <Section
      id="snap-share"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative max-w-xl mx-auto rounded-2xl py-6 sm:py-8 px-6 sm:px-8" style={{ background: "rgba(0,0,0,0.3)" }}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-semibold text-white mb-4 sm:mb-6 uppercase tracking-[0.12em] sm:tracking-[0.15em]" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
              Snap & Share
            </h2>
            <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-white font-light max-w-xl mx-auto leading-relaxed tracking-wide px-4" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
              Join us in capturing and celebrating the moments of our wedding day!
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Left Column: Hashtags + Drive Upload */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
            variants={fadeInUp}
          >
            {/* Hashtags Card */}
            <div className="relative group">
              <div
                className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden border border-[#D4AF37]/40 transition-all duration-300"
                style={cardStyle}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F7E7CE] via-[#EADBC8] to-[#F8D0B8] z-0" />
                <div
                  className="absolute inset-0 opacity-60 z-0"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(246,193,199,0.15) 0%, transparent 70%)",
                  }}
                />
                <div className="relative z-10 text-center space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="bg-[#EADBC8]/80 p-2.5 sm:p-3 rounded-full shadow-lg border border-[#D4AF37]/30 w-fit mx-auto">
                    <Camera className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#C68484]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#C68484] mb-2 sm:mb-3">
                      Official Hashtags
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-[#7A3E3E] mb-4 sm:mb-5 md:mb-6">
                      Tag your photos and videos with our hashtags to share your
                      memories
                    </p>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {hashtags.map((hashtag) => (
                      <div
                        key={hashtag}
                        className="flex items-center justify-center gap-2.5 sm:gap-3 bg-[#EADBC8]/60 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl border border-[#D4AF37]/40 hover:border-[#D4AF37]/60 transition-all duration-300"
                      >
                        <span className="text-sm sm:text-base md:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#C68484] break-all sm:break-normal tracking-wide">
                          {hashtag}
                        </span>
                        <button
                          onClick={() => copyToClipboard(hashtag)}
                          className="p-1.5 sm:p-2 rounded-full bg-[#C68484] hover:bg-[#F6C1C7] border border-[#D4AF37]/40 transition-colors duration-200 flex-shrink-0"
                          title="Copy hashtag"
                        >
                          {copiedHashtag ? (
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F7E7CE]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F7E7CE]" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Google Drive Upload Card */}
            <div className="relative group">
              <div
                className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden border border-[#D4AF37]/40 transition-all duration-300"
                style={cardStyle}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F7E7CE] via-[#EADBC8] to-[#F8D0B8] z-0" />
                <div
                  className="absolute inset-0 opacity-60 z-0"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(246,193,199,0.15) 0%, transparent 70%)",
                  }}
                />
                <div className="relative z-10 text-center space-y-4 sm:space-y-5 md:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#C68484] mb-2 sm:mb-3">
                      Upload Your Photos & Videos
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-[#7A3E3E]">
                      Help us capture our special day! Scan the QR or use the actions below to drop your clips into our shared Drive.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <div className="inline-flex flex-col items-center bg-[#EADBC8]/60 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border border-[#D4AF37]/40">
                      <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-[#D4AF37]/40 shadow-sm">
                        <QRCodeCanvas
                          id="drive-qr"
                          value={driveLink}
                          size={isMobile ? 112 : 160}
                          includeMargin
                          className="bg-white"
                        />
                      </div>
                      <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#C68484]/90">
                        📱 Scan with your camera app
                      </p>
                    </div>
                    <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                      <button
                        onClick={copyDriveLink}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-[#C68484] hover:bg-[#F6C1C7] border border-[#D4AF37]/40 rounded-lg text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#F7E7CE] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {copiedDriveLink ? (
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        )}
                        <span>{copiedDriveLink ? "Copied!" : "Copy Link"}</span>
                      </button>
                      <button
                        onClick={downloadDriveQRCode}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-[#C68484] hover:bg-[#F6C1C7] border border-[#D4AF37]/40 rounded-lg text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#F7E7CE] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        <span>Download QR</span>
                      </button>
                      <button
                        onClick={openDrive}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-[#C68484] hover:bg-[#F6C1C7] border border-[#D4AF37]/40 rounded-lg text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#F7E7CE] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        <span>Open Drive</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Closing Message */}
        <motion.div
          className="text-center mt-8 sm:mt-12 md:mt-16"
          variants={fadeInUp}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative max-w-3xl mx-auto">
            <div
              className="relative rounded-xl sm:rounded-2xl p-5 sm:p-7 md:p-9 lg:p-10 overflow-hidden border border-[#D4AF37]/40 transition-all duration-300"
              style={cardStyle}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F7E7CE] via-[#EADBC8] to-[#F8D0B8] z-0" />
              <div
                className="absolute inset-0 opacity-60 z-0"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(246,193,199,0.15) 0%, transparent 70%)",
                }}
              />
              <p className="relative z-10 text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#C68484] leading-relaxed mb-4 sm:mb-5 md:mb-6">
                We are so excited to celebrate our love with you! See you on our
                special day!
              </p>
              <div className="relative z-10 flex items-center justify-center gap-2.5 sm:gap-3 md:gap-4 my-4 sm:my-5 md:my-6">
                <div className="h-px w-10 sm:w-12 md:w-16 bg-[#D4AF37]/40" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#C68484]/60 rounded-full" />
                <div className="h-px w-10 sm:w-12 md:w-16 bg-[#D4AF37]/40" />
              </div>
              <div className="relative z-10 text-center">
                <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-ephesis)] text-[#C68484] font-normal">
                  – Bryan & Mel Colleen –
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
