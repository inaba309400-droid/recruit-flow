import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RecruitFlow — 就活一元管理",
  description: "企業情報・選考ステータス・ES・面接記録を一元管理",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="mx-auto min-h-dvh w-full max-w-[390px] bg-slate-950 shadow-2xl shadow-black/50">
          {children}
        </div>
      </body>
    </html>
  );
}
