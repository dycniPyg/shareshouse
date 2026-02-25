"use client";

import { useState } from "react";
import { RoleShell } from "@/components/role-shell";

const menu = [
  { href: "/resident", label: "입주자 홈" },
];

export default function ResidentPage() {
  const [issues, setIssues] = useState([
    { title: "욕실 배수", status: "처리중" },
    { title: "복도 소음", status: "접수" },
  ]);
  const [issueTitle, setIssueTitle] = useState("");

  return (
    <RoleShell roleLabel="입주자" title="입주자 화면" description="보증금/월세 계약 현황, 월세 납부 목록, 애로사항 및 공지사항을 확인합니다." menuItems={menu}>
      <section className="grid two">
        <article className="card">
          <h3>보증금/월세 계약 현황</h3>
          <table>
            <tbody>
              <tr><th>보증금</th><td>2,000,000원</td></tr>
              <tr><th>월세</th><td>650,000원</td></tr>
              <tr><th>계약기간</th><td>2026-03-01 ~ 2027-02-28</td></tr>
            </tbody>
          </table>
        </article>
        <article className="card">
          <h3>공지사항</h3>
          <ul><li>2월 공용부 정기 점검 안내</li><li>분리수거 배출 시간 준수</li></ul>
        </article>
      </section>

      <section className="card">
        <h3>월세 납부 목록</h3>
        <table><thead><tr><th>월</th><th>금액</th><th>상태</th></tr></thead><tbody><tr><td>2026-01</td><td>650,000원</td><td>완료</td></tr><tr><td>2026-02</td><td>650,000원</td><td>완료</td></tr><tr><td>2026-03</td><td>650,000원</td><td>예정</td></tr></tbody></table>
      </section>

      <section className="grid two">
        <article className="card">
          <h3>애로사항 등록</h3>
          <form className="inline-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="issue">내용</label>
            <input id="issue" value={issueTitle} onChange={(e) => setIssueTitle(e.target.value)} placeholder="애로사항 입력" />
            <button type="button" className="primary-button" onClick={() => { if (issueTitle.trim()) { setIssues((p) => [{ title: issueTitle.trim(), status: "접수" }, ...p]); setIssueTitle(""); } }}>등록</button>
          </form>
        </article>
        <article className="card">
          <h3>애로사항 확인</h3>
          <table><thead><tr><th>내용</th><th>상태</th></tr></thead><tbody>{issues.map((i, idx) => <tr key={`${i.title}-${idx}`}><td>{i.title}</td><td>{i.status}</td></tr>)}</tbody></table>
        </article>
      </section>
    </RoleShell>
  );
}
