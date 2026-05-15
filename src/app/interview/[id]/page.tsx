"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { Mic, Square } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { ScoreRing } from "@/components/ScoreRing";
import { Card } from "@/components/ui/card";
import {
  getConsistencyComment,
  getConsistencyScore,
} from "@/lib/interview";
import { useRecruitStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type PageProps = {
  params: { id: string };
};

function formatRecordedAt(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function InterviewPage({ params }: PageProps) {
  const company = useRecruitStore((s) => s.getCompany(params.id));
  const [isRecording, setIsRecording] = useState(false);

  if (!company) {
    notFound();
  }

  const score = getConsistencyScore(company);
  const comment = getConsistencyComment(score);

  return (
    <>
      <main className="min-h-dvh px-4 pb-24 pt-6">
        <header className="mb-6">
          <p className="text-xs font-medium text-slate-500">面接アーカイブ</p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-50">
            {company.name}
          </h1>
        </header>

        <Card className="flex flex-col items-center py-6">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
            AI整合性スコア
          </p>
          <ScoreRing score={score} />
          <p className="mt-4 max-w-[260px] text-center text-sm text-slate-400">
            {comment}
          </p>
        </Card>

        <div className="mt-6 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setIsRecording((r) => !r)}
            className={cn(
              "flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all",
              isRecording
                ? "border-red-500 bg-red-500/20 text-red-400"
                : "border-cyan-500 bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20"
            )}
            aria-label={isRecording ? "録音停止" : "録音開始"}
          >
            {isRecording ? (
              <Square className="h-8 w-8 fill-current" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </button>
          <p className="mt-3 text-xs text-slate-500">
            {isRecording ? "録音中…（デモ）" : "タップして録音（準備中）"}
          </p>
        </div>

        <section className="mt-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Q&Aログ
          </h2>
          {company.interviewLogs.length === 0 ? (
            <Card className="py-8 text-center">
              <p className="text-sm text-slate-500">
                面接記録はまだありません
              </p>
            </Card>
          ) : (
            <ul className="space-y-3">
              {company.interviewLogs.map((log, index) => (
                <Card key={`${log.recordedAt}-${index}`}>
                  <p className="text-[10px] font-medium text-slate-500">
                    {formatRecordedAt(log.recordedAt)}
                  </p>
                  <p className="mt-2 text-sm font-medium text-cyan-500">Q</p>
                  <p className="mt-0.5 text-sm text-slate-100">{log.question}</p>
                  <p className="mt-3 text-sm font-medium text-slate-500">A</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-400">
                    {log.answer}
                  </p>
                </Card>
              ))}
            </ul>
          )}
        </section>
      </main>
      <BottomNav variant="interview" companyId={company.id} />
    </>
  );
}
