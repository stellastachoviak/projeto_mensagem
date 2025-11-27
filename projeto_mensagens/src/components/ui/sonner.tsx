import * as React from "react";

// Stub mínimo para substituir a dependência `sonner`.
export function Toaster() {
  return null;
}

export function toast() {
  return {
    success: () => undefined,
    error: () => undefined,
    // stub API mínima se usada em algum lugar
  } as any;
}
