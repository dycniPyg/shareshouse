"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Account } from "@/lib/accounts";
import { residentRoutines, staffMembers } from "@/lib/mock-data";
import { getAllAccounts, saveCustomAccounts, useCustomAccountsStore } from "@/lib/auth-client";

type UserType = "담당자" | "입주자";
type FilterType = "전체" | UserType;

type UserRow = {
  userType: UserType;
  name: string;
  role: string;
  room: string;
};

const roleRedirectMap: Record<string, string> = {
  "운영자": "/dashboard",
  "정산 담당": "/staff/finance",
  "시설 담당": "/staff/facility",
  "청소 담당": "/staff/cleaning",
  "콜 담당": "/staff/call",
  "초기 세팅 담당": "/staff/setup",
  "입주자": "/resident",
  "스태프": "/staff",
};

function buildUserRows(): UserRow[] {
  const staffRows: UserRow[] = staffMembers.map((member) => ({
    userType: "담당자",
    name: member.name,
    role: member.role,
    room: "-",
  }));
  const residentRows: UserRow[] = residentRoutines.map((resident) => ({
    userType: "입주자",
    name: resident.resident,
    role: "입주자",
    room: resident.room,
  }));
  return [...staffRows, ...residentRows];
}

function matchMappedAccount(row: UserRow, customAccounts: Account[]) {
  return customAccounts.find((account) => {
    if (account.userType !== row.userType || account.userName !== row.name) return false;
    if (row.userType === "입주자") return account.room === row.room;
    return true;
  });
}

export default function UsersPage() {
  const customAccounts = useCustomAccountsStore();
  const [rows] = useState<UserRow[]>(() => buildUserRows());
  const [filter, setFilter] = useState<FilterType>("전체");
  const [target, setTarget] = useState<UserRow | null>(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const visibleRows = useMemo(
    () => rows.filter((row) => (filter === "전체" ? true : row.userType === filter)),
    [rows, filter],
  );

  const openAccountModal = (row: UserRow) => {
    const current = matchMappedAccount(row, customAccounts);
    setTarget(row);
    setMessage("");
    setForm({
      email: current?.email ?? "",
      password: current?.password ?? "",
    });
  };

  const closeModal = () => {
    setTarget(null);
    setMessage("");
  };

  const saveAccount = () => {
    if (!target) return;
    const email = form.email.trim();
    const password = form.password.trim();
    if (!email || !password) {
      setMessage("이메일과 비밀번호를 입력하세요.");
      return;
    }

    const existingMapped = matchMappedAccount(target, customAccounts);
    const duplicate = getAllAccounts().find(
      (account) => account.email === email && account.email !== existingMapped?.email,
    );
    if (duplicate) {
      setMessage("이미 사용 중인 이메일입니다.");
      return;
    }

    const next: Account = {
      role: target.role,
      email,
      password,
      redirectTo: roleRedirectMap[target.role] ?? "/dashboard",
      userType: target.userType,
      userName: target.name,
      room: target.userType === "입주자" ? target.room : undefined,
    };

    const updated = customAccounts.filter((account) => {
      const sameUser =
        account.userType === target.userType &&
        account.userName === target.name &&
        (target.userType === "입주자" ? account.room === target.room : true);
      if (sameUser) return false;
      if (account.email === email) return false;
      return true;
    });

    saveCustomAccounts([next, ...updated]);
    closeModal();
  };

  const resetPassword = () => {
    if (!target) return;
    const mapped = matchMappedAccount(target, customAccounts);
    if (!mapped) {
      setMessage("계정이 없어 초기화할 수 없습니다. 먼저 생성하세요.");
      return;
    }

    const updated = customAccounts.map((account) => {
      const sameUser =
        account.userType === target.userType &&
        account.userName === target.name &&
        (target.userType === "입주자" ? account.room === target.room : true);
      return sameUser ? { ...account, password: "1234" } : account;
    });
    saveCustomAccounts(updated);
    setForm((prev) => ({ ...prev, password: "1234" }));
    setMessage("비밀번호를 1234로 초기화했습니다. 저장되었습니다.");
  };

  const selectedMapped = target ? matchMappedAccount(target, customAccounts) : null;

  return (
    <AppShell
      title="사용자 관리"
      description="담당자/입주자 계정을 조회하고, 계정이 없으면 생성하며 기존 계정 수정과 비밀번호 초기화를 처리합니다."
    >
      <section className="card">
        <div className="section-head">
          <h3>담당자/입주자 계정 조회</h3>
          <div className="inline-actions">
            <select value={filter} onChange={(e) => setFilter(e.target.value as FilterType)}>
              <option value="전체">전체</option>
              <option value="담당자">담당자</option>
              <option value="입주자">입주자</option>
            </select>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>구분</th>
              <th>이름</th>
              <th>역할</th>
              <th>동/호</th>
              <th>계정 이메일</th>
              <th>계정 상태</th>
              <th>로그인 화면</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, idx) => {
              const mapped = matchMappedAccount(row, customAccounts);
              return (
                <tr key={`${row.userType}-${row.name}-${row.room}-${idx}`}>
                  <td>{row.userType}</td>
                  <td>{row.name}</td>
                  <td>{row.role}</td>
                  <td>{row.room}</td>
                  <td>
                    <button type="button" className="table-link-button" onClick={() => openAccountModal(row)}>
                      {mapped?.email ?? "계정 생성"}
                    </button>
                  </td>
                  <td>
                    <button type="button" className="table-link-button" onClick={() => openAccountModal(row)}>
                      {mapped ? "등록됨 (수정)" : "미등록 (생성)"}
                    </button>
                  </td>
                  <td>{mapped?.redirectTo ?? roleRedirectMap[row.role] ?? "/dashboard"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {target ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="계정 생성 및 수정 팝업">
          <div className="modal-card">
            <div className="section-head modal-title">
              <h3>{target.userType} 계정 {selectedMapped ? "수정" : "생성"}</h3>
              <div className="window-actions">
                <button type="button" className="icon-button" aria-label="닫기" onClick={closeModal}>
                  X
                </button>
              </div>
            </div>

            <form className="inline-form" onSubmit={(e) => e.preventDefault()}>
              <label>구분</label>
              <input type="text" value={target.userType} readOnly />

              <label>이름</label>
              <input type="text" value={target.name} readOnly />

              <label>역할</label>
              <input type="text" value={target.role} readOnly />

              <label>동/호</label>
              <input type="text" value={target.room} readOnly />

              <label htmlFor="account-email">이메일</label>
              <input
                id="account-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="example@sharehouse.kr"
              />

              <label htmlFor="account-password">비밀번호</label>
              <input
                id="account-password"
                type="text"
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              />

              <label>로그인 후 화면</label>
              <input type="text" value={roleRedirectMap[target.role] ?? "/dashboard"} readOnly />

              {message ? <p className="muted">{message}</p> : null}

              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={closeModal}>
                  취소
                </button>
                <button type="button" className="secondary-button" onClick={resetPassword}>
                  비밀번호 초기화
                </button>
                <button type="button" className="primary-button" onClick={saveAccount}>
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
