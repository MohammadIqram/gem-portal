"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";

export function AuthProvider({ children }) {
  const { checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth(); // Check auth status on mount
  }, []);

  return <>{children}</>;
}