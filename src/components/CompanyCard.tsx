import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import type { Company } from "@/lib/types";
import { getNearestDeadline } from "@/lib/dates";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CompanyCardProps = {
  company: Company;
};

export function CompanyCardCompact({ company }: CompanyCardProps) {
  const deadline = getNearestDeadline(company);
  const isUrgent = deadline !== null && deadline.days <= 3;

  return (
    <Link
      href={`/company/${company.id}`}
      className="block transition-colors hover:bg-slate-700/60 active:scale-[0.98]"
      style={{
        backgroundColor: "#1e293b",
        borderRadius: 12,
        padding: 12,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h2 className="text-[14px] font-semibold leading-snug text-slate-50">
        {company.name}
      </h2>
      <div className="mt-1.5 flex flex-wrap gap-1">
        <Badge layer={company.layer} />
        <Badge variant="status">{company.status}</Badge>
      </div>
      {deadline && (
        <div
          className={cn(
            "mt-1.5 flex items-center gap-1 text-[11px] font-medium",
            isUrgent ? "text-red-400" : "text-slate-500"
          )}
        >
          <Clock className="h-3 w-3" />
          <span>{deadline.label}</span>
        </div>
      )}
    </Link>
  );
}

export function CompanyCard({ company }: CompanyCardProps) {
  const deadline = getNearestDeadline(company);
  const isUrgent = deadline !== null && deadline.days <= 3;

  return (
    <Link
      href={`/company/${company.id}`}
      className="block rounded-2xl border border-white/[0.08] bg-card p-4 transition-colors hover:bg-slate-700/60 active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[15px] font-semibold text-slate-50">
            {company.name}
          </h2>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <Badge layer={company.layer} />
            <Badge variant="status">{company.status}</Badge>
          </div>
        </div>
        <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" />
      </div>

      {deadline && (
        <div
          className={cn(
            "mt-3 flex items-center gap-1.5 text-xs font-medium",
            isUrgent ? "text-red-400" : "text-slate-500"
          )}
        >
          <Clock className="h-3.5 w-3.5" />
          <span>{deadline.label}</span>
        </div>
      )}
    </Link>
  );
}
