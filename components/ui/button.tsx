import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary - warm gold
        default:
          "bg-brand-gold text-[#1a1815] rounded-full shadow-lg shadow-brand-gold/20 hover:bg-brand-gold-light hover:shadow-brand-gold/30 hover:scale-[1.02] active:scale-[0.98]",
        // Destructive
        destructive:
          "bg-destructive text-destructive-foreground rounded-xl shadow-sm hover:bg-destructive/90 hover:scale-[1.02] active:scale-[0.98]",
        // Outlined - gold border
        outline:
          "border border-white/20 bg-transparent rounded-full hover:border-brand-gold/50 hover:bg-brand-gold/5 hover:scale-[1.02] active:scale-[0.98] text-white",
        // Secondary - terracotta accent
        secondary:
          "bg-brand-terracotta text-white rounded-xl hover:bg-brand-terracotta-light hover:scale-[1.02] active:scale-[0.98]",
        // Ghost - minimal
        ghost:
          "rounded-xl hover:bg-white/10 text-white hover:scale-[1.02] active:scale-[0.98]",
        // Link - gold text
        link: "text-brand-gold underline-offset-4 hover:underline hover:text-brand-gold-light",
        // Glow - premium gold button
        glow: "bg-brand-gold text-[#1a1815] rounded-full shadow-[0_0_20px_hsla(45,85%,55%,0.4)] hover:shadow-[0_0_30px_hsla(45,85%,55%,0.6)] hover:scale-[1.02] active:scale-[0.98]",
        // Soft - neumorphic
        soft: "bg-[#1a1815] text-white rounded-2xl border border-white/10 hover:bg-[#252220] hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]",
        // Glass - glassmorphism
        glass:
          "bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-white/10 hover:border-brand-gold/30 hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
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