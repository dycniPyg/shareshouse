"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>쉐어하우스 OS</h2>
        <p>{roleLabel}</p>
        <nav>
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "menu active" : "menu"}>
              {item.label}
            </Link>
          ))}
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
