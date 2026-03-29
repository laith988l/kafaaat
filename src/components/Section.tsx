import { cn } from "@/lib/utils";
import React, { HTMLAttributes, ReactNode } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  containerClassName?: string;
  containerOff?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, containerClassName, containerOff = false, children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("py-32", className)} {...props}>
        {containerOff ? (
          children
        ) : (
          <div className={cn("w-full mx-auto px-8 w-full", containerClassName)}>
            {children}
          </div>
        )}
      </section>
    );
  }
);

Section.displayName = "Section";
