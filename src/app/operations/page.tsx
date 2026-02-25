import { AppShell } from "@/components/app-shell";
import { tickets } from "@/lib/mock-data";

export default function OperationsPage() {
  return (
    <AppShell
      title="청결/민원"
      description="청소 체크리스트와 민원/하자 티켓을 SLA 기준으로 관리합니다."
    >
      <section className="grid two">
        <article className="card">
          <h3>청결관리</h3>
          <ul>
            <li>공용공간별 청소 체크리스트</li>
            <li>담당자 배정 및 사진 인증</li>
            <li>미완료 자동 재배정</li>
            <li>월별 청소 기록 아카이브</li>
          </ul>
        </article>

        <article className="card">
          <h3>민원/하자 티켓</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>제목</th>
                <th>분류</th>
                <th>상태</th>
                <th>담당</th>
                <th>SLA</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.category}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.assignee}</td>
                  <td>{ticket.sla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </AppShell>
  );
}
