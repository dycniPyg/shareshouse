"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAllAccounts, setCurrentUser } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const account = getAllAccounts().find((item) => item.email === email.trim() && item.password === password);
    if (!account) {
      setMessage("계정 정보가 올바르지 않습니다.");
      return;
    }
    setCurrentUser({ email: account.email, role: account.role, redirectTo: account.redirectTo });
    router.push(account.redirectTo);
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <p className="chip">Share House OS</p>
        <h1>쉐어하우스 관리 플랫폼</h1>
        <p className="muted">운영자/담당자/입주자 계정으로 로그인하세요.</p>

        <form className="login-form" onSubmit={onLogin}>
          <label htmlFor="email">이메일</label>
          <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="password">비밀번호</label>
          <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" className="login-submit">로그인</button>
        </form>

        {message ? <p className="muted">{message}</p> : null}
      </section>
    </main>
  );
}
