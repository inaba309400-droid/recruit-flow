"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogOut, Moon, Sun } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useRecruitStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const store = useRecruitStore();
  const router = useRouter();

  async function handleLogout() {
    await store.logout();
    router.replace("/auth");
  }

  return (
    <>
      <main className="min-h-dvh px-4 pb-24 pt-6">
        <header className="mb-6">
          <p className="text-xs font-medium uppercase tracking-widest text-cyan-500">
            Settings
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            設定
          </h1>
        </header>

        <div className="space-y-6">
          <SecuritySection
            lockEnabled={store.lockEnabled}
            lockPassword={store.lockPassword}
            setLockEnabled={store.setLockEnabled}
            setLockPassword={store.setLockPassword}
          />
          <AccountSection
            displayName={store.displayName}
            defaultEmail={store.defaultEmail}
            defaultPassword={store.defaultPassword}
            setDisplayName={store.setDisplayName}
            setDefaultEmail={store.setDefaultEmail}
            setDefaultPassword={store.setDefaultPassword}
          />
          <ThemeSection
            themeMode={store.themeMode}
            setThemeMode={store.setThemeMode}
          />
          <DataSection resetData={store.resetData} />
          <LogoutSection onLogout={handleLogout} />
        </div>
      </main>
      <BottomNav variant="settings" />
    </>
  );
}

/* ── Section: セキュリティ ─────────────────────── */

function SecuritySection({
  lockEnabled,
  lockPassword,
  setLockEnabled,
  setLockPassword,
}: {
  lockEnabled: boolean;
  lockPassword: string;
  setLockEnabled: (v: boolean) => void;
  setLockPassword: (v: string) => void;
}) {
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);

  function handleToggle() {
    if (!lockEnabled && !lockPassword) {
      // Enable but no password yet — just open the form
      setLockEnabled(true);
    } else {
      setLockEnabled(!lockEnabled);
    }
  }

  function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    if (!newPw) return setPwError("パスワードを入力してください");
    if (newPw !== confirmPw) return setPwError("パスワードが一致しません");
    setLockPassword(newPw);
    if (!lockEnabled) setLockEnabled(true);
    setNewPw("");
    setConfirmPw("");
    setPwSuccess(true);
    setTimeout(() => setPwSuccess(false), 2000);
  }

  return (
    <Section label="セキュリティ">
      {/* Toggle row */}
      <div className="flex items-center justify-between px-4 py-3.5">
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            パスワードロック
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            {lockEnabled && lockPassword ? "有効" : "無効"}
          </p>
        </div>
        <Toggle checked={lockEnabled && !!lockPassword} onChange={handleToggle} />
      </div>

      {/* Password form */}
      <div className="border-t border-slate-200 px-4 pt-3.5 pb-4 dark:border-white/[0.08]">
        <p className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">
          {lockPassword ? "パスワードを変更" : "パスワードを設定"}
        </p>
        <form onSubmit={handleSetPassword} className="space-y-2.5">
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="新しいパスワード"
              className={inputCls}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400"
              tabIndex={-1}
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <input
            type={showPw ? "text" : "password"}
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            placeholder="確認用パスワード"
            className={inputCls}
          />
          {pwError && <p className="text-xs text-red-500">{pwError}</p>}
          {pwSuccess && (
            <p className="text-xs font-medium text-cyan-500">パスワードを設定しました</p>
          )}
          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-500 py-2.5 text-sm font-semibold text-slate-900 transition-opacity active:opacity-80"
          >
            設定する
          </button>
        </form>
      </div>
    </Section>
  );
}

/* ── Section: アカウント設定 ──────────────────── */

function AccountSection({
  displayName,
  defaultEmail,
  defaultPassword,
  setDisplayName,
  setDefaultEmail,
  setDefaultPassword,
}: {
  displayName: string;
  defaultEmail: string;
  defaultPassword: string;
  setDisplayName: (v: string) => void;
  setDefaultEmail: (v: string) => void;
  setDefaultPassword: (v: string) => void;
}) {
  return (
    <Section label="アカウント設定">
      <div className="divide-y divide-slate-200 dark:divide-white/[0.08]">
        <AccountRow label="表示名" value={displayName} onChange={setDisplayName} placeholder="例: 田中 太郎" />
        <AccountRow label="デフォルトメール" value={defaultEmail} onChange={setDefaultEmail} placeholder="example@mail.com" type="email" />
        <AccountRow label="デフォルトパスワード" value={defaultPassword} onChange={setDefaultPassword} placeholder="共通パスワード" type="password" />
      </div>
    </Section>
  );
}

function AccountRow({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function save() {
    onChange(draft);
    setEditing(false);
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <p className="w-28 shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>
      {editing ? (
        <div className="flex flex-1 gap-2">
          <input
            type={type}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={placeholder}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && save()}
            className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-slate-800 dark:text-slate-100"
          />
          <button
            onClick={save}
            className="rounded-lg bg-cyan-500 px-2.5 py-1.5 text-xs font-semibold text-slate-900"
          >
            保存
          </button>
        </div>
      ) : (
        <button
          className="flex-1 text-left text-sm text-slate-900 dark:text-slate-100"
          onClick={() => { setDraft(value); setEditing(true); }}
        >
          {value || <span className="text-slate-400">{placeholder}</span>}
        </button>
      )}
    </div>
  );
}

/* ── Section: テーマ ──────────────────────────── */

function ThemeSection({
  themeMode,
  setThemeMode,
}: {
  themeMode: "dark" | "light";
  setThemeMode: (v: "dark" | "light") => void;
}) {
  return (
    <Section label="テーマ設定">
      <div className="flex gap-2 px-4 py-3.5">
        {(["dark", "light"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setThemeMode(mode)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-colors",
              themeMode === mode
                ? "bg-cyan-500 text-slate-900"
                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
            )}
          >
            {mode === "dark" ? (
              <><Moon className="h-4 w-4" /> ダーク</>
            ) : (
              <><Sun className="h-4 w-4" /> ライト</>
            )}
          </button>
        ))}
      </div>
    </Section>
  );
}

/* ── Section: データ管理 ──────────────────────── */

function DataSection({ resetData }: { resetData: () => void }) {
  const [confirming, setConfirming] = useState(false);

  function handleReset() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    resetData();
    setConfirming(false);
  }

  return (
    <Section label="データ管理">
      <div className="px-4 py-3.5">
        <button
          onClick={handleReset}
          className={cn(
            "w-full rounded-xl py-3 text-sm font-semibold transition-colors",
            confirming
              ? "bg-red-500 text-white"
              : "bg-red-500/10 text-red-500"
          )}
        >
          {confirming ? "もう一度タップで確定" : "データをリセット"}
        </button>
        <p className="mt-2 text-center text-xs text-slate-500">
          企業データをサンプルデータに戻します
        </p>
      </div>
    </Section>
  );
}

/* ── Section: ログアウト ──────────────────────── */

function LogoutSection({ onLogout }: { onLogout: () => void }) {
  const [confirming, setConfirming] = useState(false);

  function handleClick() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    onLogout();
  }

  return (
    <Section label="アカウント">
      <div className="px-4 py-3.5">
        <button
          onClick={handleClick}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors",
            confirming
              ? "bg-red-500 text-white"
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          )}
        >
          <LogOut className="h-4 w-4" />
          {confirming ? "もう一度タップで確定" : "ログアウト"}
        </button>
      </div>
    </Section>
  );
}

/* ── Shared UI ────────────────────────────────── */

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-card dark:border-white/[0.08]">
        {children}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200",
        checked ? "bg-cyan-500" : "bg-slate-300 dark:bg-slate-700"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-cyan-500 dark:border-white/[0.08] dark:bg-slate-800 dark:text-slate-100 dark:focus:border-cyan-500";
