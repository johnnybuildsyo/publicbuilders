import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Rethink_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"

const displayFont = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

const shareImage = "https://publicbuilders.org/screenshot.png"

export const metadata: Metadata = {
  title: "Public Builders",
  description: "A directory of who is who in #buildinpublic. Indie hackers, startup founders, and ambitious makers.",
  openGraph: {
    images: shareImage,
  },
  twitter: {
    images: shareImage,
  },
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} antialiased font-display`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col font-display">
            <Header />
            <main className="flex flex-col grow gap-4 row-start-2 justify-center items-center font-display">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
