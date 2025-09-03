import { ElementType, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

type BoundedProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export const Bounded = forwardRef<HTMLElement, BoundedProps<ElementType>>(
  ({ as: Comp = "section", className, children, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn("mx-auto w-full max-w-7xl px-6", className)}
        {...props}
      >

        {children}
      </Comp>
    );
  }
);

Bounded.displayName = "Bounded";
