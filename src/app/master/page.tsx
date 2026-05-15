"use client";

import { BottomNav } from "@/components/BottomNav";
import { CopyButton } from "@/components/CopyButton";
import { Card } from "@/components/ui/card";
import { useRecruitStore } from "@/lib/store";

const sections = [
  { key: "gakuchika" as const, label: "ガクチカ", subtitle: "学生時代に力を入れたこと" },
  { key: "selfPR" as const, label: "自己PR", subtitle: "あなたの強み" },
  { key: "motivation" as const, label: "志望動機", subtitle: "コンサル志望軸" },
];

export default function MasterESPage() {
  const masterES = useRecruitStore((s) => s.masterES);

  return (
    <>
      <main className="min-h-dvh px-4 pb-24 pt-6">
        <header className="mb-6">
          <p className="text-xs font-medium uppercase tracking-widest text-cyan-500">
            Master ES
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-50">
            マスターES
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            各社ES作成時の原本テキスト
          </p>
        </header>

        <div className="space-y-4">
          {sections.map(({ key, label, subtitle }) => (
            <Card key={key}>
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-slate-100">{label}</h2>
                  <p className="text-xs text-slate-500">{subtitle}</p>
                </div>
                <CopyButton value={masterES[key]} label="コピー" />
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-400">
                {masterES[key]}
              </p>
            </Card>
          ))}
        </div>
      </main>
      <BottomNav variant="master" />
    </>
  );
}
