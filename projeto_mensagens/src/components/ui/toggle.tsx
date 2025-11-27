import * as React from "react";

import { cn } from "@/lib/utils";

export const toggleVariants = ({ variant, size, className }: any = {}) => cn(className);

const Toggle = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(({ className, children, ...props }, ref) => (
  <button ref={ref} className={cn("inline-flex items-center", className)} {...props}>
    {children}
  </button>
));

Toggle.displayName = "Toggle";

export { Toggle };
