import { AppShell, StatusPill } from "@/components/app-shell";
import {
  pipelineStats,
  residentBillingAccounts,
  residentRoutines,
  routineActionQueue,
  staffAssignments,
  summaryCards,
} from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <AppShell
      title="운영 대시보드"
      description="공실, 미납, 민원, 청소 KPI와 입주민 월간 루틴 이행 상태를 한 화면에서 관리합니다."
    >
      <section className="grid four">
        {summaryCards.map((card) => (
          <article className="card" key={card.label}>
            <p className="label">{card.label}</p>
            <strong>{card.value}</strong>
            <p className="muted">{card.delta}</p>
          </article>
        ))}
      </section>

      <section className="grid two">
        <article className="card">
          <h3>운영 파이프라인 실시간 현황</h3>
          <table>
            <thead>
              <tr>
                <th>단계</th>
                <th>진행 건수</th>
                <th>지연 건수</th>
                <th>담당</th>
                <th>오늘 액션</th>
              </tr>
            </thead>
            <tbody>
              {pipelineStats.map((item) => (
                <tr key={item.step}>
                  <td>{item.step}</td>
                  <td>{item.total}건</td>
                  <td>
                    <StatusPill text={`${item.delayed}건`} />
                  </td>
                  <td>{item.owner}</td>
                  <td>{item.todayAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="card">
          <h3>입주민 월간 루틴 조치 큐</h3>
          <table>
            <thead>
              <tr>
                <th>입주민</th>
                <th>이슈</th>
                <th>우선순위</th>
                <th>담당 액션</th>
                <th>기한</th>
                <th>처리</th>
              </tr>
            </thead>
            <tbody>
              {routineActionQueue.map((item, idx) => (
                <tr key={`${item.room}-${item.resident}-${idx}`}>
                  <td>
                    {item.resident} ({item.room})
                  </td>
                  <td>{item.issue}</td>
                  <td>{item.priority}</td>
                  <td>{item.action}</td>
                  <td>{item.dueAt}</td>
                  <td>
                    <button type="button" className="action-button">
                      조치 완료
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>

      <section className="card">
        <h3>담당자 업무 부하 현황</h3>
        <table>
          <thead>
            <tr>
              <th>업무 영역</th>
              <th>담당자</th>
              <th>진행 건수</th>
              <th>지연 건수</th>
              <th>SLA</th>
            </tr>
          </thead>
          <tbody>
            {staffAssignments.map((assignment) => (
              <tr key={`${assignment.taskType}-${assignment.assignee}`}>
                <td>{assignment.taskType}</td>
                <td>{assignment.assignee}</td>
                <td>{assignment.workload}건</td>
                <td>{assignment.overdue}건</td>
                <td>{assignment.sla}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h3>계좌 확인 필요 입주민</h3>
        <table>
          <thead>
            <tr>
              <th>입주민</th>
              <th>호실</th>
              <th>은행</th>
              <th>자동납부</th>
              <th>상태</th>
              <th>최종 확인일</th>
            </tr>
          </thead>
          <tbody>
            {residentBillingAccounts
              .filter((account) => account.status === "확인필요")
              .map((account) => (
                <tr key={`${account.room}-${account.resident}`}>
                  <td>{account.resident}</td>
                  <td>{account.room}</td>
                  <td>{account.bank}</td>
                  <td>{account.autoPay}</td>
                  <td>{account.status}</td>
                  <td>{account.verifiedAt}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h3>입주민 월간 루틴 현황 (운영자 뷰)</h3>
        <table>
          <thead>
            <tr>
              <th>입주민</th>
              <th>호실</th>
              <th>청구서 알림 확인</th>
              <th>자동 납부 설정</th>
              <th>민원 티켓 접수</th>
              <th>공지/규칙 확인</th>
              <th>최근 업데이트</th>
            </tr>
          </thead>
          <tbody>
            {residentRoutines.map((routine) => (
              <tr key={`${routine.room}-${routine.resident}`}>
                <td>{routine.resident}</td>
                <td>{routine.room}</td>
                <td>{routine.billNotice}</td>
                <td>{routine.autoPay}</td>
                <td>{routine.complaintTicket}</td>
                <td>{routine.rulesNotice}</td>
                <td>{routine.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AppShell>
  );
}
