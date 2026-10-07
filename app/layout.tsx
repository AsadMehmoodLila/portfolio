import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-controls";

import "./globals.css";


const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asadlilla.me"),
  title: "Asad Mehmood — AI, Games & Software",
  description:
    "Portfolio of Asad Mehmood, a BS Artificial Intelligence student and Roblox developer building AI applications, games, and practical software.",
  keywords: [
    "Asad Mehmood",
    "AI student",
    "Roblox developer",
    "FastAPI",
    "Streamlit",
    "emotion detection",
    "portfolio",
  ],
  authors: [{ name: "Asad Mehmood", url: "https://asadlilla.me" }],
  creator: "Asad Mehmood",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Asad Mehmood — AI, Games & Software",
    description: "Real projects across AI applications, Roblox development, and software engineering.",
    url: "https://asadlilla.me",
    siteName: "Asad Mehmood",
    images: [{ url: "/images/og-card.jpg", width: 1200, height: 630, alt: "Asad Mehmood portfolio" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asad Mehmood — AI, Games & Software",
    description: "Real projects across AI applications, Roblox development, and software engineering.",
    images: ["/images/og-card.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#f5f5f2",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <head>
        <meta name="referrer" content="no-referrer" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' blob:; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'" />
        <noscript><style>{".theme-toggle,.avatar-stage-bottom{display:none}"}</style></noscript>
      </head>
      <body>
        <ThemeProvider><a href="#main-content" className="skip-link">Skip to main content</a>
        {children}</ThemeProvider>
      </body>
    </html>
  );
}
