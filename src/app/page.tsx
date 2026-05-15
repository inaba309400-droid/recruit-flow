"use client";

import { BottomNav } from "@/components/BottomNav";
import { CompanyCard } from "@/components/CompanyCard";
import {
  DeadlineBanner,
  getDeadlineAlerts,
} from "@/components/DeadlineBanner";
import { useRecruitStore } from "@/lib/store";

export default function HomePage() {
  const companies = useRecruitStore((s) => s.companies);
  const alerts = getDeadlineAlerts(companies, 3);

  return (
    <>
      <main className="min-h-dvh px-4 pb-24 pt-6">
        <header className="mb-6">
          <p className="text-xs font-medium uppercase tracking-widest text-cyan-600">
            RecruitFlow
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-50">企業一覧</h1>
          <p className="mt-1 text-sm text-slate-400">
            {companies.length}社を管理中
          </p>
        </header>

        {alerts.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              締切アラート
            </h2>
            <DeadlineBanner alerts={alerts} />
          </div>
        )}

        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            すべての企業
          </h2>
          <ul className="space-y-3">
            {companies.map((company) => (
              <li key={company.id}>
                <CompanyCard company={company} />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <BottomNav variant="home" />
    </>
  );
}
