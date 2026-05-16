"use client";

import { useEffect } from "react";
import { useRecruitStore } from "@/lib/store";

export function SupabaseSync() {
  const loadFromSupabase = useRecruitStore((s) => s.loadFromSupabase);

  useEffect(() => {
    loadFromSupabase();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
