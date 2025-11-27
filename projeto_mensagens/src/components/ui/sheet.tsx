import * as React from "react";

import { cn } from "@/lib/utils";

const Sheet: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;
const SheetTrigger: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;
const SheetClose: React.FC<any> = () => null;
const SheetPortal: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;
const SheetOverlay: React.FC<React.PropsWithChildren<any>> = ({ children }) => <div>{children}</div>;

const SheetContent: React.FC<React.PropsWithChildren<{ side?: string; className?: string }>> = ({ children, className }) => (
  <div className={cn(className)}>{children}</div>
);

const SheetHeader = ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>;
const SheetFooter = ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>;
const SheetTitle = ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>;
const SheetDescription = ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>;

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger };
