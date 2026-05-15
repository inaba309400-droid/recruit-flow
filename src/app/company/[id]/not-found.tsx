import Link from "next/link";

export default function CompanyNotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 pb-24 text-center">
      <h1 className="text-lg font-semibold text-slate-100">企業が見つかりません</h1>
      <p className="mt-2 text-sm text-slate-400">
        一覧に戻って別の企業を選択してください。
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-cyan-600 px-4 text-sm font-medium text-white hover:bg-cyan-500"
      >
        ホームへ戻る
      </Link>
    </main>
  );
}
