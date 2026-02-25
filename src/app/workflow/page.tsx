import { AppShell } from "@/components/app-shell";
import { businessWorkflow } from "@/lib/mock-data";

export default function WorkflowPage() {
  return (
    <AppShell
      title="업무 플로우"
      description="쉐어하우스 전체 운영 흐름을 단계별 목표, 트리거, 산출물, KPI 기준으로 관리합니다."
    >
      <section className="card">
        <h3>전체 업무 플로우 맵</h3>
        <table>
          <thead>
            <tr>
              <th>단계</th>
              <th>목표</th>
              <th>담당</th>
              <th>트리거</th>
              <th>산출물</th>
              <th>KPI</th>
            </tr>
          </thead>
          <tbody>
            {businessWorkflow.map((step) => (
              <tr key={step.phase}>
                <td>{step.phase}</td>
                <td>{step.objective}</td>
                <td>{step.owner}</td>
                <td>{step.trigger}</td>
                <td>{step.output}</td>
                <td>{step.kpi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AppShell>
  );
}
