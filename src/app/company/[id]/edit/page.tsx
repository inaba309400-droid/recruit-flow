"use client";

import { notFound, useRouter } from "next/navigation";
import { CompanyForm, type CompanyFormData } from "@/components/CompanyForm";
import { useRecruitStore } from "@/lib/store";

type PageProps = {
  params: { id: string };
};

export default function EditCompanyPage({ params }: PageProps) {
  const router = useRouter();
  const company = useRecruitStore((s) => s.getCompany(params.id));
  const updateCompany = useRecruitStore((s) => s.updateCompany);

  if (!company) {
    notFound();
  }

  function handleSubmit(data: CompanyFormData) {
    updateCompany(params.id, {
      name: data.name,
      layer: data.layer,
      status: data.status,
      mypageUrl: data.mypageUrl,
      loginId: data.loginId,
      password: data.password,
      esDeadlineAt: data.esDeadlineAt || undefined,
      webTestDeadlineAt: data.webTestDeadlineAt || undefined,
    });
    router.replace(`/company/${params.id}`);
  }

  return (
    <CompanyForm
      title="企業を編集"
      initial={{
        name: company.name,
        layer: company.layer,
        status: company.status,
        mypageUrl: company.mypageUrl,
        loginId: company.loginId,
        password: company.password,
        esDeadlineAt: company.esDeadlineAt ?? "",
        webTestDeadlineAt: company.webTestDeadlineAt ?? "",
      }}
      onSubmit={handleSubmit}
    />
  );
}
