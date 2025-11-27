"use client";

import { cn } from "@/lib/utils";
import { forwardRef, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options, placeholder, ...props }, ref) => {
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
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              "flex h-11 w-full appearance-none rounded-lg border border-input bg-background px-4 py-2 pr-10 text-base transition-colors",
              "focus:border-m-blue focus:outline-none focus:ring-2 focus:ring-m-blue/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-m-red focus:border-m-red focus:ring-m-red/20",
              !props.value && "text-muted-foreground",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
        {error && <p className="mt-1.5 text-sm text-m-red">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
