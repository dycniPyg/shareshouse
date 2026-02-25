import { AppShell, StatusPill } from "@/components/app-shell";
import { leads } from "@/lib/mock-data";

export default function LeadsPage() {
  return (
    <AppShell
      title="모집/리드 관리"
      description="문의 파이프라인(신규→상담중→방문예약→계약대기→계약완료)을 관리합니다."
    >
      <section className="card">
        <h3>채널 성과 요약</h3>
        <div className="stack">
          <StatusPill text="네이버 문의 17건" />
          <StatusPill text="유튜브 문의 9건" />
          <StatusPill text="카카오 문의 13건" />
          <StatusPill text="전환율 28%" />
        </div>
      </section>

      <section className="card">
        <h3>리드 목록</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>유입 채널</th>
              <th>희망 입주일</th>
              <th>단계</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.channel}</td>
                <td>{lead.desiredMoveIn}</td>
                <td>{lead.stage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AppShell>
  );
}
