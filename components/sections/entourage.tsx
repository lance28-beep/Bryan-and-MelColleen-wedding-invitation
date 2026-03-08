"use client";

import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Loader2, Users } from "lucide-react";

interface EntourageMember {
  Name: string;
  RoleCategory: string;
  RoleTitle: string;
  Email: string;
}

const ROLE_CATEGORY_ORDER = [
  "The Couple",
  "Parents of the Groom",
  "Parents of the Bride",
  "Best Man",
  "Maid/Matron of Honor",
  "Candle Sponsors",
  "Veil Sponsors",
  "Cord Sponsors",
  "Groomsmen",
  "Bridesmaids",
  "Flower Girls",
  "Ring/Coin Bearers",
];

export function Entourage() {
  const [entourage, setEntourage] = useState<EntourageMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntourage = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/entourage", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error((data?.error as string) || "Failed to fetch entourage");
      }
      // API returns an array; guard in case of unexpected shape
      const list = Array.isArray(data) ? data : [];
      setEntourage(list);
    } catch (error: unknown) {
      console.error("Failed to load entourage:", error);
      setError(error instanceof Error ? error.message : "Failed to load entourage");
      setEntourage([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntourage();

    // Set up auto-refresh listener for dashboard updates
    const handleEntourageUpdate = () => {
      setTimeout(() => {
        fetchEntourage();
      }, 1000);
    };

    window.addEventListener("entourageUpdated", handleEntourageUpdate);

    return () => {
      window.removeEventListener("entourageUpdated", handleEntourageUpdate);
    };
  }, []);

  // Map common spreadsheet category variants to display categories
  const normalizeCategory = (raw: string): string => {
    const s = (raw || "").trim();
    if (/maid(\s*\/?\s*matron)?\s+of\s+honor/i.test(s)) return "Maid/Matron of Honor";
    if (/ring\s*bearer/i.test(s) || /coin\s*bearer/i.test(s)) return "Ring/Coin Bearers";
    return s || "Other";
  };

  // Group entourage by role category (guard against non-array)
  const grouped = useMemo(() => {
    const result: Record<string, EntourageMember[]> = {};
    const list = Array.isArray(entourage) ? entourage : [];
    list.forEach((member) => {
      const category = normalizeCategory(member.RoleCategory || "Other");
      if (!result[category]) result[category] = [];
      result[category].push(member);
    });
    return result;
  }, [entourage]);

  // Helper component for elegant section titles
  const SectionTitle = ({
    children,
    align = "center",
    className = "",
  }: {
    children: React.ReactNode;
    align?: "left" | "center" | "right";
    className?: string;
  }) => {
    const textAlign =
      align === "right"
        ? "text-right"
        : align === "left"
          ? "text-left"
          : "text-center";
    return (
      <h3
        className={`text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-semibold uppercase text-[#C68484] mb-2 sm:mb-3 md:mb-4 tracking-[0.1em] sm:tracking-[0.12em] ${textAlign} ${className}`}
      >
        {children}
      </h3>
    );
  };

  // Helper component for name items with role title (supports alignment)
  const NameItem = ({
    member,
    align = "center",
    showRole = true,
  }: {
    member: EntourageMember;
    align?: "left" | "center" | "right";
    showRole?: boolean;
  }) => {
    const containerAlign =
      align === "right"
        ? "items-end"
        : align === "left"
          ? "items-start"
          : "items-center";
    const textAlign =
      align === "right"
        ? "text-right"
        : align === "left"
          ? "text-left"
          : "text-center";
    return (
      <div
        className={`flex flex-col ${containerAlign} justify-center py-0.5 sm:py-1 md:py-1.5 leading-tight sm:leading-relaxed`}
      >
        <p
          className={`text-[#7A3E3E] text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-medium ${textAlign}`}
        >
          {member.Name}
        </p>
        {showRole && member.RoleTitle && (
          <p
            className={`text-[#C68484]/90 text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-normal mt-0.5 sm:mt-1 leading-tight sm:leading-snug ${textAlign}`}
          >
            {member.RoleTitle}
          </p>
        )}
      </div>
    );
  };

  // Helper component for two-column layout wrapper
  const TwoColumnLayout = ({
    children,
    leftTitle,
    rightTitle,
    singleTitle,
    centerContent = false,
  }: {
    children: React.ReactNode;
    leftTitle?: string;
    rightTitle?: string;
    singleTitle?: string;
    centerContent?: boolean;
  }) => {
    if (singleTitle) {
      return (
        <div className="mb-3 sm:mb-5 md:mb-7 lg:mb-9">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div
            className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-1 sm:gap-y-1.5 md:gap-y-2 ${centerContent ? "max-w-2xl mx-auto" : ""}`}
          >
            {children}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-3 sm:mb-5 md:mb-7 lg:mb-9">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 mb-2 sm:mb-2.5 md:mb-3.5">
          {leftTitle && (
            <SectionTitle align="right" className="pr-2 sm:pr-3 md:pr-4">
              {leftTitle}
            </SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle align="left" className="pl-2 sm:pl-3 md:pl-4">
              {rightTitle}
            </SectionTitle>
          )}
        </div>
        <div
          className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-1 sm:gap-y-1.5 md:gap-y-2 ${centerContent ? "max-w-2xl mx-auto" : ""}`}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <section
      id="entourage"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden bg-transparent"
    >

      {/* Section Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-10 md:mb-12 px-3 sm:px-4 md:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-semibold text-[#C68484] mb-3 sm:mb-4 md:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]">
          Wedding Entourage
        </h2>

        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#7A3E3E] font-light max-w-xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4">
          Our cherished family and friends
        </p>
      </div>

      {/* Central Card Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Main card with elegant styling */}
        <div className="relative group">
          <div 
            className="relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #F7E7CE 0%, #EADBC8 50%, #F8D0B8 100%)',
              boxShadow: '0 0 0 1px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.3)',
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
            
            {/* Elegant border */}
            <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl border border-[#D4AF37]/40 group-hover:border-[#D4AF37]/60 transition-colors z-0" />
            {/* Card content */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
              {isLoading ? (
                <div className="flex items-center justify-center py-12 sm:py-16 md:py-24">
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 animate-spin text-[#C68484]" />
                    <span className="text-[#7A3E3E] font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg">
                      Loading entourage...
                    </span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12 sm:py-16 md:py-24">
                  <div className="text-center">
                    <p className="text-red-600 font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                      {error}
                    </p>
                    <button
                      onClick={fetchEntourage}
                      className="text-[#C68484] hover:text-[#7A3E3E] font-[family-name:var(--font-crimson)] underline transition-colors duration-300 text-sm sm:text-base"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : entourage.length === 0 ? (
                <div className="text-center py-12 sm:py-16 md:py-24">
                  <Users className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-[#C68484]/60 mx-auto mb-3 sm:mb-4" />
                  <p className="text-[#C68484]/90 font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg">
                    No entourage members yet
                  </p>
                </div>
              ) : (
                <>
                  {ROLE_CATEGORY_ORDER.map((category, categoryIndex) => {
                    const members = grouped[category] || [];

                    if (members.length === 0) return null;

                    // Special handling for The Couple - display Bride and Groom side by side
                    if (category === "The Couple") {
                      const groom = members.find((m) =>
                        m.RoleTitle?.toLowerCase().includes("groom"),
                      );
                      const bride = members.find((m) =>
                        m.RoleTitle?.toLowerCase().includes("bride"),
                      );

                      return (
                        <div key={category}>
                          {categoryIndex > 0 && (
                            <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                              <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                              <div className="w-1.5 h-1.5 bg-[#D4AF37]/50 rounded-full" />
                              <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                            </div>
                          )}
                          <TwoColumnLayout
                            singleTitle="The Couple"
                            centerContent={true}
                          >
                            <div className="px-2 sm:px-3 md:px-4">
                              {groom && (
                                <NameItem member={groom} align="right" />
                              )}
                            </div>
                            <div className="px-2 sm:px-3 md:px-4">
                              {bride && (
                                <NameItem member={bride} align="left" />
                              )}
                            </div>
                          </TwoColumnLayout>
                        </div>
                      );
                    }

                    // Special handling for Parents sections - combine into single two-column layout
                    if (
                      category === "Parents of the Bride" ||
                      category === "Parents of the Groom"
                    ) {
                      // Get both parent groups
                      const parentsBride =
                        grouped["Parents of the Bride"] || [];
                      const parentsGroom =
                        grouped["Parents of the Groom"] || [];

                      // Helper function to sort parents: father first, then mother
                      const sortParents = (members: EntourageMember[]) => {
                        return [...members].sort((a, b) => {
                          const aIsFather =
                            a.RoleTitle?.toLowerCase().includes("father") ??
                            false;
                          const bIsFather =
                            b.RoleTitle?.toLowerCase().includes("father") ??
                            false;

                          // Father comes first
                          if (aIsFather && !bIsFather) return -1;
                          if (!aIsFather && bIsFather) return 1;
                          return 0;
                        });
                      };

                      // Only render once (when processing "Parents of the Groom")
                      if (category === "Parents of the Groom") {
                        return (
                          <div key="Parents">
                            {categoryIndex > 0 && (
                              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                                <div className="w-1.5 h-1.5 bg-[#D4AF37]/50 rounded-full" />
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                              </div>
                            )}
                            <TwoColumnLayout
                              leftTitle="Parents of the Groom"
                              rightTitle="Parents of the Bride"
                            >
                              {(() => {
                                const leftArr = sortParents(parentsGroom);
                                const rightArr = sortParents(parentsBride);
                                const maxLen = Math.max(
                                  leftArr.length,
                                  rightArr.length,
                                );
                                const rows = [];
                                for (let i = 0; i < maxLen; i++) {
                                  const left = leftArr[i];
                                  const right = rightArr[i];
                                  rows.push(
                                    <React.Fragment key={`parents-row-${i}`}>
                                      <div
                                        key={`parent-groom-${i}`}
                                        className="px-2 sm:px-3 md:px-4"
                                      >
                                        {left ? (
                                          <NameItem
                                            member={left}
                                            align="right"
                                          />
                                        ) : (
                                          <div className="py-0.5 sm:py-1 md:py-1.5" />
                                        )}
                                      </div>
                                      <div
                                        key={`parent-bride-${i}`}
                                        className="px-2 sm:px-3 md:px-4"
                                      >
                                        {right ? (
                                          <NameItem
                                            member={right}
                                            align="left"
                                          />
                                        ) : (
                                          <div className="py-0.5 sm:py-1 md:py-1.5" />
                                        )}
                                      </div>
                                    </React.Fragment>,
                                  );
                                }
                                return rows;
                              })()}
                            </TwoColumnLayout>
                          </div>
                        );
                      }
                      // Skip rendering for "Parents of the Bride" since it's already rendered above
                      return null;
                    }

                    // Special handling for Maid/Matron of Honor and Best Man - combine into single two-column layout
                    if (
                      category === "Maid/Matron of Honor" ||
                      category === "Best Man"
                    ) {
                      // Get both honor attendant groups
                      const maidOfHonor = grouped["Maid/Matron of Honor"] || [];
                      const bestMan = grouped["Best Man"] || [];

                      // Only render once (when processing "Best Man")
                      if (category === "Best Man") {
                        return (
                          <div key="HonorAttendants">
                            {categoryIndex > 0 && (
                              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                                <div className="w-1.5 h-1.5 bg-[#D4AF37]/50 rounded-full" />
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                              </div>
                            )}
                            <TwoColumnLayout
                              leftTitle="Best Man"
                              rightTitle="Maid/Matron of Honor"
                            >
                              {(() => {
                                const maxLen = Math.max(
                                  bestMan.length,
                                  maidOfHonor.length,
                                );
                                const rows = [];
                                for (let i = 0; i < maxLen; i++) {
                                  const left = bestMan[i];
                                  const right = maidOfHonor[i];
                                  rows.push(
                                    <React.Fragment key={`honor-row-${i}`}>
                                      <div
                                        key={`bestman-cell-${i}`}
                                        className="px-2 sm:px-3 md:px-4"
                                      >
                                        {left ? (
                                          <NameItem
                                            member={left}
                                            align="right"
                                          />
                                        ) : (
                                          <div className="py-0.5 sm:py-1 md:py-1.5" />
                                        )}
                                      </div>
                                      <div
                                        key={`maid-cell-${i}`}
                                        className="px-2 sm:px-3 md:px-4"
                                      >
                                        {right ? (
                                          <NameItem
                                            member={right}
                                            align="left"
                                          />
                                        ) : (
                                          <div className="py-0.5 sm:py-1 md:py-1.5" />
                                        )}
                                      </div>
                                    </React.Fragment>,
                                  );
                                }
                                return rows;
                              })()}
                            </TwoColumnLayout>
                          </div>
                        );
                      }
                      // Skip rendering for "Maid/Matron of Honor" since it's already rendered above
                      return null;
                    }

                    // Special handling for Bridesmaids and Groomsmen - combine into single two-column layout
                    if (
                      category === "Bridesmaids" ||
                      category === "Groomsmen"
                    ) {
                      // Get both bridal party groups
                      const bridesmaids = grouped["Bridesmaids"] || [];
                      const groomsmen = grouped["Groomsmen"] || [];

                      // Only render once (when processing "Bridesmaids")
                      if (category === "Bridesmaids") {
                        return (
                          <div key="BridalParty">
                            {categoryIndex > 0 && (
                              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                                <div className="w-1.5 h-1.5 bg-[#D4AF37]/50 rounded-full" />
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                              </div>
                            )}
                            <TwoColumnLayout
                              leftTitle="Groomsmen"
                              rightTitle="Bridesmaids"
                            >
                              {(() => {
                                const maxLen = Math.max(
                                  bridesmaids.length,
                                  groomsmen.length,
                                );
                                const rows = [];
                                for (let i = 0; i < maxLen; i++) {
                                  const groomsman = groomsmen[i];
                                  const bridesmaid = bridesmaids[i];
                                  rows.push(
                                    <React.Fragment key={`bridal-row-${i}`}>
                                      <div
                                        key={`groomsman-cell-${i}`}
                                        className="px-2 sm:px-3 md:px-4"
                                      >
                                        {groomsman ? (
                                          <NameItem
                                            member={groomsman}
                                            align="right"
                                          />
                                        ) : (
                                          <div className="py-0.5 sm:py-1 md:py-1.5" />
                                        )}
                                      </div>
                                      <div
                                        key={`bridesmaid-cell-${i}`}
                                        className="px-2 sm:px-3 md:px-4"
                                      >
                                        {bridesmaid ? (
                                          <NameItem
                                            member={bridesmaid}
                                            align="left"
                                          />
                                        ) : (
                                          <div className="py-0.5 sm:py-1 md:py-1.5" />
                                        )}
                                      </div>
                                    </React.Fragment>,
                                  );
                                }
                                return rows;
                              })()}
                            </TwoColumnLayout>
                          </div>
                        );
                      }
                      // Skip rendering for "Groomsmen" since it's already rendered above
                      return null;
                    }

                    // Special handling for Candle/Veil Sponsors sections - combine into single two-column layout
                    if (
                      category === "Candle Sponsors" ||
                      category === "Veil Sponsors"
                    ) {
                      // Get both sponsor groups
                      const candleSponsors = grouped["Candle Sponsors"] || [];
                      const veilSponsors = grouped["Veil Sponsors"] || [];

                      // Only render once (when processing "Candle Sponsors")
                      if (category === "Candle Sponsors") {
                        return (
                          <div key="Sponsors">
                            {categoryIndex > 0 && (
                              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                                <div className="w-1.5 h-1.5 bg-[#D4AF37]/50 rounded-full" />
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                              </div>
                            )}
                            <TwoColumnLayout
                              leftTitle="Candle Sponsors"
                              rightTitle="Veil Sponsors"
                            >
                              {(() => {
                                const maxLen = Math.max(
                                  candleSponsors.length,
                                  veilSponsors.length,
                                );
                                const rows = [];
                                for (let i = 0; i < maxLen; i++) {
                                  const left = candleSponsors[i];
                                  const right = veilSponsors[i];
                                  rows.push(
                                    <React.Fragment key={`sponsors-row-${i}`}>
                                      <div
                                        key={`candle-cell-${i}`}
                                        className="px-2 sm:px-3 md:px-4"
                                      >
                                        {left ? (
                                          <NameItem
                                            member={left}
                                            align="right"
                                          />
                                        ) : (
                                          <div className="py-0.5 sm:py-1 md:py-1.5" />
                                        )}
                                      </div>
                                      <div
                                        key={`veil-cell-${i}`}
                                        className="px-2 sm:px-3 md:px-4"
                                      >
                                        {right ? (
                                          <NameItem
                                            member={right}
                                            align="left"
                                          />
                                        ) : (
                                          <div className="py-0.5 sm:py-1 md:py-1.5" />
                                        )}
                                      </div>
                                    </React.Fragment>,
                                  );
                                }
                                return rows;
                              })()}
                            </TwoColumnLayout>
                          </div>
                        );
                      }
                      // Skip rendering for "Veil Sponsors" since it's already rendered above
                      return null;
                    }

                    // Default: single title, centered content
                    return (
                      <div key={category}>
                        {categoryIndex > 0 && (
                          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 py-2 sm:py-3 md:py-4 mb-3 sm:mb-5 md:mb-7">
                            <div className="h-px w-8 sm:w-12 md:w-16 bg-[#D4AF37]/40" />
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#D4AF37]/50 rounded-full" />
                            <div className="h-px w-8 sm:w-12 md:w-16 bg-[#D4AF37]/40" />
                          </div>
                        )}
                        <TwoColumnLayout
                          singleTitle={category}
                          centerContent={true}
                        >
                          {(() => {
                            const SINGLE_COLUMN_SECTIONS = new Set([
                              "Best Man",
                              "Maid/Matron of Honor",
                              "Ring Bearer",
                              "Coin Bearer",
                              "Bible Bearer",
                              "Presider",
                            ]);
                            // Special rule: Cord Sponsors with exactly 2 names should be displayed as two columns meeting at center
                            if (
                              category === "Cord Sponsors" &&
                              members.length === 2
                            ) {
                              const left = members[0];
                              const right = members[1];
                              return (
                                <>
                                  <div className="px-2 sm:px-3 md:px-4">
                                    <NameItem member={left} align="right" />
                                  </div>
                                  <div className="px-2 sm:px-3 md:px-4">
                                    <NameItem member={right} align="left" />
                                  </div>
                                </>
                              );
                            }
                            if (
                              SINGLE_COLUMN_SECTIONS.has(category) ||
                              members.length <= 2
                            ) {
                              return (
                                <div className="col-span-full">
                                  <div className="max-w-sm mx-auto flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
                                    {members.map((member, idx) => (
                                      <NameItem
                                        key={`${category}-${idx}-${member.Name}`}
                                        member={member}
                                        align="center"
                                      />
                                    ))}
                                  </div>
                                </div>
                              );
                            }
                            // Default two-column sections: render row-by-row pairs to keep alignment on small screens
                            const half = Math.ceil(members.length / 2);
                            const left = members.slice(0, half);
                            const right = members.slice(half);
                            const maxLen = Math.max(left.length, right.length);
                            const rows = [];
                            for (let i = 0; i < maxLen; i++) {
                              const l = left[i];
                              const r = right[i];
                              rows.push(
                                <React.Fragment key={`${category}-row-${i}`}>
                                  <div
                                    key={`${category}-cell-left-${i}`}
                                    className="px-2 sm:px-3 md:px-4"
                                  >
                                    {l ? (
                                      <NameItem member={l} align="right" />
                                    ) : (
                                      <div className="py-0.5 sm:py-1 md:py-1.5" />
                                    )}
                                  </div>
                                  <div
                                    key={`${category}-cell-right-${i}`}
                                    className="px-2 sm:px-3 md:px-4"
                                  >
                                    {r ? (
                                      <NameItem member={r} align="left" />
                                    ) : (
                                      <div className="py-0.5 sm:py-1 md:py-1.5" />
                                    )}
                                  </div>
                                </React.Fragment>,
                              );
                            }
                            return rows;
                          })()}
                        </TwoColumnLayout>
                      </div>
                    );
                  })}

                  {/* Display any other categories not in the ordered list */}
                  {Object.keys(grouped)
                    .filter((cat) => !ROLE_CATEGORY_ORDER.includes(cat))
                    .map((category) => {
                      const members = grouped[category];
                      return (
                        <div key={category}>
                          <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                            <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                            <div className="w-1.5 h-1.5 bg-[#D4AF37]/50 rounded-full" />
                            <div className="h-px w-12 sm:w-16 md:w-20 bg-[#D4AF37]/40" />
                          </div>
                          <TwoColumnLayout
                            singleTitle={category}
                            centerContent={true}
                          >
                            {(() => {
                              if (members.length <= 2) {
                                return (
                                  <div className="col-span-full">
                                    <div className="max-w-sm mx-auto flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
                                      {members.map((member, idx) => (
                                        <NameItem
                                          key={`${category}-${idx}-${member.Name}`}
                                          member={member}
                                          align="center"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                );
                              }
                              // Pair row-by-row for other categories as well
                              const half = Math.ceil(members.length / 2);
                              const left = members.slice(0, half);
                              const right = members.slice(half);
                              const maxLen = Math.max(
                                left.length,
                                right.length,
                              );
                              const rows = [];
                              for (let i = 0; i < maxLen; i++) {
                                const l = left[i];
                                const r = right[i];
                                rows.push(
                                  <React.Fragment key={`${category}-row-${i}`}>
                                    <div
                                      key={`${category}-cell-left-${i}`}
                                      className="px-2 sm:px-3 md:px-4"
                                    >
                                      {l ? (
                                        <NameItem member={l} align="right" />
                                      ) : (
                                        <div className="py-0.5 sm:py-1 md:py-1.5" />
                                      )}
                                    </div>
                                    <div
                                      key={`${category}-cell-right-${i}`}
                                      className="px-2 sm:px-3 md:px-4"
                                    >
                                      {r ? (
                                        <NameItem member={r} align="left" />
                                      ) : (
                                        <div className="py-0.5 sm:py-1 md:py-1.5" />
                                      )}
                                    </div>
                                  </React.Fragment>,
                                );
                              }
                              return rows;
                            })()}
                          </TwoColumnLayout>
                        </div>
                      );
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}