"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockCompanies, mockMasterES } from "./data";
import type { Company, MasterES } from "./types";

type RecruitStore = {
  companies: Company[];
  masterES: MasterES;
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
  resetData: () => void;
};

export const useRecruitStore = create<RecruitStore>()(
  persist(
    (set, get) => ({
      companies: mockCompanies,
      masterES: mockMasterES,
      themeMode: "dark",
      setThemeMode: (mode) => set({ themeMode: mode }),
      lockEnabled: false,
      lockPassword: "",
      setLockEnabled: (v) => set({ lockEnabled: v }),
      setLockPassword: (v) => set({ lockPassword: v }),
      displayName: "",
      defaultEmail: "",
      defaultPassword: "",
      setDisplayName: (v) => set({ displayName: v }),
      setDefaultEmail: (v) => set({ defaultEmail: v }),
      setDefaultPassword: (v) => set({ defaultPassword: v }),
      setCompanies: (companies) => set({ companies }),
      getCompany: (id) => get().companies.find((c) => c.id === id),
      addCompany: (company) =>
        set((state) => ({ companies: [...state.companies, company] })),
      updateCompany: (id, data) =>
        set((state) => ({
          companies: state.companies.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        })),
      resetData: () => set({ companies: mockCompanies }),
    }),
    {
      name: "recruit-flow-storage",
    }
  )
);
