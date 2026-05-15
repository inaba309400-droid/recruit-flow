import type { Company, MasterES } from "./types";

function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export const mockCompanies: Company[] = [
  {
    id: "pwc-itsc",
    name: "PwC ITSC",
    layer: "本命",
    status: "ES通過",
    mypageUrl: "https://careers.pwc.com/jp/student",
    loginId: "student.pwc@example.com",
    password: "Pwc2026!",
    esSubmittedAt: daysAgo(21),
    esDeadlineAt: daysAgo(14),
    interviewDates: [daysFromNow(3)],
    esEntries: [
      {
        question: "志望動機を教えてください（400字）",
        answer:
          "PwC ITSCを志望する理由は、テクノロジーとビジネスの交差点で社会課題に向き合える環境にあると考えたからです。大学では情報システムのゼミで中小企業のDX支援に取り組み、課題の構造化とステークホルダー調整の難しさを実感しました。",
      },
      {
        question: "学生時代に力を入れたこと（400字）",
        answer:
          "サークル代表として50名規模のイベント運営を主導しました。予算・会場・広報を横断的に管理し、参加率を前年比120%まで改善。失敗から学び、次年度はリスク管理表を導入してトラブルを未然に防ぎました。",
      },
    ],
    interviewLogs: [
      {
        question: "なぜコンサルティング業界なのか",
        answer:
          "課題解決のスピードと多様な業界経験を積める点に魅力を感じています。",
        recordedAt: daysAgo(2) + "T14:00:00",
      },
    ],
    timeline: [
      { event: "ES提出", date: daysAgo(21), type: "pass" },
      { event: "書類通過", date: daysAgo(14), type: "pass" },
      { event: "ES通過", date: daysAgo(7), type: "pass" },
      { event: "1次面接", date: daysFromNow(3), type: "next" },
    ],
  },
  {
    id: "deloitte-tohmatsu",
    name: "Deloitte Tohmatsu",
    layer: "本命",
    status: "WEBテスト中",
    mypageUrl: "https://www2.deloitte.com/jp/ja/careers/students.html",
    loginId: "deloitte.applicant@example.com",
    password: "Deloitte#26",
    esSubmittedAt: daysAgo(18),
    webTestDeadlineAt: daysFromNow(7),
    interviewDates: [],
    esEntries: [
      {
        question: "志望動機",
        answer:
          "Deloitteのグローバルネットワークと多様性を活かしたプロジェクト参加機会に惹かれ志望しました。",
      },
    ],
    interviewLogs: [],
    timeline: [
      { event: "ES提出", date: daysAgo(18), type: "pass" },
      { event: "書類通過", date: daysAgo(10), type: "pass" },
      { event: "WEBテスト", date: daysFromNow(7), type: "next" },
    ],
  },
  {
    id: "accenture-japan",
    name: "Accenture Japan",
    layer: "準本命",
    status: "ES作成中",
    mypageUrl: "https://www.accenture.com/jp-ja/careers",
    loginId: "accenture.user@example.com",
    password: "Accenture26",
    esDeadlineAt: daysFromNow(12),
    interviewDates: [],
    esEntries: [
      {
        question: "志望動機（未提出ドラフト）",
        answer: "ドラフト作成中 — マスターESから志望軸を転用予定。",
      },
    ],
    interviewLogs: [],
    timeline: [
      { event: "ES作成中", date: daysFromNow(12), type: "next" },
    ],
  },
  {
    id: "kpmg-ignition",
    name: "KPMG Ignition Tokyo",
    layer: "準本命",
    status: "書類通過",
    mypageUrl: "https://home.kpmg/jp/ja/home/careers.html",
    loginId: "kpmg.candidate@example.com",
    password: "KpmgIgn26",
    esSubmittedAt: daysAgo(25),
    interviewDates: [],
    esEntries: [
      {
        question: "志望動機",
        answer: "スタートアップと大企業の両面から課題解決できるIgnitionの特色に共感しました。",
      },
    ],
    interviewLogs: [],
    timeline: [
      { event: "ES提出", date: daysAgo(25), type: "pass" },
      { event: "書類通過", date: daysAgo(5), type: "pass" },
      { event: "面接日程調整", date: "—", type: "waiting" },
    ],
  },
  {
    id: "simplex-holdings",
    name: "Simplex Holdings",
    layer: "挑戦",
    status: "ES提出済",
    mypageUrl: "https://www.simplex.inc/recruit/",
    loginId: "simplex@example.com",
    password: "Simplex26",
    esSubmittedAt: daysAgo(10),
    interviewDates: [],
    esEntries: [
      {
        question: "志望動機",
        answer: "フィンテック領域での事業開発に携わり、社会インフラを支えたいと考え志望しました。",
      },
    ],
    interviewLogs: [],
    timeline: [
      { event: "ES提出", date: daysAgo(10), type: "pass" },
      { event: "結果待ち", date: "—", type: "waiting" },
    ],
  },
  {
    id: "layers-consulting",
    name: "Layers Consulting",
    layer: "準本命",
    status: "ES提出済",
    mypageUrl: "https://layers.co.jp/recruit",
    loginId: "layers@example.com",
    password: "Layers2026",
    esSubmittedAt: daysAgo(8),
    interviewDates: [],
    esEntries: [
      {
        question: "志望動機",
        answer:
          "成長フェーズのコンサルティングファームで、裁量を持ってクライアント課題に向き合いたいと考え志望しました。",
      },
    ],
    interviewLogs: [],
    timeline: [
      { event: "ES提出", date: daysAgo(8), type: "pass" },
      { event: "結果待ち", date: "—", type: "waiting" },
    ],
  },
];

export const mockMasterES: MasterES = {
  gakuchika:
    "大学のビジネスコンテストでチームリーダーを務め、市場調査から提案資料作成まで一貫して推進しました。メンバー間の意見対立をファシリテーションし、最終的に審査員特別賞を受賞。定量・定性の両面から仮説検証を行う姿勢を身につけました。",
  selfPR:
    "論理的思考力とコミュニケーション力を強みとしています。複雑な課題を構造化し、関係者と合意形成しながら解決に導く経験を、サークル活動・インターン・ゼミ研究で培ってきました。",
  motivation:
    "コンサルティング業界を志望する理由は、多様な業界・課題に短期間で深く関わり、クライアントと共に成果を創出できる点に魅力を感じるからです。特にデジタル変革と組織変革の交差点で価値を出せる環境で貢献したいと考えています。",
};

export function getCompanyById(id: string): Company | undefined {
  return mockCompanies.find((c) => c.id === id);
}
