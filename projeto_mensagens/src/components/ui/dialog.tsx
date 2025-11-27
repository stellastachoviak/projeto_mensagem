import * as React from "react";

// Versão simplificada do Dialog que mantém as exportações usadas pela aplicação.

const Dialog: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;
const DialogTrigger: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;
const DialogPortal: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;
const DialogClose: React.FC<any> = () => null;
const DialogOverlay: React.FC<React.PropsWithChildren<any>> = ({ children }) => <div>{children}</div>;

const DialogContent: React.FC<React.PropsWithChildren<any>> = ({ children }) => <div>{children}</div>;

const DialogHeader = ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>;
const DialogFooter = ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>;
const DialogTitle = ({ children, ...props }: React.PropsWithChildren<any>) => <h3 {...props}>{children}</h3>;
const DialogDescription = ({ children, ...props }: React.PropsWithChildren<any>) => <p {...props}>{children}</p>;

export { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
