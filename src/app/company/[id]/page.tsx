"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { TabBar, type CompanyTab } from "@/components/TabBar";
import { BasicInfoTab } from "@/components/company/BasicInfoTab";
import { ESTab } from "@/components/company/ESTab";
import { TimelineTab } from "@/components/company/TimelineTab";
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
          <p className="text-xs font-medium text-slate-500">企業詳細</p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-50">
            {company.name}
          </h1>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <Badge layer={company.layer} />
            <Badge variant="status">{company.status}</Badge>
          </div>
        </header>

        <TabBar active={activeTab} onChange={setActiveTab} />

        <div className="mt-4" role="tabpanel">
          {activeTab === "info" && <BasicInfoTab company={company} />}
          {activeTab === "timeline" && <TimelineTab company={company} />}
          {activeTab === "es" && <ESTab company={company} />}
        </div>
      </main>
      <BottomNav variant="company" companyId={company.id} />
    </>
  );
}
