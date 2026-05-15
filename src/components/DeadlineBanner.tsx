import Link from "next/link";
import type { Company } from "@/lib/types";
import { getNearestDeadline } from "@/lib/dates";
import { cn } from "@/lib/utils";

export type DeadlineAlert = {
  companyId: string;
  companyName: string;
  label: string;
  days: number;
};

export function getDeadlineAlerts(companies: Company[], limit = 3): DeadlineAlert[] {
  return companies
    .map((company) => {
      const deadline = getNearestDeadline(company);
      if (!deadline) return null;
      return {
        companyId: company.id,
        companyName: company.name,
        label: deadline.label,
        days: deadline.days,
      };
    })
    .filter((a): a is DeadlineAlert => a !== null)
    .sort((a, b) => a.days - b.days)
    .slice(0, limit);
}

function alertAccent(days: number) {
  if (days <= 3) return "border-l-red-500";
  if (days <= 7) return "border-l-amber-400";
  return "border-l-cyan-500";
}

type DeadlineBannerProps = {
  alerts: DeadlineAlert[];
};

export function DeadlineBanner({ alerts }: DeadlineBannerProps) {
  if (alerts.length === 0) return null;

  return (
    <section className="space-y-2" aria-label="締切アラート">
      {alerts.map((alert) => (
        <Link
          key={alert.companyId}
          href={`/company/${alert.companyId}`}
          className={cn(
            "block rounded-2xl border border-white/[0.08] border-l-4 bg-card py-3 pl-3 pr-4 transition-colors hover:bg-slate-700/50",
            alertAccent(alert.days)
          )}
        >
          <p className="truncate text-sm font-semibold text-slate-100">
            {alert.companyName}
          </p>
          <p className="mt-0.5 text-xs text-slate-400">{alert.label}</p>
        </Link>
      ))}
    </section>
  );
}
