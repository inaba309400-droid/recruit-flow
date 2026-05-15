"use client";

import { useState } from "react";
import { ExternalLink, Eye, EyeOff } from "lucide-react";
import type { Company } from "@/lib/types";
import { CopyButton } from "@/components/CopyButton";

type BasicInfoTabProps = {
  company: Company;
};

function InfoRow({
  label,
  value,
  masked,
  copyValue,
}: {
  label: string;
  value: string;
  masked?: boolean;
  copyValue?: string;
}) {
  const [visible, setVisible] = useState(!masked);

  const displayValue = masked && !visible ? "••••••••••" : value;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <div className="flex items-center gap-2">
        <p className="min-w-0 flex-1 break-all text-sm text-slate-100">
          {displayValue}
        </p>
        {masked && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
            aria-label={visible ? "パスワードを隠す" : "パスワードを表示"}
          >
            {visible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
        <CopyButton value={copyValue ?? value} />
      </div>
    </div>
  );
}

export function BasicInfoTab({ company }: BasicInfoTabProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          マイページ URL
        </p>
        <div className="flex items-center gap-2">
          <a
            href={company.mypageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 flex-1 items-center gap-1 text-sm text-cyan-500 hover:underline"
          >
            <span className="truncate">{company.mypageUrl}</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
          </a>
          <CopyButton value={company.mypageUrl} />
        </div>
      </div>

      <InfoRow label="ログイン ID" value={company.loginId} />
      <InfoRow
        label="パスワード"
        value={company.password}
        masked
        copyValue={company.password}
      />
    </div>
  );
}
