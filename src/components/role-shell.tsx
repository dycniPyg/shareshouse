"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clearCurrentUser, useCurrentUserStore } from "@/lib/auth-client";

type MenuItem = { href: string; label: string };

type RoleShellProps = {
  roleLabel: string;
  title: string;
  description: string;
  menuItems: MenuItem[];
  children: React.ReactNode;
};

export function RoleShell({ roleLabel, title, description, menuItems, children }: RoleShellProps) {
  const pathname = usePathname();
  const user = useCurrentUserStore();
  const loginUser = user ? `${user.role} / ${user.email}` : "-";

  return (
    <div className="shell-frame">
      <header className="global-header">
        <h2>쉐어하우스 OS</h2>
        <div className="global-header-right">
          <p className="top-user">로그인: {loginUser}</p>
          <Link className="top-logout" href="/login" onClick={clearCurrentUser}>
            로그아웃
          </Link>
        </div>
      </header>

      <div className="app-shell">
        <aside className="sidebar">
          <p>{roleLabel}</p>
          <nav>
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className={pathname === item.href ? "menu active" : "menu"}>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="content">
          <header className="content-header">
            <h1>{title}</h1>
            <p>{description}</p>
          </header>
          <div className="content-body">{children}</div>
        </main>
      </div>

      <footer className="global-footer">sharehouser flatform</footer>
    </div>
  );
}
