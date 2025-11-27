import * as React from "react";

import { cn } from "@/lib/utils";

// Implementação simples e mínima dos elementos de toast usados pela app.

type ToastProps = {
  id?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

type ToastActionElement = React.ReactElement<any>;

const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <>{children}</>;
};

const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("fixed top-4 right-4 z-50 flex flex-col gap-2", className)} {...props} />
));
ToastViewport.displayName = "ToastViewport";

const Toast: React.FC<React.PropsWithChildren<ToastProps>> = ({ children, ...props }) => {
  return (
    <div role="status" data-open={props.open} className={cn("rounded-md border bg-white p-3 shadow", props.id)}>
      {children}
    </div>
  );
};

const ToastTitle: React.FC<React.PropsWithChildren<any>> = ({ children }) => <div className="font-semibold">{children}</div>;
const ToastDescription: React.FC<React.PropsWithChildren<any>> = ({ children }) => <div className="text-sm">{children}</div>;
const ToastClose: React.FC<any> = ({}) => null;
const ToastAction: React.FC<any> = ({ children }) => <div>{children}</div>;

export { type ToastProps, type ToastActionElement, ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction };
