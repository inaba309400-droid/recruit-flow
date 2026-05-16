"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useRecruitStore } from "@/lib/store";

export default function LockPage() {
  const lockPassword = useRecruitStore((s) => s.lockPassword);
  const router = useRouter();
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (input === lockPassword) {
      sessionStorage.setItem("rf_authed", "1");
      router.replace("/");
    } else {
      setError(true);
      setShaking(true);
      setInput("");
      setTimeout(() => setShaking(false), 500);
    }
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-surface px-8">
      <div className={shaking ? "animate-shake" : ""}>
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
            <Lock className="h-8 w-8 text-cyan-500" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">
            RecruitFlow
          </p>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            ロック解除
          </h1>
        </div>

        <form onSubmit={handleUnlock} className="w-full max-w-[280px] space-y-3">
          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(false);
              }}
              placeholder="パスワードを入力"
              autoFocus
              className={`w-full rounded-2xl border bg-white px-4 py-3.5 pr-12 text-center text-sm tracking-widest text-slate-900 outline-none transition-colors dark:bg-slate-800 dark:text-slate-100 ${
                error
                  ? "border-red-500"
                  : "border-slate-200 focus:border-cyan-500 dark:border-white/[0.08] dark:focus:border-cyan-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400"
              tabIndex={-1}
            >
              {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {error && (
            <p className="text-center text-xs font-medium text-red-500">
              パスワードが正しくありません
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-500 py-3.5 text-sm font-semibold text-slate-900 transition-opacity active:opacity-80"
          >
            ロック解除
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </main>
  );
}
