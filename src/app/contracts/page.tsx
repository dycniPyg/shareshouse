"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { contractPipeline, contracts, moveInChecklistItems } from "@/lib/mock-data";

type ModalType = "resident" | "status" | "contract" | null;

type ResidentEntry = {
  name: string;
  phone: string;
  email: string;
};

type ContractRow = {
  contractId: string;
  resident: string;
  room: string;
  leaseTerm: string;
  deposit: number;
  rent: number;
  status: string;
  moveInDate: string;
  moveOutDate: string;
  checklistProgress: string;
  contractFileName: string;
  contractFileUrl: string;
};

type ContractStatusDomain = {
  value: string;
  priority: number;
};

const won = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
});

const emptyResidentForm = { name: "", phone: "", email: "" };
const emptyStatusForm = { value: "", priority: "1" };

export default function ContractsPage() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalMessage, setModalMessage] = useState("");

  const [residentList, setResidentList] = useState<ResidentEntry[]>([
    { name: "김민지", phone: "010-1122-3344", email: "minji.kim@example.com" },
    { name: "이현우", phone: "010-2244-5566", email: "hyunwoo.lee@example.com" },
    { name: "박지훈", phone: "010-7788-9900", email: "jihoon.park@example.com" },
  ]);

  const [statusList, setStatusList] = useState<ContractStatusDomain[]>([
    { value: "입주대기", priority: 1 },
    { value: "입주완료", priority: 2 },
    { value: "퇴실예정", priority: 3 },
  ]);

  const [contractRows, setContractRows] = useState<ContractRow[]>(
    contracts.map((item) => ({
      contractId: item.contractId,
      resident: item.resident,
      room: item.room,
      leaseTerm: item.leaseTerm,
      deposit: item.deposit,
      rent: item.rent,
      status: item.status,
      moveInDate: item.moveInDate,
      moveOutDate: item.moveOutDate,
      checklistProgress: item.checklistProgress,
      contractFileName: "",
      contractFileUrl: "",
    })),
  );

  const [residentForm, setResidentForm] = useState(emptyResidentForm);
  const [statusForm, setStatusForm] = useState(emptyStatusForm);
  const [contractForm, setContractForm] = useState({
    resident: "",
    room: "",
    startDate: "",
    endDate: "",
    deposit: "",
    rent: "",
    status: "입주대기",
    moveInDate: "",
    moveOutDate: "",
    checklistProgress: "0/10",
    contractFile: null as File | null,
  });

  const residentNameOptions = useMemo(() => residentList.map((r) => r.name), [residentList]);

  const openModal = (type: Exclude<ModalType, null>) => {
    setModalMessage("");
    if (type === "contract") {
      setContractForm((prev) => ({
        ...prev,
        resident: prev.resident || residentNameOptions[0] || "",
        status: prev.status || statusList[0]?.value || "입주대기",
      }));
    }
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setModalMessage("");
  };

  const registerResident = () => {
    if (!residentForm.name.trim() || !residentForm.phone.trim() || !residentForm.email.trim()) {
      setModalMessage("이름, 연락처, 이메일을 모두 입력하세요.");
      return;
    }

    setResidentList((prev) => [
      {
        name: residentForm.name.trim(),
        phone: residentForm.phone.trim(),
        email: residentForm.email.trim(),
      },
      ...prev,
    ]);
    setResidentForm(emptyResidentForm);
    closeModal();
  };

  const registerStatus = () => {
    const nextStatus = statusForm.value.trim();
    const nextPriority = Number(statusForm.priority);
    if (!nextStatus) {
      setModalMessage("계약 상태 값을 입력하세요.");
      return;
    }

    if (!Number.isFinite(nextPriority) || nextPriority < 1) {
      setModalMessage("우선순위는 1 이상의 숫자로 입력하세요.");
      return;
    }

    if (statusList.some((item) => item.value === nextStatus)) {
      setModalMessage("이미 존재하는 계약 상태입니다.");
      return;
    }

    setStatusList((prev) =>
      [...prev, { value: nextStatus, priority: nextPriority }].sort((a, b) => a.priority - b.priority),
    );
    setStatusForm(emptyStatusForm);
    closeModal();
  };

  const registerContract = () => {
    if (
      !contractForm.resident ||
      !contractForm.room.trim() ||
      !contractForm.startDate ||
      !contractForm.endDate ||
      !contractForm.deposit.trim() ||
      !contractForm.rent.trim() ||
      !contractForm.status ||
      !contractForm.contractFile
    ) {
      setModalMessage("계약자, 호실, 계약기간, 금액, 상태, 계약서 이미지를 모두 입력하세요.");
      return;
    }

    const nextId = `CTR-${String(contractRows.length + 1).padStart(4, "0")}`;
    const leaseTerm = `${contractForm.startDate} ~ ${contractForm.endDate}`;

    setContractRows((prev) => [
      {
        contractId: nextId,
        resident: contractForm.resident,
        room: contractForm.room.trim(),
        leaseTerm,
        deposit: Number(contractForm.deposit),
        rent: Number(contractForm.rent),
        status: contractForm.status,
        moveInDate: contractForm.moveInDate || contractForm.startDate,
        moveOutDate: contractForm.moveOutDate || contractForm.endDate,
        checklistProgress: contractForm.checklistProgress.trim() || "0/10",
        contractFileName: contractForm.contractFile.name,
        contractFileUrl: URL.createObjectURL(contractForm.contractFile),
      },
      ...prev,
    ]);

    setContractForm({
      resident: residentNameOptions[0] || "",
      room: "",
      startDate: "",
      endDate: "",
      deposit: "",
      rent: "",
      status: statusList[0]?.value || "입주대기",
      moveInDate: "",
      moveOutDate: "",
      checklistProgress: "0/10",
      contractFile: null,
    });
    closeModal();
  };

  return (
    <AppShell
      title="입주/계약"
      description="계약 상태, 입주 체크리스트, 입주민/계약 등록을 팝업으로 관리합니다."
    >
      <section className="grid two">
        <article className="card pipeline-card">
          <h3>계약 파이프라인</h3>
          <div className="pipeline-layout">
            <ul className="pipeline-list">
              {contractPipeline.map((item) => (
                <li key={item.step}>
                  <span>{item.step}</span>
                  <span className="pipeline-count">{item.count}건</span>
                </li>
              ))}
            </ul>
            <aside className="pipeline-note">
              <p className="muted">운영 메모</p>
              <p>서류 검토중 단계는 24시간 내 처리 기준으로 확인하고, 체크리스트 80% 미만 건은 우선 보완합니다.</p>
            </aside>
          </div>
        </article>

        <article className="card">
          <h3>입주 체크리스트 템플릿</h3>
          <ul>
            {moveInChecklistItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="card">
        <div className="section-head">
          <h3>입주민 목록</h3>
          <button type="button" className="secondary-button compact-button" onClick={() => openModal("resident")}>
            입주민 등록
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>연락처</th>
              <th>이메일</th>
              <th>동/호</th>
            </tr>
          </thead>
          <tbody>
            {residentList.map((resident, idx) => (
              <tr key={`${resident.email}-${idx}`}>
                <td>{resident.name}</td>
                <td>{resident.phone}</td>
                <td>{resident.email}</td>
                <td>{contractRows.find((row) => row.resident === resident.name)?.room ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <div className="section-head">
          <h3>계약/입주 상세 목록</h3>
          <div className="inline-actions">
            <button type="button" className="secondary-button compact-button" onClick={() => openModal("status")}>
              계약 상태 등록
            </button>
            <button type="button" className="secondary-button compact-button" onClick={() => openModal("contract")}>
              계약 등록
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>계약ID</th>
              <th>입주민</th>
              <th>호실</th>
              <th>계약기간</th>
              <th>보증금</th>
              <th>월세</th>
              <th>상태</th>
              <th>입주일</th>
              <th>퇴실일</th>
              <th>체크리스트</th>
              <th>계약서 이미지</th>
            </tr>
          </thead>
          <tbody>
            {contractRows.map((contract) => (
              <tr key={contract.contractId}>
                <td>{contract.contractId}</td>
                <td>{contract.resident}</td>
                <td>{contract.room}</td>
                <td>{contract.leaseTerm}</td>
                <td>{won.format(contract.deposit)}</td>
                <td>{won.format(contract.rent)}</td>
                <td>{contract.status}</td>
                <td>{contract.moveInDate}</td>
                <td>{contract.moveOutDate}</td>
                <td>{contract.checklistProgress}</td>
                <td>
                  {contract.contractFileUrl ? (
                    <a href={contract.contractFileUrl} download={contract.contractFileName}>
                      {contract.contractFileName}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {modalType ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="입주/계약 등록 팝업">
          <div className="modal-card">
            <div className="section-head modal-title">
              <h3>
                {modalType === "resident"
                  ? "입주민 등록"
                  : modalType === "status"
                  ? "계약 상태 등록"
                  : "계약 등록"}
              </h3>
              <div className="window-actions">
                <button type="button" className="icon-button" aria-label="닫기" onClick={closeModal}>
                  X
                </button>
              </div>
            </div>

            {modalType === "resident" ? (
              <form className="inline-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="resident-name">이름</label>
                <input
                  id="resident-name"
                  type="text"
                  value={residentForm.name}
                  onChange={(e) => setResidentForm((prev) => ({ ...prev, name: e.target.value }))}
                />

                <label htmlFor="resident-phone">연락처</label>
                <input
                  id="resident-phone"
                  type="text"
                  value={residentForm.phone}
                  onChange={(e) => setResidentForm((prev) => ({ ...prev, phone: e.target.value }))}
                />

                <label htmlFor="resident-email">이메일</label>
                <input
                  id="resident-email"
                  type="email"
                  value={residentForm.email}
                  onChange={(e) => setResidentForm((prev) => ({ ...prev, email: e.target.value }))}
                />

                <div className="modal-actions">
                  <button type="button" className="secondary-button" onClick={closeModal}>
                    취소
                  </button>
                  <button type="button" className="primary-button" onClick={registerResident}>
                    등록
                  </button>
                </div>
              </form>
            ) : null}

            {modalType === "status" ? (
              <form className="inline-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="status-name">계약 상태값</label>
                <input
                  id="status-name"
                  type="text"
                  value={statusForm.value}
                  onChange={(e) => setStatusForm((prev) => ({ ...prev, value: e.target.value }))}
                  placeholder="예: 계약검토중"
                />

                <label htmlFor="status-priority">우선순위</label>
                <input
                  id="status-priority"
                  type="number"
                  min={1}
                  value={statusForm.priority}
                  onChange={(e) => setStatusForm((prev) => ({ ...prev, priority: e.target.value }))}
                />

                <table>
                  <thead>
                    <tr>
                      <th>현재 계약 상태값</th>
                      <th>우선순위</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statusList.map((status) => (
                      <tr key={status.value}>
                        <td>{status.value}</td>
                        <td>{status.priority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="modal-actions">
                  <button type="button" className="secondary-button" onClick={closeModal}>
                    취소
                  </button>
                  <button type="button" className="primary-button" onClick={registerStatus}>
                    등록
                  </button>
                </div>
              </form>
            ) : null}

            {modalType === "contract" ? (
              <form className="inline-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="contract-resident">계약자</label>
                <select
                  id="contract-resident"
                  value={contractForm.resident}
                  onChange={(e) => setContractForm((prev) => ({ ...prev, resident: e.target.value }))}
                >
                  <option value="">입주민 선택</option>
                  {residentNameOptions.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>

                <label htmlFor="contract-room">호실</label>
                <input
                  id="contract-room"
                  type="text"
                  value={contractForm.room}
                  onChange={(e) => setContractForm((prev) => ({ ...prev, room: e.target.value }))}
                />

                <label htmlFor="contract-start">계약 시작일</label>
                <input
                  id="contract-start"
                  type="date"
                  value={contractForm.startDate}
                  onChange={(e) => setContractForm((prev) => ({ ...prev, startDate: e.target.value }))}
                />

                <label htmlFor="contract-end">계약 종료일</label>
                <input
                  id="contract-end"
                  type="date"
                  value={contractForm.endDate}
                  onChange={(e) => setContractForm((prev) => ({ ...prev, endDate: e.target.value }))}
                />

                <label htmlFor="contract-deposit">보증금</label>
                <input
                  id="contract-deposit"
                  type="number"
                  value={contractForm.deposit}
                  onChange={(e) => setContractForm((prev) => ({ ...prev, deposit: e.target.value }))}
                />

                <label htmlFor="contract-rent">월세</label>
                <input
                  id="contract-rent"
                  type="number"
                  value={contractForm.rent}
                  onChange={(e) => setContractForm((prev) => ({ ...prev, rent: e.target.value }))}
                />

                <label htmlFor="contract-status">계약 상태</label>
                <select
                  id="contract-status"
                  value={contractForm.status}
                  onChange={(e) => setContractForm((prev) => ({ ...prev, status: e.target.value }))}
                >
                  {statusList.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.value}
                    </option>
                  ))}
                </select>

                <label htmlFor="move-in-date">입주일</label>
                <input
                  id="move-in-date"
                  type="date"
                  value={contractForm.moveInDate}
                  onChange={(e) => setContractForm((prev) => ({ ...prev, moveInDate: e.target.value }))}
                />

                <label htmlFor="move-out-date">퇴실일</label>
                <input
                  id="move-out-date"
                  type="date"
                  value={contractForm.moveOutDate}
                  onChange={(e) => setContractForm((prev) => ({ ...prev, moveOutDate: e.target.value }))}
                />

                <label htmlFor="checklist-progress">체크리스트 진행률</label>
                <input
                  id="checklist-progress"
                  type="text"
                  value={contractForm.checklistProgress}
                  onChange={(e) => setContractForm((prev) => ({ ...prev, checklistProgress: e.target.value }))}
                  placeholder="예: 7/10"
                />

                <label htmlFor="contract-image">계약서 이미지 업로드</label>
                <input
                  id="contract-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setContractForm((prev) => ({
                      ...prev,
                      contractFile: e.target.files?.[0] ?? null,
                    }))
                  }
                />

                <div className="modal-actions">
                  <button type="button" className="secondary-button" onClick={closeModal}>
                    취소
                  </button>
                  <button type="button" className="primary-button" onClick={registerContract}>
                    등록
                  </button>
                </div>
              </form>
            ) : null}

            {modalMessage ? <p className="muted">{modalMessage}</p> : null}
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
