"use client";

import { cn } from "@/lib/utils";

export type CompanyTab = "info" | "timeline" | "es";

type TabBarProps = {
  active: CompanyTab;
  onChange: (tab: CompanyTab) => void;
};

const tabs: { id: CompanyTab; label: string }[] = [
  { id: "info", label: "基本情報" },
  { id: "timeline", label: "選考ログ" },
  { id: "es", label: "ES内容" },
];

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div
      className="flex gap-1 rounded-2xl border border-white/[0.08] bg-card p-1"
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex-1 rounded-xl py-2.5 text-xs font-medium transition-colors",
            active === tab.id
              ? "bg-cyan-500 text-slate-900"
              : "text-slate-500 hover:text-slate-300"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
