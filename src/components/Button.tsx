import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  children: ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const baseClasses = "rounded-full font-bold transition-all duration-300 inline-flex items-center justify-center";

    // Using values similar to Stitch designs
    const variants = {
      primary:
        "bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 text-lg hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/10",
      secondary:
        "bg-secondary text-secondary-foreground px-8 py-4 text-lg hover:bg-secondary/80 shadow-lg shadow-secondary/20",
      tertiary:
        "bg-transparent text-on-surface-variant hover:underline underline-offset-4 px-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
