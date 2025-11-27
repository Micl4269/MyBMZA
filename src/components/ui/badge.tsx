import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "secondary" | "success" | "warning" | "error" | "m-blue";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  size = "sm",
  children,
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-foreground text-background",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-emerald-500 text-white",
    warning: "bg-amber-500 text-white",
    error: "bg-m-red text-white",
    "m-blue": "bg-m-blue text-white",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
