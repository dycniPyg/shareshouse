import { RoleShell } from "@/components/role-shell";

const menu = [
  { href: "/staff/finance", label: "정산 담당" },
];

export default function FinancePage() {
  return (
    <RoleShell roleLabel="정산 담당" title="정산 담당 화면" description="입주자별 월세 납부 현황과 계약 종료 알람을 관리합니다." menuItems={menu}>
      <section className="card">
        <h3>입주자별 월세/계약 알람</h3>
        <table>
          <thead><tr><th>입주자</th><th>납부 현황</th><th>계약기간</th><th>종료일</th><th>알람</th></tr></thead>
          <tbody>
            <tr><td>김민지(101호)</td><td>납부완료</td><td>2026-03-01 ~ 2027-02-28</td><td>2027-02-28</td><td>정상</td></tr>
            <tr><td>이현우(102호)</td><td>부분납부</td><td>2026-03-15 ~ 2027-03-14</td><td>2027-03-14</td><td>미납 리마인드</td></tr>
            <tr><td>박지훈(201호)</td><td>미납</td><td>2025-03-01 ~ 2026-02-28</td><td>2026-02-28</td><td>종료 임박</td></tr>
          </tbody>
        </table>
      </section>
    </RoleShell>
  );
}
