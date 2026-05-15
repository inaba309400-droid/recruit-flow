import Link from "next/link";
import { CheckCircle2, Circle, Clock, Mic } from "lucide-react";
import type { Company, TimelineItem } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const typeConfig: Record<
  TimelineItem["type"],
  { icon: typeof CheckCircle2; color: string; dot: string }
> = {
  pass: {
    icon: CheckCircle2,
    color: "text-cyan-500",
    dot: "bg-cyan-500",
  },
  waiting: {
    icon: Clock,
    color: "text-amber-400",
    dot: "bg-amber-400",
  },
  next: {
    icon: Circle,
    color: "text-slate-400",
    dot: "bg-slate-500",
  },
};

type TimelineTabProps = {
  company: Company;
};

export function TimelineTab({ company }: TimelineTabProps) {
  return (
    <div className="space-y-4">
      <Card className="p-0 overflow-hidden">
        <ul className="divide-y divide-white/[0.06]">
          {company.timeline.map((item, index) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;
            const isLast = index === company.timeline.length - 1;

            return (
              <li key={`${item.event}-${index}`} className="relative flex gap-3 px-4 py-3.5">
                {!isLast && (
                  <span
                    className="absolute left-[1.65rem] top-10 bottom-0 w-px bg-white/[0.08]"
                    aria-hidden
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                    item.type === "pass" ? "bg-cyan-500/20" : "bg-slate-700"
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5", config.color)} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-100">{item.event}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {item.date === "—" ? "日程未定" : item.date}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>

      <Link
        href={`/interview/${company.id}`}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-card text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700"
      >
        <Mic className="h-4 w-4 text-cyan-500" />
        面接アーカイブを開く
      </Link>
    </div>
  );
}
