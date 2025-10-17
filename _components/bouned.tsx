import { ElementType, ReactNode, forwardRef } from "react";
import { cn } from "@/_lib/utils";

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
        className={cn("mx-auto w-full px-8 container", className)}
        {...props}
      >

        {children}
      </Comp>
    );
  }
);

Bounded.displayName = "Bounded";
