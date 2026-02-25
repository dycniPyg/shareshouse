"use client";

import { useState } from "react";
import { RoleShell } from "@/components/role-shell";

const menu = [
  { href: "/staff/setup", label: "초기 세팅" },
];

export default function SetupPage() {
  const [homes, setHomes] = useState([
    { address: "서울시 강남구 A로 10", area: "42", rooms: "3", baths: "2", plan: "layout_a10.png" },
  ]);
  const [form, setForm] = useState({ address: "", area: "", rooms: "", baths: "", plan: "" });

  const registerHome = () => {
    if (!form.address.trim() || !form.area || !form.rooms || !form.baths || !form.plan) return;
    setHomes((p) => [{ ...form, address: form.address.trim() }, ...p]);
    setForm({ address: "", area: "", rooms: "", baths: "", plan: "" });
  };

  return (
    <RoleShell roleLabel="초기 세팅 담당" title="초기 세팅 담당 화면" description="임대 주택 주소/평수/방/화장실/구조도 정보를 등록합니다." menuItems={menu}>
      <section className="card">
        <h3>임대 주택 등록</h3>
        <form className="inline-form three-col" onSubmit={(e) => e.preventDefault()}>
          <div><label htmlFor="addr">주소</label><input id="addr" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} /></div>
          <div><label htmlFor="area">평수</label><input id="area" value={form.area} onChange={(e) => setForm((p) => ({ ...p, area: e.target.value }))} /></div>
          <div><label htmlFor="rooms">방 개수</label><input id="rooms" value={form.rooms} onChange={(e) => setForm((p) => ({ ...p, rooms: e.target.value }))} /></div>
          <div><label htmlFor="baths">화장실 개수</label><input id="baths" value={form.baths} onChange={(e) => setForm((p) => ({ ...p, baths: e.target.value }))} /></div>
          <div><label htmlFor="plan">구조도 업로드</label><input id="plan" type="file" accept="image/*" onChange={(e) => setForm((p) => ({ ...p, plan: e.target.files?.[0]?.name ?? "" }))} /></div>
          <button type="button" className="primary-button" onClick={registerHome}>등록</button>
        </form>
      </section>
      <section className="card">
        <h3>등록 주택 목록</h3>
        <table><thead><tr><th>주소</th><th>평수</th><th>방</th><th>화장실</th><th>구조도</th></tr></thead><tbody>{homes.map((h, i) => <tr key={`${h.address}-${i}`}><td>{h.address}</td><td>{h.area}</td><td>{h.rooms}</td><td>{h.baths}</td><td>{h.plan}</td></tr>)}</tbody></table>
      </section>
    </RoleShell>
  );
}
