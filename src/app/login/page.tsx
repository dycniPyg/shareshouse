import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card">
        <p className="chip">Share House OS</p>
        <h1>쉐어하우스 관리 플랫폼</h1>
        <p className="muted">운영자/스태프/입주민 계정으로 로그인하세요.</p>

        <form className="login-form" action="/dashboard">
          <label htmlFor="email">이메일</label>
          <input id="email" name="email" type="email" placeholder="manager@sharehouse.kr" required />

          <label htmlFor="password">비밀번호</label>
          <input id="password" name="password" type="password" placeholder="********" required />

          <button type="submit">로그인</button>
        </form>

        <div className="login-footnote">
          <span>테스트 계정으로 시작하려면 바로 이동</span>
          <Link href="/dashboard">대시보드로 이동</Link>
        </div>
      </section>
    </main>
  );
}
