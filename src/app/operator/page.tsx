"use client";

import { useState } from "react";
import { RoleShell } from "@/components/role-shell";
import { Account } from "@/lib/accounts";
import { saveCustomAccounts, useCustomAccountsStore } from "@/lib/auth-client";

const operatorMenu = [
  { href: "/operator", label: "운영자 대시보드" },
  { href: "/staff/finance", label: "정산 담당" },
  { href: "/staff/facility", label: "시설 담당" },
  { href: "/staff/cleaning", label: "청소 담당" },
  { href: "/staff/call", label: "콜 담당" },
  { href: "/staff/setup", label: "초기 세팅" },
  { href: "/resident", label: "입주자 화면" },
];

const roleRedirectMap: Record<string, string> = {
  "운영자": "/dashboard",
  "정산 담당": "/staff/finance",
  "시설 담당": "/staff/facility",
  "청소 담당": "/staff/cleaning",
  "콜 담당": "/staff/call",
  "초기 세팅 담당": "/staff/setup",
  "입주자": "/resident",
};

export default function OperatorPage() {
  const customAccounts = useCustomAccountsStore();
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    role: "정산 담당",
    email: "",
    password: "",
  });

  const registerAccount = () => {
    const email = form.email.trim();
    const password = form.password.trim();
    if (!email || !password) {
      setMessage("이메일과 비밀번호를 입력하세요.");
      return;
    }

    if (customAccounts.some((item) => item.email === email)) {
      setMessage("이미 등록된 이메일입니다.");
      return;
    }

    const next: Account = {
      role: form.role,
      email,
      password,
      redirectTo: roleRedirectMap[form.role] ?? "/dashboard",
    };

    const updated = [next, ...customAccounts];
    saveCustomAccounts(updated);
    setMessage(`${next.role} 계정이 등록되었습니다.`);
    setForm((prev) => ({ ...prev, email: "", password: "" }));
  };

  return (
    <RoleShell
      roleLabel="운영자"
      title="운영자 대시보드"
      description="담당자별 업무 현황과 핵심 알람을 통합 모니터링합니다."
      menuItems={operatorMenu}
    >
      <section className="grid four">
        <article className="card"><p className="label">미납 알람</p><strong>6건</strong><p className="muted">D+1 이상 4건</p></article>
        <article className="card"><p className="label">계약 종료 예정</p><strong>3건</strong><p className="muted">30일 이내</p></article>
        <article className="card"><p className="label">청소 미처리</p><strong>2건</strong><p className="muted">사진 미등록</p></article>
        <article className="card"><p className="label">입주자 민원</p><strong>5건</strong><p className="muted">콜 담당 확인 필요</p></article>
      </section>

      <section className="card">
        <h3>담당 업무 현황</h3>
        <table>
          <thead><tr><th>담당</th><th>핵심 업무</th><th>오늘 처리</th><th>지연</th><th>상태</th></tr></thead>
          <tbody>
            <tr><td>정산 담당</td><td>월세 납부 현황/종료 알람</td><td>21건</td><td>2건</td><td>주의</td></tr>
            <tr><td>시설 담당</td><td>설비 점검/고장 티켓</td><td>9건</td><td>0건</td><td>정상</td></tr>
            <tr><td>청소 담당</td><td>호실/복도/계단 청소 인증</td><td>12건</td><td>1건</td><td>정상</td></tr>
            <tr><td>콜 담당</td><td>공지 발송/애로사항 응답</td><td>14건</td><td>2건</td><td>주의</td></tr>
            <tr><td>초기 세팅 담당</td><td>주택 등록/구조도 업로드</td><td>4건</td><td>0건</td><td>정상</td></tr>
          </tbody>
        </table>
      </section>

      <section className="card">
        <h3>담당자 로그인 계정 등록</h3>
        <form className="inline-form three-col" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="role">역할</label>
            <select id="role" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}>
              <option>정산 담당</option>
              <option>시설 담당</option>
              <option>청소 담당</option>
              <option>콜 담당</option>
              <option>초기 세팅 담당</option>
              <option>입주자</option>
            </select>
          </div>
          <div>
            <label htmlFor="email">이메일</label>
            <input id="email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input id="password" type="text" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />
          </div>
          <button type="button" className="primary-button" onClick={registerAccount}>계정 등록</button>
        </form>
        {message ? <p className="muted">{message}</p> : null}
      </section>

      <section className="card">
        <h3>운영자가 등록한 로그인 계정</h3>
        <table>
          <thead><tr><th>역할</th><th>이메일</th><th>비밀번호</th><th>로그인 후 화면</th></tr></thead>
          <tbody>
            {customAccounts.map((account) => (
              <tr key={account.email}>
                <td>{account.role}</td>
                <td>{account.email}</td>
                <td>{account.password}</td>
                <td>{account.redirectTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </RoleShell>
  );
}
