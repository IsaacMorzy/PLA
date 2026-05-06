import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8] dark:focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand-gold text-[#1a1815] rounded-full shadow-lg shadow-brand-gold/20 hover:bg-brand-gold-light hover:shadow-brand-gold/30 hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground rounded-full shadow-sm hover:bg-destructive/90 hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-black/20 bg-transparent text-[#2f2114] rounded-full hover:border-brand-gold/50 hover:bg-brand-gold/10 hover:scale-[1.02] active:scale-[0.98] dark:border-white/20 dark:text-white dark:hover:bg-brand-gold/5",
        secondary:
          "bg-brand-terracotta text-white rounded-full hover:bg-brand-terracotta-light hover:scale-[1.02] active:scale-[0.98]",
        ghost:
          "rounded-full text-[#2f2114] hover:bg-black/5 hover:scale-[1.02] active:scale-[0.98] dark:text-white dark:hover:bg-white/10",
        link: "text-brand-gold underline-offset-4 hover:underline hover:text-brand-gold-light",
        glow: "bg-brand-gold text-[#1a1815] rounded-full shadow-[0_0_20px_hsla(45,85%,55%,0.4)] hover:shadow-[0_0_30px_hsla(45,85%,55%,0.6)] hover:scale-[1.02] active:scale-[0.98]",
        soft: "bg-[#f3eadc] text-[#2b1d10] rounded-2xl border border-black/10 hover:bg-[#eadfce] hover:border-black/15 hover:scale-[1.02] active:scale-[0.98] dark:bg-[#1a1815] dark:text-white dark:border-white/10 dark:hover:bg-[#252220] dark:hover:border-white/20",
        glass:
          "bg-white/75 backdrop-blur-md border border-black/10 text-[#2b1d10] rounded-full hover:bg-white/90 hover:border-brand-gold/30 hover:scale-[1.02] active:scale-[0.98] dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
