"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import StaggeredMenu from "./StaggeredMenu";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#countdown", label: "Countdown" },
  { href: "#details", label: "Details" },
  { href: "#timeline", label: "Timeline" },
  { href: "#entourage", label: "Entourage" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#guest-list", label: "RSVP" },
  { href: "#registry", label: "Registry" },
  { href: "#faq", label: "FAQs" },
  { href: "#messages", label: "Messages" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current != null) return;
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        setIsScrolled(window.scrollY > 50);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", onScroll as EventListener);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sectionIds = navLinks.map((l) => l.href.substring(1));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const topMost = visible[0];
          if (topMost.target && topMost.target.id) {
            const newActive = `#${topMost.target.id}`;
            setActiveSection((prev) => (prev === newActive ? prev : newActive));
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const menuItems = useMemo(
    () =>
      navLinks.map((l) => ({
        label: l.label,
        ariaLabel: `Go to ${l.label}`,
        link: l.href,
      })),
    [],
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-[#F7E7CE]/95 backdrop-blur-xl shadow-lg border-b border-[#D4AF37]/30"
          : "bg-[#F7E7CE]/80 backdrop-blur-lg border-b border-[#D4AF37]/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-14 sm:h-14 md:h-14">
          <Link href="#home" className="flex-shrink-0 group relative z-10 flex items-center">
            <div
              className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 group-hover:opacity-90 transition-opacity duration-300"
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
                  "0 0 10px rgba(123, 63, 63, 0.6), 0 0 20px rgba(123, 63, 63, 0.4)",
              }}
              aria-hidden
            />
            <span className="sr-only">Bryan & Mel Colleen</span>
          </Link>

          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-[family-name:var(--font-crimson)] font-normal tracking-wide transition-all duration-300 relative group ${
                    isActive
                      ? "text-[#C68484]"
                      : "text-[#C68484]/70 hover:text-[#C68484]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C68484] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="md:hidden relative z-20">
            <StaggeredMenu
              position="left"
              items={menuItems}
              socialItems={[]}
              displaySocials={false}
              menuButtonColor="#C68484"
              openMenuButtonColor="#7A3E3E"
              changeMenuColorOnOpen={true}
              colors={["#F7E7CE", "#EADBC8", "#F6C1C7", "#F8D0B8"]}
              accentColor="#C68484"
              isFixed={true}
              onMenuOpen={() => {}}
              onMenuClose={() => {}}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
