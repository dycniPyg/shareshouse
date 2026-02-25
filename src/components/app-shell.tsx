"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/dashboard", label: "운영 대시보드" },
  { href: "/leads", label: "모집/리드" },
  { href: "/contracts", label: "입주/계약" },
  { href: "/billing", label: "월세/정산" },
  { href: "/staff", label: "담당자 관리" },
  { href: "/workflow", label: "업무 플로우" },
  { href: "/operations", label: "청결/민원" },
  { href: "/utilities", label: "에너지/공과금" },
];

type AppShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AppShell({ title, description, children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>쉐어하우스 OS</h2>
        <p>운영자 콘솔</p>
        <nav>
          {menuItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={active ? "menu active" : "menu"}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link className="logout" href="/login">
          로그아웃
        </Link>
      </aside>

      <main className="content">
        <header className="content-header">
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        {children}
      </main>
    </div>
  );
}

export function StatusPill({ text }: { text: string }) {
  return <span className="pill">{text}</span>;
}
