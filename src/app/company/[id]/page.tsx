"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { TabBar, type CompanyTab } from "@/components/TabBar";
import { BasicInfoTab } from "@/components/company/BasicInfoTab";
import { Badge } from "@/components/ui/badge";
import { useRecruitStore } from "@/lib/store";

type PageProps = {
  params: { id: string };
};

export default function CompanyDetailPage({ params }: PageProps) {
  const company = useRecruitStore((s) => s.getCompany(params.id));
  const [activeTab, setActiveTab] = useState<CompanyTab>("info");

  if (!company) {
    notFound();
  }

  return (
    <>
      <main className="min-h-dvh px-4 pb-24 pt-6">
        <header className="mb-5">
          <p className="text-xs text-slate-500">企業詳細</p>
          <h1 className="mt-1 text-xl font-bold text-slate-50">{company.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="layer">{company.layer}</Badge>
            <Badge variant="status">{company.status}</Badge>
          </div>
        </header>

        <TabBar active={activeTab} onChange={setActiveTab} />

        <div className="mt-4" role="tabpanel">
          {activeTab === "info" && <BasicInfoTab company={company} />}
          {activeTab === "timeline" && (
            <p className="rounded-xl border border-dashed border-slate-700 p-6 text-center text-sm text-slate-500">
              選考ログは次のフェーズで実装します
            </p>
          )}
          {activeTab === "es" && (
            <p className="rounded-xl border border-dashed border-slate-700 p-6 text-center text-sm text-slate-500">
              ES内容は次のフェーズで実装します
            </p>
          )}
        </div>
      </main>
      <BottomNav variant="company" companyId={company.id} />
    </>
  );
}
