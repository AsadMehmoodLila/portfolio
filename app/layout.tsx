import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

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
  themeColor: "#08090c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
