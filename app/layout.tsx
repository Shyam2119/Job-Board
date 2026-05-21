import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { BackToTop } from "@/components/layout/back-to-top";
import { siteConfig, createMetadata } from "@/lib/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...createMetadata({
    title: `${siteConfig.name} | Find Your Next Job`,
    description: siteConfig.description,
    path: "",
  }),
  title: {
    default: `${siteConfig.name} | Find Your Next Job`,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col font-sans antialiased`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
          <Toaster />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
