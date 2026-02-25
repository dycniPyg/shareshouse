import { AppShell } from "@/components/app-shell";
import { utilityReadings } from "@/lib/mock-data";

export default function UtilitiesPage() {
  return (
    <AppShell
      title="에너지/공과금"
      description="월별 검침 입력, 배분 룰, 급증 경고를 기반으로 공과금 진단을 수행합니다."
    >
      <section className="card">
        <h3>에너지 진단 레벨</h3>
        <p>Level 1: 월별 검침 입력 / Level 2: 스마트미터 연동(확장)</p>
      </section>

      <section className="card">
        <h3>월별 검침 추이</h3>
        <table>
          <thead>
            <tr>
              <th>월</th>
              <th>전기(kWh)</th>
              <th>수도(ton)</th>
              <th>가스(m3)</th>
              <th>진단</th>
            </tr>
          </thead>
          <tbody>
            {utilityReadings.map((reading) => (
              <tr key={reading.month}>
                <td>{reading.month}</td>
                <td>{reading.electricity}</td>
                <td>{reading.water}</td>
                <td>{reading.gas}</td>
                <td>{reading.alert}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AppShell>
  );
}
