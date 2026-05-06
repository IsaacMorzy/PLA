import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-[1rem] border border-black/15 bg-white/80 px-4 py-2.5 text-base text-[#2a1c10] placeholder:text-[#6b5440] transition-colors dark:border-white/20 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30",
          "focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
