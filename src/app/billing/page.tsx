"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import {
  autoPayItems,
  contracts,
  invoices,
  residentBillingAccounts,
  type ResidentBillingAccount,
} from "@/lib/mock-data";

const won = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
});

type AccountForm = {
  room: string;
  resident: string;
  bank: string;
  accountNumber: string;
  accountHolder: string;
  autoPay: "활성" | "비활성";
  memo: string;
};

const emptyForm: AccountForm = {
  room: "",
  resident: "",
  bank: "신한은행",
  accountNumber: "",
  accountHolder: "",
  autoPay: "활성",
  memo: "월세 전용 수납계좌",
};

function maskAccount(value: string) {
  const digits = value.replace(/[^0-9]/g, "");
  if (digits.length < 7) return value;
  const head = digits.slice(0, 3);
  const tail = digits.slice(-4);
  return `${head}-***-${tail}`;
}

function nowStamp() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const h = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d} ${h}:${mm}`;
}

export default function BillingPage() {
  const [accounts, setAccounts] = useState<ResidentBillingAccount[]>(residentBillingAccounts);
  const [form, setForm] = useState<AccountForm>(emptyForm);
  const [savedMessage, setSavedMessage] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const roomResidentMap = useMemo(() => {
    const map = new Map<string, string>();
    contracts.forEach((item) => map.set(item.room, item.resident));
    accounts.forEach((item) => map.set(item.room, item.resident));
    return map;
  }, [accounts]);

  const roomOptions = useMemo(() => Array.from(roomResidentMap.keys()).sort(), [roomResidentMap]);

  const openModal = () => {
    setSavedMessage("");
    setModalMessage("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm(emptyForm);
  };

  const onRoomChange = (room: string) => {
    const resident = roomResidentMap.get(room) ?? "";
    const existing = accounts.find((item) => item.room === room);
    setForm((prev) => ({
      ...prev,
      room,
      resident,
      bank: existing?.bank ?? prev.bank,
      accountHolder: existing?.accountHolder ?? resident,
      autoPay: existing?.autoPay ?? prev.autoPay,
      accountNumber: "",
    }));
  };

  const onSaveAccount = () => {
    if (!form.room.trim() || !form.resident.trim() || !form.bank.trim() || !form.accountNumber.trim() || !form.accountHolder.trim()) {
      setModalMessage("호실 선택 후 계좌번호/은행/예금주를 입력하세요.");
      return;
    }

    const next: ResidentBillingAccount = {
      resident: form.resident.trim(),
      room: form.room.trim(),
      bank: form.bank.trim(),
      accountNumberMasked: maskAccount(form.accountNumber),
      accountHolder: form.accountHolder.trim(),
      autoPay: form.autoPay,
      verifiedAt: nowStamp(),
      status: "정상",
    };

    setIsSaving(true);
    setModalMessage("");
    setTimeout(() => {
      setAccounts((prev) => {
        return [next, ...prev];
      });

      setSavedMessage(`${next.room} ${next.resident} 계좌가 등록되었습니다.`);
      setIsSaving(false);
      closeModal();
    }, 700);
  };

  return (
    <AppShell
      title="월세/정산"
      description="청구서 생성, 납부 상태 추적, 미납 리마인드, 계좌/자동납부 설정을 관리합니다."
    >
      <section className="card">
        <h3>미납 리마인드 규칙</h3>
        <p>D-3, D+1, D+7 자동 알림 / 연체 건 감사로그 기록</p>
      </section>

      <section className="card">
        <h3>입주민별 수납 계좌 현황</h3>
        <table>
          <thead>
            <tr>
              <th>입주민</th>
              <th>호실</th>
              <th>은행명</th>
              <th>계좌번호(마스킹)</th>
              <th>예금주</th>
              <th>자동납부</th>
              <th>최종 확인일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={`${account.room}-${account.resident}-${account.verifiedAt}`}>
                <td>{account.resident}</td>
                <td>{account.room}</td>
                <td>{account.bank}</td>
                <td>{account.accountNumberMasked}</td>
                <td>{account.accountHolder}</td>
                <td>{account.autoPay}</td>
                <td>{account.verifiedAt}</td>
                <td>{account.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {savedMessage ? <p className="muted">{savedMessage}</p> : null}
        <div className="section-actions">
          <button type="button" className="secondary-button" onClick={openModal}>
            계좌 등록
          </button>
        </div>
      </section>

      <section className="card">
        <h3>자동 납부 설정 현황</h3>
        <table>
          <thead>
            <tr>
              <th>입주민</th>
              <th>호실</th>
              <th>방식</th>
              <th>은행</th>
              <th>계좌</th>
              <th>다음 결제일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {autoPayItems.map((item) => (
              <tr key={`${item.room}-${item.resident}`}>
                <td>{item.resident}</td>
                <td>{item.room}</td>
                <td>{item.method}</td>
                <td>{item.bank}</td>
                <td>{item.accountMasked}</td>
                <td>{item.nextPaymentDate}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h3>청구서 목록</h3>
        <table>
          <thead>
            <tr>
              <th>청구서</th>
              <th>입주민</th>
              <th>월</th>
              <th>금액</th>
              <th>상태</th>
              <th>납부기한</th>
              <th>은행명</th>
              <th>계좌번호</th>
              <th>예금주</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.resident}</td>
                <td>{invoice.month}</td>
                <td>{won.format(invoice.amount)}</td>
                <td>{invoice.status}</td>
                <td>{invoice.dueDate}</td>
                <td>{invoice.bank}</td>
                <td>{invoice.accountNumber}</td>
                <td>{invoice.accountHolder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {isModalOpen ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="수납 계좌 등록">
          <div className="modal-card">
            <div className="section-head modal-title">
              <h3>수납 계좌 등록</h3>
              <div className="window-actions">
                <button
                  type="button"
                  className="icon-button"
                  aria-label="닫기"
                  onClick={closeModal}
                >
                  X
                </button>
              </div>
            </div>

            <form className="inline-form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="room">호실 선택</label>
              <select
                id="room"
                name="room"
                value={form.room}
                onChange={(e) => onRoomChange(e.target.value)}
              >
                <option value="">호실을 선택하세요</option>
                {roomOptions.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>

              <label htmlFor="resident">입주민</label>
              <input
                id="resident"
                name="resident"
                type="text"
                value={form.resident}
                readOnly
                placeholder="호실 선택 시 자동 입력"
              />

              <label htmlFor="bank">은행명</label>
              <input
                id="bank"
                name="bank"
                type="text"
                value={form.bank}
                onChange={(e) => setForm((prev) => ({ ...prev, bank: e.target.value }))}
                placeholder="은행명 입력"
              />

              <label htmlFor="account-number">계좌번호</label>
              <input
                id="account-number"
                name="account-number"
                type="text"
                value={form.accountNumber}
                onChange={(e) => setForm((prev) => ({ ...prev, accountNumber: e.target.value }))}
                placeholder="계좌번호 입력"
              />

              <label htmlFor="holder">예금주</label>
              <input
                id="holder"
                name="holder"
                type="text"
                value={form.accountHolder}
                onChange={(e) => setForm((prev) => ({ ...prev, accountHolder: e.target.value }))}
                placeholder="예금주 입력"
              />

              <label>자동납부 활성화</label>
              <div className="radio-row">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="autopay"
                    value="활성"
                    checked={form.autoPay === "활성"}
                    onChange={() => setForm((prev) => ({ ...prev, autoPay: "활성" }))}
                  />
                  활성
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="autopay"
                    value="비활성"
                    checked={form.autoPay === "비활성"}
                    onChange={() => setForm((prev) => ({ ...prev, autoPay: "비활성" }))}
                  />
                  비활성
                </label>
              </div>

              <label htmlFor="memo">정산 메모</label>
              <input
                id="memo"
                name="memo"
                type="text"
                value={form.memo}
                onChange={(e) => setForm((prev) => ({ ...prev, memo: e.target.value }))}
                placeholder="메모"
              />

              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={closeModal}>
                  취소
                </button>
                <button type="button" className="primary-button" onClick={onSaveAccount} disabled={isSaving}>
                  등록
                </button>
              </div>
              {modalMessage ? <p className="muted">{modalMessage}</p> : null}
            </form>
            {isSaving ? (
              <div className="modal-loading" aria-live="polite">
                <div className="spinner" />
                <p>등록 중...</p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
