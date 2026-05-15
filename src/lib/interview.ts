import type { Company } from "./types";

export function getConsistencyScore(company: Company): number {
  if (company.interviewLogs.length === 0) return 0;

  const base = 62;
  const perLog = Math.min(company.interviewLogs.length * 8, 24);
  const statusBonus =
    company.status.includes("面接") || company.status === "ES通過" ? 12 : 0;

  return Math.min(98, base + perLog + statusBonus);
}

export function getConsistencyComment(score: number): string {
  if (score === 0) return "面接記録を追加するとスコアが算出されます";
  if (score >= 85) return "ES・ガクチカとの整合性が高いです";
  if (score >= 70) return "概ね一貫しています。具体例の補強を推奨";
  if (score >= 55) return "一部で志望動機と回答にギャップがあります";
  return "回答内容の見直しを推奨します";
}
