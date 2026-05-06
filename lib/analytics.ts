"use client";

export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

type AnalyticsEvent = {
  event: string;
  page: string;
  ts: number;
  session_id: string;
} & AnalyticsPayload;

const ENDPOINT = "/api/analytics";
const QUEUE_KEY = "peaceleague.analytics.queue.v1";
const SESSION_KEY = "peaceleague.analytics.session.v1";
const MAX_QUEUE_SIZE = 200;

let initialized = false;
let flushing = false;
let retryTimer: number | null = null;

function getSessionId() {
  if (typeof window === "undefined") return "server";

  const existing = window.sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const sessionId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  window.sessionStorage.setItem(SESSION_KEY, sessionId);
  return sessionId;
}

function readQueue(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(QUEUE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AnalyticsEvent[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: AnalyticsEvent[]) {
  if (typeof window === "undefined") return;

  const trimmed = queue.slice(-MAX_QUEUE_SIZE);
  window.localStorage.setItem(QUEUE_KEY, JSON.stringify(trimmed));
}

function enqueue(event: AnalyticsEvent) {
  const queue = readQueue();
  queue.push(event);
  writeQueue(queue);
}

function scheduleRetry() {
  if (retryTimer || typeof window === "undefined") return;

  retryTimer = window.setTimeout(() => {
    retryTimer = null;
    void flushQueue();
  }, 4000);
}

async function flushQueue() {
  if (typeof window === "undefined") return;
  if (flushing) return;

  const queue = readQueue();
  if (!queue.length) return;

  flushing = true;

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: queue.slice(0, 100) }),
      keepalive: true,
    });

    if (!response.ok) throw new Error(`Analytics POST failed: ${response.status}`);

    const remaining = readQueue().slice(queue.slice(0, 100).length);
    writeQueue(remaining);

    if (remaining.length) {
      scheduleRetry();
    }
  } catch {
    scheduleRetry();
  } finally {
    flushing = false;
  }
}

function flushWithBeacon() {
  if (typeof window === "undefined") return;

  const queue = readQueue();
  if (!queue.length || typeof navigator.sendBeacon !== "function") return;

  const batch = queue.slice(0, 100);
  const blob = new Blob([JSON.stringify({ events: batch })], {
    type: "application/json",
  });

  const accepted = navigator.sendBeacon(ENDPOINT, blob);
  if (accepted) {
    const remaining = queue.slice(batch.length);
    writeQueue(remaining);
  }
}

function initAnalyticsTransport() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  window.addEventListener("online", () => {
    void flushQueue();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      flushWithBeacon();
    }
  });

  window.addEventListener("pagehide", flushWithBeacon);

  void flushQueue();
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  initAnalyticsTransport();

  const data: AnalyticsEvent = {
    event,
    page: window.location.pathname,
    ts: Date.now(),
    session_id: getSessionId(),
    ...payload,
  };

  try {
    (window as typeof window & { dataLayer?: unknown[] }).dataLayer?.push(data);
    window.dispatchEvent(new CustomEvent("peaceleague:analytics", { detail: data }));

    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.info("[analytics]", data);
    }

    enqueue(data);
    void flushQueue();
  } catch {
    // no-op
  }
}
