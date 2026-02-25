import { RoleShell } from "@/components/role-shell";

const operatorMenu = [
  { href: "/operator", label: "운영자 대시보드" },
  { href: "/staff/finance", label: "정산 담당" },
  { href: "/staff/facility", label: "시설 담당" },
  { href: "/staff/cleaning", label: "청소 담당" },
  { href: "/staff/call", label: "콜 담당" },
  { href: "/staff/setup", label: "초기 세팅" },
  { href: "/resident", label: "입주자 화면" },
];

export default function OperatorPage() {
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
    </RoleShell>
  );
}
