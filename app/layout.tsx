import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter, Crimson_Text, Ephesis } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })
const crimsonText = Crimson_Text({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-crimson" 
})
const ephesis = Ephesis({ 
  subsets: ["latin"], 
  weight: "400",
  variable: "--font-ephesis" 
})
const chicanos = localFont({
  src: "../chicanos-font/ChicanosPersonalUseRegular-qZDw5.ttf",
  variable: "--font-chicanos",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Bryan & Mel Colleen - Wedding Invitation",
  description:
    "You're invited to the wedding of Bryan & Mel Colleen! Join us on April 19, 2026 at Nature's Village Resort - East Garden, Talisay City, Negros Occidental. RSVP, read our love story, view our gallery, and leave a message for the couple.",
  keywords:
    "Bryan & Mel Colleen wedding, Filipino wedding, RSVP, wedding gallery, wedding message wall, wedding invitation, 2026 weddings, love story, guestbook, wedding registry, wedding details, Nature's Village Resort, Talisay City, Negros Occidental, #BryanAndMelColleen",
  authors: [
    { name: "Bryan" },
    { name: "Mel Colleen" },
  ],
  creator: "Bryan & Mel Colleen",
  publisher: "Bryan & Mel Colleen",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://bryan-melcolleen-wedding.vercel.app/"),
  alternates: {
    canonical: "https://bryan-melcolleen-wedding.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Bryan & Mel Colleen Wedding | April 19, 2026",
    description:
      "Celebrate the union of Bryan & Mel Colleen on April 19, 2026 at Nature's Village Resort, Talisay City, Negros Occidental. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://bryan-melcolleen-wedding.vercel.app/",
    siteName: "Bryan and Mel Colleen Wedding",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://bryan-melcolleen-wedding.vercel.app/Details/LinkPreviewnew.jpg",
        width: 1200,
        height: 630,
        alt: "Bryan & Mel Colleen Wedding Invitation - April 19, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
        title: "Bryan & Mel Colleen Wedding Invitation",
    description:
      "You're invited to the wedding of Bryan & Mel Colleen! April 19, 2026. RSVP, view our gallery, and leave a message! #BryanAndMelColleen",
    images: ["https://bryan-melcolleen-wedding.vercel.app/Details/LinkPreviewnew.jpg"],
    creator: "@bryanmelcolleen",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
        name: "Bryan & Mel Colleen Wedding",
      startDate: "2026-04-19T16:30:00+08:00",
      endDate: "2026-04-19T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "Nature's Village Resort - East Garden, Talisay City, Negros Occidental",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Nature's Village Resort, Talisay City",
            addressLocality: "Talisay City",
            addressRegion: "Negros Occidental",
            postalCode: "6115",
            addressCountry: "PH",
          },
        },
        {
          "@type": "Place",
          name: "Nature's Village Resort - Padre Pio B Function Hall, Talisay City, Negros Occidental",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Nature's Village Resort, Talisay City",
            addressLocality: "Talisay City",
            addressRegion: "Negros Occidental",
            postalCode: "6115",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://bryan-melcolleen-wedding.vercel.app/Details/LinkPreviewnew.jpg"],
      description:
        "You're invited to the wedding of Bryan & Mel Colleen! Join us on April 19, 2026 at Nature's Village Resort, Talisay City, Negros Occidental. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Bryan & Mel Colleen",
      },
      offers: {
        "@type": "Offer",
        url: "https://bryan-melcolleen-wedding.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
          eventHashtag: "#BryanAndMelColleen",
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#D4AF37" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} ${crimsonText.variable} ${ephesis.variable} ${chicanos.variable} font-inter antialiased text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
