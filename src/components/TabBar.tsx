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
      className="flex rounded-lg border border-slate-800 bg-slate-900 p-1"
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
            "flex-1 rounded-md py-2 text-xs font-medium transition-colors",
            active === tab.id
              ? "bg-cyan-600 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
