export type Layer = "本命" | "準本命" | "挑戦" | "抑え";

export type SelectionStatus =
  | "ES作成中"
  | "ES提出済"
  | "書類通過"
  | "WEBテスト中"
  | "ES通過"
  | "1次面接"
  | "2次面接"
  | "最終面接"
  | "内定"
  | "不合格";

export type ESEntry = {
  question: string;
  answer: string;
};

export type InterviewLog = {
  question: string;
  answer: string;
  recordedAt: string;
};

export type TimelineItem = {
  event: string;
  date: string;
  type: "pass" | "waiting" | "next";
};

export type Company = {
  id: string;
  name: string;
  layer: Layer;
  status: SelectionStatus;
  mypageUrl: string;
  loginId: string;
  password: string;
  esSubmittedAt?: string;
  esDeadlineAt?: string;
  webTestDeadlineAt?: string;
  interviewDates: string[];
  esEntries: ESEntry[];
  interviewLogs: InterviewLog[];
  timeline: TimelineItem[];
};

export type MasterES = {
  gakuchika: string;
  selfPR: string;
  motivation: string;
};
