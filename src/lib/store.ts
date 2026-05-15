"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockCompanies, mockMasterES } from "./data";
import type { Company, MasterES } from "./types";

type RecruitStore = {
  companies: Company[];
  masterES: MasterES;
  setCompanies: (companies: Company[]) => void;
  getCompany: (id: string) => Company | undefined;
};

export const useRecruitStore = create<RecruitStore>()(
  persist(
    (set, get) => ({
      companies: mockCompanies,
      masterES: mockMasterES,
      setCompanies: (companies) => set({ companies }),
      getCompany: (id) => get().companies.find((c) => c.id === id),
    }),
    {
      name: "recruit-flow-storage",
    }
  )
);
