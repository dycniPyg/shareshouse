import { Account, demoAccounts } from "@/lib/accounts";
import { useSyncExternalStore } from "react";

const CUSTOM_ACCOUNTS_KEY = "sharehouse_custom_accounts";
const CURRENT_USER_KEY = "sharehouse_current_user";
const AUTH_CHANGE_EVENT = "sharehouse_auth_change";

export type CurrentUser = Pick<Account, "email" | "role" | "redirectTo">;

function canUseStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function getCustomAccountsRaw(): string {
  if (!canUseStorage()) return "[]";
  return localStorage.getItem(CUSTOM_ACCOUNTS_KEY) ?? "[]";
}

function getCurrentUserRaw(): string {
  if (!canUseStorage()) return "";
  return localStorage.getItem(CURRENT_USER_KEY) ?? "";
}

function emitAuthChange() {
  if (!canUseStorage()) return;
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function getCustomAccounts(): Account[] {
  const raw = getCustomAccountsRaw();
  try {
    const parsed = JSON.parse(raw) as Account[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomAccounts(accounts: Account[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(CUSTOM_ACCOUNTS_KEY, JSON.stringify(accounts));
  emitAuthChange();
}

export function getAllAccounts(): Account[] {
  const byEmail = new Map<string, Account>();
  for (const account of demoAccounts) {
    byEmail.set(account.email, account);
  }
  for (const account of getCustomAccounts()) {
    byEmail.set(account.email, account);
  }
  return Array.from(byEmail.values());
}

export function setCurrentUser(account: CurrentUser) {
  if (!canUseStorage()) return;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(account));
  emitAuthChange();
}

export function getCurrentUser(): CurrentUser | null {
  const raw = getCurrentUserRaw();
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CurrentUser;
  } catch {
    return null;
  }
}

export function clearCurrentUser() {
  if (!canUseStorage()) return;
  localStorage.removeItem(CURRENT_USER_KEY);
  emitAuthChange();
}

function subscribeAuthChange(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const onChange = () => callback();
  window.addEventListener("storage", onChange);
  window.addEventListener(AUTH_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(AUTH_CHANGE_EVENT, onChange);
  };
}

export function useCurrentUserStore() {
  const raw = useSyncExternalStore(subscribeAuthChange, getCurrentUserRaw, () => "");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CurrentUser;
  } catch {
    return null;
  }
}

export function useCustomAccountsStore() {
  const raw = useSyncExternalStore(subscribeAuthChange, getCustomAccountsRaw, () => "[]");
  try {
    const parsed = JSON.parse(raw) as Account[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
