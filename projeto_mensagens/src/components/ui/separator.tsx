import * as React from "react";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn("bg-border", orientation === "horizontal" ? "h-px w-full" : "w-px h-full", className)}
      {...props}
    />
  ),
);
Separator.displayName = "Separator";

export { Separator };
