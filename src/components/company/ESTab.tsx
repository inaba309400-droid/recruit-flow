import type { Company } from "@/lib/types";
import { Card } from "@/components/ui/card";

type ESTabProps = {
  company: Company;
};

export function ESTab({ company }: ESTabProps) {
  if (company.esEntries.length === 0) {
    return (
      <Card className="py-8 text-center">
        <p className="text-sm text-slate-500">ES内容はまだ登録されていません</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {company.esEntries.map((entry, index) => (
        <Card key={`${entry.question}-${index}`}>
          <p className="text-[11px] font-medium uppercase tracking-wider text-cyan-500">
            設問 {index + 1}
          </p>
          <h3 className="mt-1.5 text-sm font-semibold text-slate-100">
            {entry.question}
          </h3>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-400">
            {entry.answer}
          </p>
        </Card>
      ))}
    </div>
  );
}
