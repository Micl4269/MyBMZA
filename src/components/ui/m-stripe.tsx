import { cn } from "@/lib/utils";

interface MStripeProps {
  className?: string;
  direction?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
}

export function MStripe({
  className,
  direction = "horizontal",
  size = "md",
}: MStripeProps) {
  const sizes = {
    horizontal: {
      sm: "h-1",
      md: "h-1.5",
      lg: "h-2",
    },
    vertical: {
      sm: "w-1",
      md: "w-1.5",
      lg: "w-2",
    },
  };

  return (
    <div
      className={cn(
        "flex",
        direction === "horizontal" ? "flex-row w-full" : "flex-col h-full",
        className
      )}
    >
      <div
        className={cn(
          "bg-[#0066B1]",
          direction === "horizontal"
            ? `flex-1 ${sizes.horizontal[size]}`
            : `flex-1 ${sizes.vertical[size]}`
        )}
      />
      <div
        className={cn(
          "bg-[#1B69A1]",
          direction === "horizontal"
            ? `flex-1 ${sizes.horizontal[size]}`
            : `flex-1 ${sizes.vertical[size]}`
        )}
      />
      <div
        className={cn(
          "bg-[#E4002B]",
          direction === "horizontal"
            ? `flex-1 ${sizes.horizontal[size]}`
            : `flex-1 ${sizes.vertical[size]}`
        )}
      />
    </div>
  );
}

export function MStripeBadge({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)}>
      <div className="w-1 h-3 bg-[#0066B1] rounded-sm" />
      <div className="w-1 h-3 bg-[#1B69A1] rounded-sm" />
      <div className="w-1 h-3 bg-[#E4002B] rounded-sm" />
    </div>
  );
}
