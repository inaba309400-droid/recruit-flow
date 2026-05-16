import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ThemeInitializer } from "@/components/ThemeInitializer";
import { AuthGuard } from "@/components/AuthGuard";
import { SupabaseSync } from "@/components/SupabaseSync";
import "./globals.css";

// Runs before React hydration to prevent theme flash
const themeScript = `(function(){try{var s=localStorage.getItem('recruit-flow-storage');var d=JSON.parse(s);var m=d&&d.state&&d.state.themeMode;document.documentElement.classList.toggle('dark',m!=='light')}catch(e){document.documentElement.classList.add('dark')}})()`;


export const metadata: Metadata = {
  title: "RecruitFlow — 就活一元管理",
  description: "企業情報・選考ステータス・ES・面接記録を一元管理",
  manifest: "/manifest.json",
  applicationName: "RecruitFlow",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RecruitFlow",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeInitializer />
        <SupabaseSync />
        <AuthGuard>
          <div className="mx-auto min-h-dvh w-full max-w-[390px] bg-surface">
            {children}
          </div>
        </AuthGuard>
      </body>
    </html>
  );
}
