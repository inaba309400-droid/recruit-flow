"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Download,
  FileText,
  Home,
  Mic,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type BottomNavVariant = "home" | "company" | "interview" | "master";

type NavItem = {
  href: string;
  label: string;
  Icon: LucideIcon;
};

type BottomNavProps = {
  variant: BottomNavVariant;
  companyId?: string;
};

export function BottomNav({ variant, companyId }: BottomNavProps) {
  const pathname = usePathname();

  const items: Record<BottomNavVariant, NavItem[]> = {
    home: [
      { href: "/", label: "ホーム", Icon: Home },
      { href: "/master", label: "マスターES", Icon: FileText },
    ],
    company: [
      { href: "/", label: "戻る", Icon: ArrowLeft },
      {
        href: companyId ? `/interview/${companyId}` : "#",
        label: "面接記録",
        Icon: Mic,
      },
    ],
    interview: [
      {
        href: companyId ? `/company/${companyId}` : "/",
        label: "戻る",
        Icon: ArrowLeft,
      },
      { href: "#", label: "書き出す", Icon: Download },
    ],
    master: [
      { href: "/", label: "ホーム", Icon: Home },
      { href: "/master", label: "マスターES", Icon: FileText },
    ],
  };

  const navItems = items[variant];

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[390px] -translate-x-1/2 border-t border-white/[0.08] bg-surface">
      <div className="flex h-[4.25rem] items-stretch">
        {navItems.map((item) => {
          const isActive =
            item.href !== "#" &&
            (pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href)));

          const colorClass = isActive ? "text-cyan-500" : "text-slate-500";

          const inner = (
            <>
              <item.Icon className={cn("h-5 w-5", colorClass)} />
              <span className={cn("text-[10px] font-medium", colorClass)}>
                {item.label}
              </span>
            </>
          );

          if (item.href === "#") {
            return (
              <button
                key={item.label}
                type="button"
                className="flex flex-1 flex-col items-center justify-center gap-1 opacity-40"
                disabled
              >
                {inner}
              </button>
            );
          }

          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="flex flex-1 flex-col items-center justify-center gap-1"
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
