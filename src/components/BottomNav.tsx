"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Download,
  FileText,
  Home,
  Mic,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type BottomNavVariant = "home" | "company" | "interview" | "master";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

type BottomNavProps = {
  variant: BottomNavVariant;
  companyId?: string;
};

export function BottomNav({ variant, companyId }: BottomNavProps) {
  const pathname = usePathname();

  const items: Record<BottomNavVariant, NavItem[]> = {
    home: [
      { href: "/", label: "ホーム", icon: <Home className="h-5 w-5" /> },
      { href: "/master", label: "マスターES", icon: <FileText className="h-5 w-5" /> },
    ],
    company: [
      { href: "/", label: "戻る", icon: <ArrowLeft className="h-5 w-5" /> },
      {
        href: companyId ? `/interview/${companyId}` : "#",
        label: "面接記録",
        icon: <Mic className="h-5 w-5" />,
      },
    ],
    interview: [
      {
        href: companyId ? `/company/${companyId}` : "/",
        label: "戻る",
        icon: <ArrowLeft className="h-5 w-5" />,
      },
      { href: "#", label: "書き出す", icon: <Download className="h-5 w-5" /> },
    ],
    master: [
      { href: "/", label: "ホーム", icon: <Home className="h-5 w-5" /> },
      { href: "/master", label: "マスターES", icon: <FileText className="h-5 w-5" /> },
    ],
  };

  const navItems = items[variant];

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[390px] -translate-x-1/2 border-t border-slate-800 bg-slate-900/95 backdrop-blur">
      <div className="flex h-16 items-stretch">
        {navItems.map((item) => {
          const isActive =
            item.href !== "#" &&
            (pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href)));

          const content = (
            <>
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  isActive && "bg-cyan-600/20 text-cyan-500"
                )}
              >
                {item.icon}
              </span>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isActive ? "text-cyan-500" : "text-slate-400"
                )}
              >
                {item.label}
              </span>
            </>
          );

          if (item.href === "#") {
            return (
              <button
                key={item.label}
                type="button"
                className="flex flex-1 flex-col items-center justify-center gap-0.5 text-slate-400"
                disabled
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="flex flex-1 flex-col items-center justify-center gap-0.5 text-slate-400 transition-colors hover:text-slate-200"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
