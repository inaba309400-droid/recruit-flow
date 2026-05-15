import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import type { Company } from "@/lib/types";
import { getNearestDeadline } from "@/lib/dates";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const layerColors: Record<Company["layer"], string> = {
  本命: "border-orange-500/50 text-orange-400 bg-orange-500/10",
  準本命: "border-cyan-600/50 text-cyan-500 bg-cyan-600/10",
  挑戦: "border-violet-500/50 text-violet-400 bg-violet-500/10",
  抑え: "border-slate-500/50 text-slate-400 bg-slate-500/10",
};

type CompanyCardProps = {
  company: Company;
};

export function CompanyCard({ company }: CompanyCardProps) {
  const deadline = getNearestDeadline(company);
  const isUrgent = deadline !== null && deadline.days <= 3;

  return (
    <Link
      href={`/company/${company.id}`}
      className="block rounded-xl border border-slate-800 bg-slate-800/40 p-4 transition-colors hover:border-slate-700 hover:bg-slate-800/70 active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold text-slate-50">
            {company.name}
          </h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span
              className={cn(
                "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium",
                layerColors[company.layer]
              )}
            >
              {company.layer}
            </span>
            <Badge variant="status">{company.status}</Badge>
          </div>
        </div>
        <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" />
      </div>

      {deadline && (
        <div
          className={cn(
            "mt-3 flex items-center gap-1.5 text-xs font-medium",
            isUrgent ? "text-red-400" : "text-slate-400"
          )}
        >
          <Clock className="h-3.5 w-3.5" />
          <span>{deadline.label}</span>
        </div>
      )}
    </Link>
  );
}
