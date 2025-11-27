import * as React from "react";

import { cn } from "@/lib/utils";

const Tabs: React.FC<React.PropsWithChildren<any>> = ({ children }) => <div>{children}</div>;

const TabsList = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex gap-2", className)} {...props}>
    {children}
  </div>
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(({ className, children, ...props }, ref) => (
  <button ref={ref} className={cn("px-3 py-1 rounded", className)} {...props}>
    {children}
  </button>
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("mt-2", className)} {...props}>
    {children}
  </div>
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
