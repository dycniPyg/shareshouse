"use client";

import { useState } from "react";
import { RoleShell } from "@/components/role-shell";

const menu = [
  { href: "/staff/call", label: "콜 담당" },
];

export default function CallPage() {
  const [notice, setNotice] = useState("");
  const [notices, setNotices] = useState(["2월 공용부 정기 점검 안내"]);

  const complaints = [
    { resident: "김민지", room: "101호", issue: "온수 지연", status: "처리중" },
    { resident: "이현우", room: "102호", issue: "복도 소음", status: "접수" },
  ];

  return (
    <RoleShell roleLabel="콜 담당" title="콜 담당 화면" description="입주자 공지사항 게시 및 입주자별 애로사항을 확인합니다." menuItems={menu}>
      <section className="card">
        <h3>공지사항 등록</h3>
        <form className="inline-form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="notice">공지 내용</label>
          <input id="notice" value={notice} onChange={(e) => setNotice(e.target.value)} placeholder="공지사항 입력" />
          <button type="button" className="primary-button" onClick={() => { if (notice.trim()) { setNotices((p) => [notice.trim(), ...p]); setNotice(""); } }}>공지 등록</button>
        </form>
      </section>
      <section className="grid two">
        <article className="card">
          <h3>공지 목록</h3>
          <ul>{notices.map((n, i) => <li key={`${n}-${i}`}>{n}</li>)}</ul>
        </article>
        <article className="card">
          <h3>입주자 애로사항</h3>
          <table><thead><tr><th>입주자</th><th>호실</th><th>내용</th><th>상태</th></tr></thead><tbody>{complaints.map((c, i) => <tr key={`${c.resident}-${i}`}><td>{c.resident}</td><td>{c.room}</td><td>{c.issue}</td><td>{c.status}</td></tr>)}</tbody></table>
        </article>
      </section>
    </RoleShell>
  );
}
