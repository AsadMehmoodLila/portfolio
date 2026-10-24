import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-controls";
import { HeroFlybys } from "@/components/portfolio/hero-flybys";
import { EffectsProvider } from "@/components/portfolio/effects-provider";

import "./portfolio.css";
import "./game.css";

const display = Chakra_Petch({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asadlilla.me"),
  title: {
    default: "ScriptLilla | Roblox Scripter",
    template: "%s | ScriptLilla",
  },
  description:
    "Roblox scripting by Asad Mehmood, known as ScriptLilla. Gameplay systems, player data, inventory, round loops and focused integrations. Discuss your commission.",
  keywords: [
    "Asad Mehmood",
    "Roblox scripter",
    "Roblox scripting commissions",
    "Luau",
    "ScriptLilla",
    "gameplay systems",
    "portfolio",
  ],
  authors: [{ name: "Asad Mehmood", url: "https://asadlilla.me" }],
  creator: "Asad Mehmood",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ScriptLilla | Roblox Scripter",
    description:
      "Gameplay, player data and game loops for your Roblox experience. Explore the work and discuss a scoped commission.",
    url: "https://asadlilla.me",
    siteName: "ScriptLilla",
    images: [
      {
        url: "/images/portfolio-social.png",
        width: 1200,
        height: 630,
        alt: "ScriptLilla, Roblox scripting by Asad Mehmood",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScriptLilla | Roblox Scripter",
    description:
      "Gameplay systems, player data and game loops for Roblox experiences.",
    images: ["/images/portfolio-social.png"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0c1018",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="night"
      className={`${geist.variable} ${display.variable}`}
    >
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:; font-src 'self'; connect-src 'self' blob: https://formspree.io; frame-src https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self'; form-action 'none'"
        />
        <noscript>
          <style>
            {
              ".theme-toggle,.mobile-menu-toggle,.brief-builder,.contact-quest,.character-controls,.character-activate,.character-hint,.profile-topics,.profile-story-controls{display:none}"
            }
          </style>
        </noscript>
      </head>
      <body>
        <ThemeProvider>
          <EffectsProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            {children}
            <HeroFlybys />
          </EffectsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
