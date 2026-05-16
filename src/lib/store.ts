"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockCompanies, mockMasterES } from "./data";
import type { Company, MasterES } from "./types";

type RecruitStore = {
  companies: Company[];
  masterES: MasterES;
  themeMode: "dark" | "light";
  setThemeMode: (mode: "dark" | "light") => void;
  setCompanies: (companies: Company[]) => void;
  getCompany: (id: string) => Company | undefined;
  addCompany: (company: Company) => void;
  updateCompany: (id: string, data: Partial<Company>) => void;
};

export const useRecruitStore = create<RecruitStore>()(
  persist(
    (set, get) => ({
      companies: mockCompanies,
      masterES: mockMasterES,
      themeMode: "dark",
      setThemeMode: (mode) => set({ themeMode: mode }),
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
    }),
    {
      name: "recruit-flow-storage",
    }
  )
);
