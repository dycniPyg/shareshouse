"use client";

import { useState } from "react";
import { RoleShell } from "@/components/role-shell";

const menu = [
  { href: "/staff/cleaning", label: "청소 담당" },
];

export default function CleaningPage() {
  const [rows, setRows] = useState([
    { place: "강남1호점 3층 복도", photo: "corridor_0301.jpg", status: "완료" },
    { place: "강남2호점 계단", photo: "stairs_0228.jpg", status: "점검필요" },
  ]);
  const [form, setForm] = useState({ place: "", status: "완료", photo: "" });

  const addCleaning = () => {
    if (!form.place.trim() || !form.photo) return;
    setRows((prev) => [{ place: form.place.trim(), photo: form.photo, status: form.status }, ...prev]);
    setForm({ place: "", status: "완료", photo: "" });
  };

  return (
    <RoleShell roleLabel="청소 담당" title="청소 담당 화면" description="호실 및 건물 계단/복도 청소 사진과 상태를 등록합니다." menuItems={menu}>
      <section className="card">
        <h3>청소 사진 등록</h3>
        <form className="inline-form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="place">대상 위치</label>
          <input id="place" value={form.place} onChange={(e) => setForm((p) => ({ ...p, place: e.target.value }))} placeholder="예: 강남1호점 2층 복도" />
          <label htmlFor="status">상태</label>
          <select id="status" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}>
            <option>완료</option><option>점검필요</option><option>재청소</option>
          </select>
          <label htmlFor="photo">청소 사진</label>
          <input id="photo" type="file" accept="image/*" onChange={(e) => setForm((p) => ({ ...p, photo: e.target.files?.[0]?.name ?? "" }))} />
          <button type="button" className="primary-button" onClick={addCleaning}>등록</button>
        </form>
      </section>
      <section className="card">
        <h3>청소 이력</h3>
        <table>
          <thead><tr><th>위치</th><th>사진</th><th>상태</th></tr></thead>
          <tbody>{rows.map((r, i) => <tr key={`${r.place}-${i}`}><td>{r.place}</td><td>{r.photo}</td><td>{r.status}</td></tr>)}</tbody>
        </table>
      </section>
    </RoleShell>
  );
}
