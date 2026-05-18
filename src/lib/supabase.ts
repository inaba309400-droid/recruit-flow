import { createClient } from "@supabase/supabase-js";
import type { Company, ESEntry, InterviewLog, MasterES, TimelineItem } from "./types";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── DB row types ───────────────────────────────────────────────────────────

export type DbCompany = {
  id: string;
  name: string;
  layer: string;
  status: string;
  mypage_url: string;
  login_id: string;
  password: string;
  es_submitted_at: string | null;
  es_deadline_at: string | null;
  web_test_deadline_at: string | null;
  interview_dates: string[];
  es_entries: ESEntry[];
  interview_logs: InterviewLog[];
  timeline: TimelineItem[];
  created_at?: string;
};

export type DbMasterES = {
  id?: number;
  user_id: string;
  gakuchika: string;
  self_pr: string;
  motivation: string;
};

export type DbUserSettings = {
  id?: number;
  user_id: string;
  display_name: string;
  default_email: string;
  default_password: string;
  theme: string;
  lock_enabled: boolean;
  lock_password: string;
};

// ─── Mappers ────────────────────────────────────────────────────────────────

export function toDbCompany(c: Company): Omit<DbCompany, "created_at"> {
  return {
    id: c.id,
    name: c.name,
    layer: c.layer,
    status: c.status,
    mypage_url: c.mypageUrl,
    login_id: c.loginId,
    password: c.password,
    es_submitted_at: c.esSubmittedAt ?? null,
    es_deadline_at: c.esDeadlineAt ?? null,
    web_test_deadline_at: c.webTestDeadlineAt ?? null,
    interview_dates: c.interviewDates,
    es_entries: c.esEntries,
    interview_logs: c.interviewLogs,
    timeline: c.timeline,
  };
}

export function fromDbCompany(row: DbCompany): Company {
  return {
    id: row.id,
    name: row.name,
    layer: row.layer as Company["layer"],
    status: row.status as Company["status"],
    mypageUrl: row.mypage_url,
    loginId: row.login_id,
    password: row.password,
    esSubmittedAt: row.es_submitted_at ?? undefined,
    esDeadlineAt: row.es_deadline_at ?? undefined,
    webTestDeadlineAt: row.web_test_deadline_at ?? undefined,
    interviewDates: row.interview_dates ?? [],
    esEntries: row.es_entries ?? [],
    interviewLogs: row.interview_logs ?? [],
    timeline: row.timeline ?? [],
  };
}

export function toDbMasterES(m: MasterES, userId: string): Omit<DbMasterES, "id"> {
  return { user_id: userId, gakuchika: m.gakuchika, self_pr: m.selfPR, motivation: m.motivation };
}

export function fromDbMasterES(row: DbMasterES): MasterES {
  return { gakuchika: row.gakuchika, selfPR: row.self_pr, motivation: row.motivation };
}

export type UserSettingsSnapshot = {
  displayName: string;
  defaultEmail: string;
  defaultPassword: string;
  themeMode: "dark" | "light";
  lockEnabled: boolean;
  lockPassword: string;
};

export function toDbUserSettings(s: UserSettingsSnapshot, userId: string): Omit<DbUserSettings, "id"> {
  return {
    user_id: userId,
    display_name: s.displayName,
    default_email: s.defaultEmail,
    default_password: s.defaultPassword,
    theme: s.themeMode,
    lock_enabled: s.lockEnabled,
    lock_password: s.lockPassword,
  };
}

export function fromDbUserSettings(row: DbUserSettings): UserSettingsSnapshot {
  return {
    displayName: row.display_name,
    defaultEmail: row.default_email,
    defaultPassword: row.default_password,
    themeMode: (row.theme as "dark" | "light") ?? "dark",
    lockEnabled: row.lock_enabled,
    lockPassword: row.lock_password,
  };
}
