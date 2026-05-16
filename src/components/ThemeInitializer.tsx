"use client";

import { useEffect } from "react";
import { useRecruitStore } from "@/lib/store";

export function ThemeInitializer() {
  const themeMode = useRecruitStore((s) => s.themeMode);

  useEffect(() => {
    const html = document.documentElement;
    if (themeMode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [themeMode]);

  return null;
}
