"use client";

import { useRouter } from "next/navigation";
import { CompanyForm, type CompanyFormData } from "@/components/CompanyForm";
import { useRecruitStore } from "@/lib/store";

export default function NewCompanyPage() {
  const router = useRouter();
  const addCompany = useRecruitStore((s) => s.addCompany);

  function handleSubmit(data: CompanyFormData) {
    const id = crypto.randomUUID();
    addCompany({
      id,
      name: data.name,
      layer: data.layer,
      status: data.status,
      mypageUrl: data.mypageUrl,
      loginId: data.loginId,
      password: data.password,
      ...(data.esDeadlineAt ? { esDeadlineAt: data.esDeadlineAt } : {}),
      ...(data.webTestDeadlineAt ? { webTestDeadlineAt: data.webTestDeadlineAt } : {}),
      interviewDates: [],
      esEntries: [],
      interviewLogs: [],
      timeline: [],
    });
    router.replace(`/company/${id}`);
  }

  return <CompanyForm title="企業を追加" onSubmit={handleSubmit} />;
}
