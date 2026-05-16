import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-card p-4 dark:border-white/[0.08]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
