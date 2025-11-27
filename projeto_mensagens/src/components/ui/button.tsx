import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const buttonVariants = ({ variant, size, className }: any = {}) => {
  return cn(className);
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, ...props }, ref) => {
  return (
    <button ref={ref} className={cn("px-3 py-2 rounded-md inline-flex items-center", className)} {...props}>
      {children}
    </button>
  );
});
Button.displayName = "Button";

export { Button };

