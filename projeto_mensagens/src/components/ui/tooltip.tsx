import * as React from "react";

// Implementação mínima do tooltip mantendo a API usada pela aplicação.

const TooltipProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <>{children}</>;
};

const Tooltip: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;

const TooltipTrigger: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;

const TooltipContent: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
