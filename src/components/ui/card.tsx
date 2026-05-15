import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-slate-800 p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
