import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "ProfitPilot - AI-Powered Facebook Messenger Chatbots",
  description: "Automate Your Messenger, Elevate Your Business. Drive sales and delight customers with AI-powered chatbot system for Facebook.",
  keywords: "chatbot, facebook messenger, AI, automation, sales, customer service, ecommerce",
  authors: [{ name: "ProfitPilot" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "ProfitPilot - AI-Powered Facebook Messenger Chatbots",
    description: "Automate Your Messenger, Elevate Your Business with AI-powered chatbot system",
    type: "website",
    locale: "en_US",
    siteName: "ProfitPilot",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProfitPilot - AI-Powered Facebook Messenger Chatbots",
    description: "Automate Your Messenger, Elevate Your Business",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
