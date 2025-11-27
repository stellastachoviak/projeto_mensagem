import * as React from "react";

import { cn } from "@/lib/utils";

const Label = React.forwardRef<HTMLLabelElement, React.ComponentPropsWithoutRef<"label">>(({ className, children, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-medium", className)} {...props}>
    {children}
  </label>
));
Label.displayName = "Label";

export { Label };
