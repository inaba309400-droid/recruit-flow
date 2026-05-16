"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Layer, SelectionStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const LAYERS: Layer[] = ["本命", "準本命", "挑戦", "抑え"];
const STATUSES: SelectionStatus[] = [
  "ES作成中",
  "ES提出済",
  "書類通過",
  "WEBテスト中",
  "ES通過",
  "1次面接",
  "2次面接",
  "最終面接",
  "内定",
  "不合格",
];

export type CompanyFormData = {
  name: string;
  layer: Layer;
  status: SelectionStatus;
  mypageUrl: string;
  loginId: string;
  password: string;
  esDeadlineAt: string;
  webTestDeadlineAt: string;
};

const DEFAULT: CompanyFormData = {
  name: "",
  layer: "本命",
  status: "ES作成中",
  mypageUrl: "",
  loginId: "",
  password: "",
  esDeadlineAt: "",
  webTestDeadlineAt: "",
};

type Props = {
  title: string;
  initial?: Partial<CompanyFormData>;
  onSubmit: (data: CompanyFormData) => void;
};

export function CompanyForm({ title, initial, onSubmit }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<CompanyFormData>({ ...DEFAULT, ...initial });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function patch<K extends keyof CompanyFormData>(key: K, value: CompanyFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "企業名は必須です";
    if (form.mypageUrl && !form.mypageUrl.startsWith("https://"))
      e.mypageUrl = "https:// から始めてください";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) onSubmit(form);
  }

  return (
    <main className="min-h-dvh px-4 pb-12 pt-6">
      <header className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{title}</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="企業名 *" error={errors.name}>
          <input
            type="text"
            value={form.name}
            onChange={(e) => patch("name", e.target.value)}
            placeholder="例: 株式会社〇〇"
            className={inputCls(!!errors.name)}
          />
        </Field>

        <Field label="レイヤー">
          <div className="grid grid-cols-4 gap-1.5">
            {LAYERS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => patch("layer", l)}
                className={cn(
                  "rounded-xl py-2.5 text-xs font-semibold transition-colors",
                  form.layer === l
                    ? "bg-cyan-500 text-slate-900"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </Field>

        <Field label="選考ステータス">
          <select
            value={form.status}
            onChange={(e) => patch("status", e.target.value as SelectionStatus)}
            className={cn(inputCls(false), "dark:[color-scheme:dark]")}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="マイページ URL" error={errors.mypageUrl}>
          <input
            type="url"
            value={form.mypageUrl}
            onChange={(e) => patch("mypageUrl", e.target.value)}
            placeholder="https://..."
            className={inputCls(!!errors.mypageUrl)}
          />
        </Field>

        <Field label="ログイン ID">
          <input
            type="text"
            value={form.loginId}
            onChange={(e) => patch("loginId", e.target.value)}
            className={inputCls(false)}
          />
        </Field>

        <Field label="パスワード">
          <input
            type="text"
            value={form.password}
            onChange={(e) => patch("password", e.target.value)}
            className={inputCls(false)}
          />
        </Field>

        <Field label="ES 締切日">
          <input
            type="date"
            value={form.esDeadlineAt}
            onChange={(e) => patch("esDeadlineAt", e.target.value)}
            className={cn(inputCls(false), "dark:[color-scheme:dark]")}
          />
        </Field>

        <Field label="WEBテスト 締切日">
          <input
            type="date"
            value={form.webTestDeadlineAt}
            onChange={(e) => patch("webTestDeadlineAt", e.target.value)}
            className={cn(inputCls(false), "dark:[color-scheme:dark]")}
          />
        </Field>

        <button
          type="submit"
          className="mt-2 w-full rounded-2xl bg-cyan-500 py-4 text-sm font-semibold text-slate-900 transition-opacity active:opacity-80"
        >
          保存する
        </button>
      </form>
    </main>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white dark:bg-slate-800 px-3.5 py-3 text-sm",
    "text-slate-900 dark:text-slate-100 outline-none transition-colors",
    hasError
      ? "border-red-500"
      : "border-slate-200 dark:border-white/[0.08] focus:border-cyan-500 dark:focus:border-cyan-500"
  );
}
