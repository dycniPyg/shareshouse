import { RoleShell } from "@/components/role-shell";

const menu = [
  { href: "/staff/facility", label: "시설 담당" },
];

export default function FacilityPage() {
  return (
    <RoleShell roleLabel="시설 담당" title="시설 담당 화면" description="건물 설비 점검 현황과 고장 처리 일정을 관리합니다." menuItems={menu}>
      <section className="card">
        <h3>시설 점검 현황</h3>
        <table>
          <thead><tr><th>대상</th><th>점검 항목</th><th>최근 점검일</th><th>다음 점검일</th><th>상태</th></tr></thead>
          <tbody>
            <tr><td>강남1호점</td><td>소방 설비</td><td>2026-02-20</td><td>2026-03-20</td><td>정상</td></tr>
            <tr><td>강남2호점</td><td>보일러</td><td>2026-02-18</td><td>2026-03-18</td><td>주의</td></tr>
          </tbody>
        </table>
      </section>
    </RoleShell>
  );
}
