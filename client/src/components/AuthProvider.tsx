// components/providers/AuthProvider.tsx
"use client";

import { useTokenManager } from "@/hooks/checkAuth";


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useTokenManager();
  return <>{children}</>;
};
