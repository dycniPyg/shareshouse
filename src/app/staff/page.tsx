"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import {
  rolePolicies,
  staffAssignments,
  staffMembers,
  type RolePolicy,
  type StaffMember,
} from "@/lib/mock-data";

type ModalType = "staff" | "role" | null;

type StaffForm = {
  name: string;
  role: StaffMember["role"];
  phone: string;
  assignedHouse: string;
  status: StaffMember["status"];
};

type RoleForm = {
  role: RolePolicy["role"];
  scope: string;
  permissions: string;
};

const emptyStaffForm: StaffForm = {
  name: "",
  role: "스태프",
  phone: "",
  assignedHouse: "",
  status: "근무중",
};

const emptyRoleForm: RoleForm = {
  role: "스태프",
  scope: "",
  permissions: "",
};

function nowStamp() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const h = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d} ${h}:${mm}`;
}

export default function StaffPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(staffMembers);
  const [roleList, setRoleList] = useState<RolePolicy[]>(rolePolicies);
  const [staffForm, setStaffForm] = useState<StaffForm>(emptyStaffForm);
  const [roleForm, setRoleForm] = useState<RoleForm>(emptyRoleForm);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalMessage, setModalMessage] = useState("");
  const [staffTaskMap, setStaffTaskMap] = useState<Record<string, string>>(
    () =>
      staffMembers.reduce<Record<string, string>>((acc, member) => {
        const matched = staffAssignments.find((assignment) => assignment.assignee === member.name);
        acc[member.id] = matched?.taskType ?? "미할당";
        return acc;
      }, {}),
  );

  const closeModal = () => {
    setModalType(null);
    setModalMessage("");
  };

  const registerStaff = () => {
    if (!staffForm.name.trim() || !staffForm.phone.trim() || !staffForm.assignedHouse.trim()) {
      setModalMessage("이름, 연락처, 담당 하우스를 입력하세요.");
      return;
    }

    const nextId = `ST-${String(staffList.length + 1).padStart(3, "0")}`;
    const next: StaffMember = {
      id: nextId,
      name: staffForm.name.trim(),
      role: staffForm.role,
      phone: staffForm.phone.trim(),
      assignedHouse: staffForm.assignedHouse.trim(),
      status: staffForm.status,
    };

    setStaffList((prev) => [next, ...prev]);
    setStaffTaskMap((prev) => ({ ...prev, [next.id]: "미할당" }));
    setStaffForm(emptyStaffForm);
    closeModal();
  };

  const registerRole = () => {
    if (!roleForm.scope.trim() || !roleForm.permissions.trim()) {
      setModalMessage("적용 범위와 권한 설명을 입력하세요.");
      return;
    }

    const next: RolePolicy = {
      role: roleForm.role,
      scope: roleForm.scope.trim(),
      permissions: roleForm.permissions.trim(),
      updatedAt: nowStamp(),
    };

    setRoleList((prev) => [next, ...prev]);
    setRoleForm(emptyRoleForm);
    closeModal();
  };

  return (
    <AppShell
      title="담당자 관리"
      description="쉐어하우스 운영 담당자와 역할/권한, 담당 업무(워크로드/SLA)를 등록하고 모니터링합니다."
    >
      <section className="card">
        <h3>역할/권한 목록</h3>
        <table>
          <thead>
            <tr>
              <th>역할</th>
              <th>범위</th>
              <th>권한</th>
              <th>수정일</th>
            </tr>
          </thead>
          <tbody>
            {roleList.map((policy, idx) => (
              <tr key={`${policy.role}-${policy.updatedAt}-${idx}`}>
                <td>{policy.role}</td>
                <td>{policy.scope}</td>
                <td>{policy.permissions}</td>
                <td>{policy.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <div className="section-head">
          <h3>담당자 목록</h3>
          <div className="inline-actions">
            <button type="button" className="secondary-button compact-button" onClick={() => setModalType("staff")}>
              담당자 등록
            </button>
            <button type="button" className="secondary-button compact-button" onClick={() => setModalType("role")}>
              역할/권한 등록
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>역할</th>
              <th>연락처</th>
              <th>담당 하우스</th>
              <th>근무 상태</th>
              <th>업무 할당</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.role}</td>
                <td>{member.phone}</td>
                <td>{member.assignedHouse}</td>
                <td>{member.status}</td>
                <td>
                  <select
                    value={staffTaskMap[member.id] ?? "미할당"}
                    onChange={(e) =>
                      setStaffTaskMap((prev) => ({
                        ...prev,
                        [member.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="미할당">미할당</option>
                    <option value="모집/리드">모집/리드</option>
                    <option value="입주/계약">입주/계약</option>
                    <option value="월세/정산">월세/정산</option>
                    <option value="청결/민원">청결/민원</option>
                    <option value="에너지/공과금">에너지/공과금</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {modalType ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="등록 팝업">
          <div className="modal-card">
            <div className="section-head modal-title">
              <h3>{modalType === "staff" ? "담당자 등록" : "역할/권한 등록"}</h3>
              <div className="window-actions">
                <button type="button" className="icon-button" aria-label="닫기" onClick={closeModal}>
                  X
                </button>
              </div>
            </div>

            {modalType === "staff" ? (
              <form className="inline-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="staff-name">이름</label>
                <input
                  id="staff-name"
                  name="staff-name"
                  type="text"
                  value={staffForm.name}
                  onChange={(e) => setStaffForm((prev) => ({ ...prev, name: e.target.value }))}
                />

                <label htmlFor="staff-role">역할</label>
                <select
                  id="staff-role"
                  name="staff-role"
                  value={staffForm.role}
                  onChange={(e) =>
                    setStaffForm((prev) => ({
                      ...prev,
                      role: e.target.value as StaffMember["role"],
                    }))
                  }
                >
                  <option value="운영자">운영자</option>
                  <option value="스태프">스태프</option>
                  <option value="정산 담당">정산 담당</option>
                  <option value="시설 담당">시설 담당</option>
                </select>

                <label htmlFor="staff-phone">연락처</label>
                <input
                  id="staff-phone"
                  name="staff-phone"
                  type="text"
                  value={staffForm.phone}
                  onChange={(e) => setStaffForm((prev) => ({ ...prev, phone: e.target.value }))}
                />

                <label htmlFor="staff-house">담당 하우스</label>
                <input
                  id="staff-house"
                  name="staff-house"
                  type="text"
                  value={staffForm.assignedHouse}
                  onChange={(e) => setStaffForm((prev) => ({ ...prev, assignedHouse: e.target.value }))}
                />

                <label>근무 상태</label>
                <div className="radio-row">
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="staff-status"
                      value="근무중"
                      checked={staffForm.status === "근무중"}
                      onChange={() => setStaffForm((prev) => ({ ...prev, status: "근무중" }))}
                    />
                    근무중
                  </label>
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="staff-status"
                      value="휴무"
                      checked={staffForm.status === "휴무"}
                      onChange={() => setStaffForm((prev) => ({ ...prev, status: "휴무" }))}
                    />
                    휴무
                  </label>
                </div>

                <div className="modal-actions">
                  <button type="button" className="secondary-button" onClick={closeModal}>
                    취소
                  </button>
                  <button type="button" className="primary-button" onClick={registerStaff}>
                    등록
                  </button>
                </div>
              </form>
            ) : (
              <form className="inline-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="role-name">역할명</label>
                <select
                  id="role-name"
                  name="role-name"
                  value={roleForm.role}
                  onChange={(e) =>
                    setRoleForm((prev) => ({
                      ...prev,
                      role: e.target.value as RolePolicy["role"],
                    }))
                  }
                >
                  <option value="운영자">운영자</option>
                  <option value="스태프">스태프</option>
                  <option value="정산 담당">정산 담당</option>
                  <option value="시설 담당">시설 담당</option>
                </select>

                <label htmlFor="role-scope">적용 범위</label>
                <input
                  id="role-scope"
                  name="role-scope"
                  type="text"
                  value={roleForm.scope}
                  onChange={(e) => setRoleForm((prev) => ({ ...prev, scope: e.target.value }))}
                />

                <label htmlFor="role-permissions">권한 설명</label>
                <input
                  id="role-permissions"
                  name="role-permissions"
                  type="text"
                  value={roleForm.permissions}
                  onChange={(e) => setRoleForm((prev) => ({ ...prev, permissions: e.target.value }))}
                />

                <div className="modal-actions">
                  <button type="button" className="secondary-button" onClick={closeModal}>
                    취소
                  </button>
                  <button type="button" className="primary-button" onClick={registerRole}>
                    등록
                  </button>
                </div>
              </form>
            )}

            {modalMessage ? <p className="muted">{modalMessage}</p> : null}
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
