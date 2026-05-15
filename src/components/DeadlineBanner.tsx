import { AlertTriangle, Clock } from "lucide-react";
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

type DeadlineBannerProps = {
  alerts: DeadlineAlert[];
};

export function DeadlineBanner({ alerts }: DeadlineBannerProps) {
  if (alerts.length === 0) return null;

  return (
    <section className="space-y-2" aria-label="締切アラート">
      {alerts.map((alert) => {
        const isUrgent = alert.days <= 3;
        return (
          <div
            key={alert.companyId}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-3 py-2.5",
              isUrgent
                ? "border-red-500/40 bg-red-500/10"
                : "border-cyan-600/30 bg-cyan-600/5"
            )}
          >
            {isUrgent ? (
              <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
            ) : (
              <Clock className="h-4 w-4 shrink-0 text-cyan-500" />
            )}
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "truncate text-sm font-semibold",
                  isUrgent ? "text-red-400" : "text-slate-100"
                )}
              >
                {alert.companyName}
              </p>
              <p
                className={cn(
                  "text-xs",
                  isUrgent ? "text-red-400/80" : "text-slate-400"
                )}
              >
                {alert.label}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
