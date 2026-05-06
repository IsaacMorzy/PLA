import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const LOG_FILE = path.join(process.cwd(), "var", "analytics", "events.ndjson");
const DAY_MS = 24 * 60 * 60 * 1000;

type EventRow = { event?: string; page?: string; ts?: number };

function toNumber(value: string | null, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function dayKey(ts: number) {
  return new Date(ts).toISOString().slice(0, 10);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = Math.min(Math.max(toNumber(searchParams.get("days"), 7), 1), 30);

    const now = Date.now();
    const since = now - days * DAY_MS;

    let raw = "";
    try {
      raw = await fs.readFile(LOG_FILE, "utf8");
    } catch {
      return Response.json({ ok: true, days, total: 0, events: [], pages: [], trend: [] });
    }

    const rows = raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(-10000)
      .map((line) => {
        try {
          return JSON.parse(line) as EventRow;
        } catch {
          return null;
        }
      })
      .filter((item): item is EventRow => item !== null)
      .filter((item) => typeof item.ts === "number" && item.ts >= since);

    const eventCounts = new Map<string, number>();
    const pageCounts = new Map<string, number>();

    const trendMap = new Map<string, { date: string; total: number; donate_click: number; donation_success: number }>();

    for (let i = days - 1; i >= 0; i--) {
      const ts = now - i * DAY_MS;
      const key = dayKey(ts);
      trendMap.set(key, { date: key, total: 0, donate_click: 0, donation_success: 0 });
    }

    for (const row of rows) {
      if (row.event) eventCounts.set(row.event, (eventCounts.get(row.event) ?? 0) + 1);
      if (row.page) pageCounts.set(row.page, (pageCounts.get(row.page) ?? 0) + 1);

      if (typeof row.ts === "number") {
        const key = dayKey(row.ts);
        const bucket = trendMap.get(key);
        if (bucket) {
          bucket.total += 1;
          if (row.event === "donate_click") bucket.donate_click += 1;
          if (row.event === "donation_success") bucket.donation_success += 1;
        }
      }
    }

    const events = [...eventCounts.entries()]
      .map(([event, count]) => ({ event, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    const pages = [...pageCounts.entries()]
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    const trend = [...trendMap.values()].sort((a, b) => a.date.localeCompare(b.date));

    return Response.json({ ok: true, days, total: rows.length, events, pages, trend });
  } catch (error) {
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : "Failed to read analytics summary" },
      { status: 500 }
    );
  }
}
