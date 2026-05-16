"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockCompanies, mockMasterES } from "./data";
import type { Company, MasterES } from "./types";
import {
  supabase,
  toDbCompany,
  fromDbCompany,
  toDbMasterES,
  fromDbMasterES,
  toDbUserSettings,
  fromDbUserSettings,
  type DbCompany,
  type DbMasterES,
  type DbUserSettings,
  type UserSettingsSnapshot,
} from "./supabase";

// ─── Types ──────────────────────────────────────────────────────────────────

type RecruitStore = {
  companies: Company[];
  masterES: MasterES;
  isLoading: boolean;
  // Theme
  themeMode: "dark" | "light";
  setThemeMode: (mode: "dark" | "light") => void;
  // Security
  lockEnabled: boolean;
  lockPassword: string;
  setLockEnabled: (v: boolean) => void;
  setLockPassword: (v: string) => void;
  // Account
  displayName: string;
  defaultEmail: string;
  defaultPassword: string;
  setDisplayName: (v: string) => void;
  setDefaultEmail: (v: string) => void;
  setDefaultPassword: (v: string) => void;
  // Companies
  setCompanies: (companies: Company[]) => void;
  getCompany: (id: string) => Company | undefined;
  addCompany: (company: Company) => void;
  updateCompany: (id: string, data: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  resetData: () => void;
  // Supabase
  loadFromSupabase: () => Promise<void>;
};

// ─── Module-level helpers ───────────────────────────────────────────────────

function settingsSnapshot(s: RecruitStore): UserSettingsSnapshot {
  return {
    displayName: s.displayName,
    defaultEmail: s.defaultEmail,
    defaultPassword: s.defaultPassword,
    themeMode: s.themeMode,
    lockEnabled: s.lockEnabled,
    lockPassword: s.lockPassword,
  };
}

function pushSettings(snapshot: UserSettingsSnapshot) {
  supabase
    .from("user_settings")
    .upsert(toDbUserSettings(snapshot))
    .then(({ error }) => { if (error) console.error("[supabase] settings:", error); });
}

// ─── Store ──────────────────────────────────────────────────────────────────

export const useRecruitStore = create<RecruitStore>()(
  persist(
    (set, get) => ({
      companies: mockCompanies,
      masterES: mockMasterES,
      isLoading: false,

      // Theme
      themeMode: "dark",
      setThemeMode: (mode) => {
        set({ themeMode: mode });
        pushSettings({ ...settingsSnapshot(get()), themeMode: mode });
      },

      // Security
      lockEnabled: false,
      lockPassword: "",
      setLockEnabled: (v) => {
        set({ lockEnabled: v });
        pushSettings({ ...settingsSnapshot(get()), lockEnabled: v });
      },
      setLockPassword: (v) => {
        set({ lockPassword: v });
        pushSettings({ ...settingsSnapshot(get()), lockPassword: v });
      },

      // Account
      displayName: "",
      defaultEmail: "",
      defaultPassword: "",
      setDisplayName: (v) => {
        set({ displayName: v });
        pushSettings({ ...settingsSnapshot(get()), displayName: v });
      },
      setDefaultEmail: (v) => {
        set({ defaultEmail: v });
        pushSettings({ ...settingsSnapshot(get()), defaultEmail: v });
      },
      setDefaultPassword: (v) => {
        set({ defaultPassword: v });
        pushSettings({ ...settingsSnapshot(get()), defaultPassword: v });
      },

      // Companies
      setCompanies: (companies) => set({ companies }),

      getCompany: (id) => get().companies.find((c) => c.id === id),

      addCompany: (company) => {
        set((state) => ({ companies: [...state.companies, company] }));
        supabase
          .from("companies")
          .insert(toDbCompany(company))
          .then(({ error }) => { if (error) console.error("[supabase] addCompany:", error); });
      },

      updateCompany: (id, data) => {
        set((state) => ({
          companies: state.companies.map((c) => (c.id === id ? { ...c, ...data } : c)),
        }));
        const company = get().companies.find((c) => c.id === id);
        if (company) {
          supabase
            .from("companies")
            .upsert(toDbCompany(company))
            .then(({ error }) => { if (error) console.error("[supabase] updateCompany:", error); });
        }
      },

      deleteCompany: (id) => {
        set((state) => ({ companies: state.companies.filter((c) => c.id !== id) }));
        supabase
          .from("companies")
          .delete()
          .eq("id", id)
          .then(({ error }) => { if (error) console.error("[supabase] deleteCompany:", error); });
      },

      resetData: () => {
        set({ companies: mockCompanies });
        void (async () => {
          await supabase.from("companies").delete().not("id", "is", null);
          const { error } = await supabase.from("companies").insert(mockCompanies.map(toDbCompany));
          if (error) console.error("[supabase] resetData:", error);
        })();
      },

      // ── Supabase initial load ─────────────────────────────────────────────

      loadFromSupabase: async () => {
        set({ isLoading: true });
        try {
          const [companiesRes, masterESRes, settingsRes] = await Promise.all([
            supabase.from("companies").select("*").order("created_at", { ascending: true }),
            supabase.from("master_es").select("*").eq("id", 1).maybeSingle(),
            supabase.from("user_settings").select("*").eq("id", 1).maybeSingle(),
          ]);

          const patch: Partial<RecruitStore> = { isLoading: false };

          // Companies
          if (companiesRes.error) {
            console.error("[supabase] companies fetch:", companiesRes.error);
          } else if ((companiesRes.data as DbCompany[]).length === 0) {
            // First run: seed with mock data
            const { error } = await supabase
              .from("companies")
              .insert(mockCompanies.map(toDbCompany));
            if (!error) patch.companies = mockCompanies;
          } else {
            patch.companies = (companiesRes.data as DbCompany[]).map(fromDbCompany);
          }

          // Master ES
          if (masterESRes.error) {
            console.error("[supabase] master_es fetch:", masterESRes.error);
          } else if (!masterESRes.data) {
            // First run: seed
            await supabase.from("master_es").insert(toDbMasterES(get().masterES));
          } else {
            patch.masterES = fromDbMasterES(masterESRes.data as DbMasterES);
          }

          // User settings
          if (settingsRes.error) {
            console.error("[supabase] user_settings fetch:", settingsRes.error);
          } else if (!settingsRes.data) {
            // First run: seed from current local state
            await supabase
              .from("user_settings")
              .insert(toDbUserSettings(settingsSnapshot(get())));
          } else {
            const s = fromDbUserSettings(settingsRes.data as DbUserSettings);
            patch.displayName = s.displayName;
            patch.defaultEmail = s.defaultEmail;
            patch.defaultPassword = s.defaultPassword;
            patch.themeMode = s.themeMode;
            patch.lockEnabled = s.lockEnabled;
            patch.lockPassword = s.lockPassword;
          }

          set(patch);
        } catch (err) {
          console.error("[supabase] loadFromSupabase:", err);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "recruit-flow-storage",
    }
  )
);
