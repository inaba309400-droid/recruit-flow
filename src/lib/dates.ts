/** 日付文字列 (YYYY-MM-DD) から残日数を算出（当日=0、過去は負） */
export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr + "T23:59:59");
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatDeadlineLabel(days: number): string {
  if (days < 0) return "期限超過";
  if (days === 0) return "本日締切";
  return `残${days}日`;
}

/** 企業の最も近い締切とラベルを返す */
export function getNearestDeadline(company: {
  esDeadlineAt?: string;
  webTestDeadlineAt?: string;
  interviewDates: string[];
  status: string;
}): { date: string; label: string; days: number } | null {
  const candidates: { date: string; kind: string }[] = [];

  if (company.esDeadlineAt) {
    candidates.push({ date: company.esDeadlineAt, kind: "ES" });
  }
  if (company.webTestDeadlineAt) {
    candidates.push({ date: company.webTestDeadlineAt, kind: "WEBテスト" });
  }
  for (const d of company.interviewDates) {
    candidates.push({ date: d, kind: "面接" });
  }

  const future = candidates
    .map((c) => ({ ...c, days: daysUntil(c.date) }))
    .filter((c) => c.days >= 0)
    .sort((a, b) => a.days - b.days);

  if (future.length === 0) return null;

  const nearest = future[0];
  return {
    date: nearest.date,
    label: `${nearest.kind} ${formatDeadlineLabel(nearest.days)}`,
    days: nearest.days,
  };
}
