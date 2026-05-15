import { cva, type VariantProps } from "class-variance-authority";
import type { Company } from "@/lib/types";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium",
  {
    variants: {
      variant: {
        default: "bg-cyan-500/20 text-cyan-500",
        status: "bg-slate-700 text-slate-200",
        urgent: "bg-red-500/20 text-red-400",
        outline: "border border-white/[0.08] text-slate-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const layerStyles: Record<Company["layer"], string> = {
  本命: "bg-orange-500/20 text-orange-400",
  準本命: "bg-cyan-500/20 text-cyan-500",
  挑戦: "bg-violet-500/20 text-violet-400",
  抑え: "bg-slate-600 text-slate-300",
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  layer?: Company["layer"];
}

export function Badge({ className, variant, layer, children, ...props }: BadgeProps) {
  if (layer) {
    return (
      <span className={cn(layerStyles[layer], "inline-flex rounded-md px-2 py-0.5 text-[11px] font-medium", className)} {...props}>
        {children ?? layer}
      </span>
    );
  }

  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}
