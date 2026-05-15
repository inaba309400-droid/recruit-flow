"use client";

import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { CompanyCardCompact } from "@/components/CompanyCard";
import {
  DeadlineBanner,
  getDeadlineAlerts,
} from "@/components/DeadlineBanner";
import { useRecruitStore } from "@/lib/store";
import { daysUntil } from "@/lib/dates";
import type { Company, Layer } from "@/lib/types";
import { cn } from "@/lib/utils";

const LAYER_ORDER: Layer[] = ["挑戦", "本命", "準本命", "抑え"];

type SortKey = "ES締切" | "WEBテスト締切" | "更新順";
const SORT_KEYS: SortKey[] = ["ES締切", "WEBテスト締切", "更新順"];

function sortCompanies(companies: Company[], key: SortKey): Company[] {
  if (key === "更新順") return companies;

  return [...companies].sort((a, b) => {
    const dateA = key === "ES締切" ? a.esDeadlineAt : a.webTestDeadlineAt;
    const dateB = key === "ES締切" ? b.esDeadlineAt : b.webTestDeadlineAt;

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    return daysUntil(dateA) - daysUntil(dateB);
  });
}

export default function HomePage() {
  const companies = useRecruitStore((s) => s.companies);
  const alerts = getDeadlineAlerts(companies, 3);
  const [sortKey, setSortKey] = useState<SortKey>("更新順");

  const grouped = LAYER_ORDER.map((layer) => ({
    layer,
    companies: sortCompanies(
      companies.filter((c) => c.layer === layer),
      sortKey
    ),
  })).filter((g) => g.companies.length > 0);

  return (
    <>
      <main className="min-h-dvh px-4 pb-24 pt-6">
        <header className="mb-5">
          <p className="text-xs font-medium uppercase tracking-widest text-cyan-500">
            RecruitFlow
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50">
            企業一覧
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {companies.length}社を管理中
          </p>
        </header>

        {/* Sort buttons */}
        <div className="mb-5 flex gap-2">
          {SORT_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setSortKey(key)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                sortKey === key
                  ? "bg-cyan-500 text-slate-900"
                  : "bg-slate-800 text-slate-400 hover:text-slate-200"
              )}
            >
              {key}
            </button>
          ))}
        </div>

        {alerts.length > 0 && (
          <section className="mb-5">
            <h2 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              締切アラート
            </h2>
            <DeadlineBanner alerts={alerts} />
          </section>
        )}

        {/* Layer-grouped companies */}
        <div className="space-y-6">
          {grouped.map(({ layer, companies: layerCompanies }) => (
            <section key={layer}>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3.5 w-[3px] rounded-full bg-cyan-500" />
                <h2
                  className="font-semibold text-slate-400"
                  style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}
                >
                  {layer}
                </h2>
              </div>
              <div className="grid grid-cols-2" style={{ gap: 8 }}>
                {layerCompanies.map((company) => (
                  <CompanyCardCompact key={company.id} company={company} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <BottomNav variant="home" />
    </>
  );
}
