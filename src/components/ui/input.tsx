"use client";

import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base transition-colors",
            "placeholder:text-muted-foreground",
            "focus:border-m-blue focus:outline-none focus:ring-2 focus:ring-m-blue/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-m-red focus:border-m-red focus:ring-m-red/20",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-m-red">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
