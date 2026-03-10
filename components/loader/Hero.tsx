import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpen: () => void;
  visible: boolean;
}

const desktopImages: string[] = [
  '/desktop-background/1.png',
  '/desktop-background/2.png',
  '/desktop-background/3.png',
  '/desktop-background/4.png',
  '/desktop-background/5.png'
];

const mobileImages: string[] = [
  '/mobile-background/mobile (1).png',
  '/mobile-background/mobile (2).png',
  '/mobile-background/mobile (3).png',
  '/mobile-background/mobile (4).png',
  '/mobile-background/mobile (5).png'
];

export const Hero: React.FC<HeroProps> = ({ onOpen, visible }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(max-width: 768px)');
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 5);
    }, 5500);
    return () => clearInterval(timer);
  }, [mounted]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setContentVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setContentVisible(false);
    }
  }, [visible]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gentleFloat {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-8px);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const images = useMemo(() => (isMobile ? mobileImages : desktopImages), [isMobile]);

  return (
      <div className={`fixed inset-0 z-30 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: i === index ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
            }}
          >
            <Image
              src={src}
              alt="Couple"
              fill
              quality={90}
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
        
        {/* Gradient Overlay - champagne / soft beige to match loading motif */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(247, 231, 206, 0.75), rgba(234, 219, 200, 0.9))'
          }}
        />
        
        {/* Subtle vignette effect - warm champagne glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(248, 208, 184, 0.4) 100%)'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-md mx-auto h-full">
        
        {/* Top Logo/Monogram */}
        <div 
          className={`mb-auto mt-8 transition-all duration-1000 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
            {/* Monogram motif — deep rose with soft glow */}
            <div
              className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 transition-transform duration-700 ease-out hover:scale-105"
              style={{
                animation: contentVisible ? 'gentleFloat 3s ease-in-out infinite' : 'none',
                backgroundColor: '#7B3F3F',
                maskImage: 'url("/monogram/newMonogramv2.png")',
                WebkitMaskImage: 'url("/monogram/newMonogramv2.png")',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                boxShadow:
                  '0 0 18px rgba(123, 63, 63, 0.7), 0 0 32px rgba(123, 63, 63, 0.5)',
              }}
            />
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col items-center justify-end w-full gap-5 sm:gap-6 pb-14 sm:pb-16 md:pb-20">
          <h2
            className={`text-6xl md:text-8xl transform -rotate-6 transition-all duration-1000 ease-out delay-200 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontWeight: 400,
              color: '#C68484',
              textShadow: '0 2px 8px rgba(198, 132, 132, 0.25)',
            }}
          >
            You are
          </h2>
          
          <h1
            className={`text-5xl md:text-7xl font-bold tracking-wider uppercase transition-all duration-1000 ease-out delay-300 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              color: '#C68484',
              textShadow: '0 2px 8px rgba(198, 132, 132, 0.25)',
              letterSpacing: '0.05em',
            }}
          >
            Invited!
          </h1>

          <button 
            onClick={() => {
              onOpen();
            }}
            className={`px-10 py-4 font-serif text-sm tracking-[0.2em] uppercase rounded-sm border transition-all duration-500 ease-out delay-500 shadow-lg hover:shadow-xl ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              backgroundColor: '#C68484',
              borderColor: '#C68484',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#B06E6E';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = '#B06E6E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#C68484';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#C68484';
            }}
          >
            <span
              style={{ fontFamily: '"Cinzel", serif', fontWeight: 500, color: '#FFFFFF' }}
            >
              Open Invitation
            </span>
          </button>
        </div>

        {/* Bottom Spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
};