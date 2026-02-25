export type Account = {
  role: string;
  email: string;
  password: string;
  redirectTo: string;
};

export const demoAccounts: Account[] = [
  { role: "운영자", email: "operator@sharehouse.kr", password: "1234", redirectTo: "/dashboard" },
  { role: "정산 담당", email: "finance@sharehouse.kr", password: "1234", redirectTo: "/staff/finance" },
  { role: "시설 담당", email: "facility@sharehouse.kr", password: "1234", redirectTo: "/staff/facility" },
  { role: "청소 담당", email: "cleaning@sharehouse.kr", password: "1234", redirectTo: "/staff/cleaning" },
  { role: "콜 담당", email: "call@sharehouse.kr", password: "1234", redirectTo: "/staff/call" },
  { role: "초기 세팅 담당", email: "setup@sharehouse.kr", password: "1234", redirectTo: "/staff/setup" },
  { role: "입주자", email: "resident@sharehouse.kr", password: "1234", redirectTo: "/resident" },
];
