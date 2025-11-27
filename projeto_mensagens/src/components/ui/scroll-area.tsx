import * as React from "react";

import { cn } from "@/lib/utils";

const ScrollArea: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className, ...props }) => {
  return (
    <div className={cn("overflow-auto", className)} {...props}>
      {children}
    </div>
  );
};

const ScrollBar: React.FC<any> = ({ orientation = "vertical", className, ...props }) => {
  return <div className={cn("hidden", className)} {...props} />;
};

export { ScrollArea, ScrollBar };
