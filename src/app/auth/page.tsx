"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  // Already logged in → go home
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace("/");
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "login") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) {
        setError(err.message === "Invalid login credentials"
          ? "メールアドレスまたはパスワードが正しくありません"
          : err.message);
      } else {
        router.replace("/");
      }
    } else {
      const { error: err } = await supabase.auth.signUp({ email, password });
      if (err) {
        setError(err.message);
      } else {
        setSignupDone(true);
      }
    }

    setLoading(false);
  }

  function switchMode(m: "login" | "signup") {
    setMode(m);
    setError("");
    setSignupDone(false);
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-surface px-6">
      {/* Logo */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          RecruitFlow
        </h1>
        <p className="mt-1 text-sm text-slate-500">就活一元管理</p>
      </div>

      {/* Tabs */}
      <div className="mb-5 flex w-full max-w-[340px] rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={cn(
              "flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors",
              mode === m
                ? "bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-slate-50"
                : "text-slate-500"
            )}
          >
            {m === "login" ? "ログイン" : "アカウント作成"}
          </button>
        ))}
      </div>

      {signupDone ? (
        <div className="w-full max-w-[340px] rounded-2xl bg-cyan-50 px-5 py-6 text-center dark:bg-cyan-900/20">
          <p className="text-sm font-medium text-cyan-700 dark:text-cyan-400">
            確認メールを送信しました
          </p>
          <p className="mt-1 text-xs text-slate-500">
            メール内のリンクをクリックしてアカウントを有効化してください
          </p>
          <button
            onClick={() => switchMode("login")}
            className="mt-4 text-sm font-semibold text-cyan-600"
          >
            ログインに戻る
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-[340px] space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレス"
            required
            autoComplete="email"
            className={inputCls}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード（6文字以上）"
            required
            minLength={6}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className={inputCls}
          />
          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-500 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-cyan-500 py-3.5 text-sm font-bold text-slate-900 transition-opacity disabled:opacity-50 active:opacity-80"
          >
            {loading ? "処理中..." : mode === "login" ? "ログイン" : "アカウントを作成"}
          </button>
        </form>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-500 dark:border-white/[0.08] dark:bg-slate-800 dark:text-slate-100 dark:focus:border-cyan-500";
