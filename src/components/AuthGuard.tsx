"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useRecruitStore } from "@/lib/store";

// Paths that bypass auth check
const PUBLIC = ["/lock", "/auth"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const lockEnabled = useRecruitStore((s) => s.lockEnabled);
  const lockPassword = useRecruitStore((s) => s.lockPassword);
  const router = useRouter();
  const pathname = usePathname();

  // Lock page is always immediately visible; everything else waits for auth check
  const [ready, setReady] = useState(PUBLIC.includes(pathname));

  useEffect(() => {
    if (PUBLIC.includes(pathname)) {
      setReady(true);
      return;
    }

    if (!lockEnabled || !lockPassword) {
      setReady(true);
      return;
    }

    const authed = sessionStorage.getItem("rf_authed") === "1";
    if (authed) {
      setReady(true);
    } else {
      router.replace("/lock");
    }
  }, [pathname, lockEnabled, lockPassword, router]);

  if (!ready) return null;
  return <>{children}</>;
}
