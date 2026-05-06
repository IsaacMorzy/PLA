import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

type IncomingEvent = {
  event?: string;
  page?: string;
  ts?: number;
  [key: string]: unknown;
};

const LOG_DIR = path.join(process.cwd(), "var", "analytics");
const LOG_FILE = path.join(LOG_DIR, "events.ndjson");

function normalizeEvent(input: IncomingEvent): Record<string, unknown> | null {
  if (!input || typeof input !== "object") return null;
  if (!input.event || typeof input.event !== "string") return null;

  const safeEvent: Record<string, unknown> = {
    event: input.event.slice(0, 120),
    page: typeof input.page === "string" ? input.page.slice(0, 300) : "unknown",
    ts: typeof input.ts === "number" ? input.ts : Date.now(),
  };

  for (const [key, value] of Object.entries(input)) {
    if (key in safeEvent) continue;
    if (key.length > 80) continue;

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null
    ) {
      safeEvent[key] = typeof value === "string" ? value.slice(0, 500) : value;
    }
  }

  return safeEvent;
}

async function persistEvents(events: Record<string, unknown>[]) {
  if (!events.length) return;

  const payload = `${events.map((event) => JSON.stringify(event)).join("\n")}\n`;

  await fs.mkdir(LOG_DIR, { recursive: true });
  await fs.appendFile(LOG_FILE, payload, "utf8");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { events?: IncomingEvent[] } | IncomingEvent;
    const rawEvents = Array.isArray((body as { events?: IncomingEvent[] }).events)
      ? (body as { events: IncomingEvent[] }).events
      : [body as IncomingEvent];

    const events = rawEvents
      .slice(0, 100)
      .map(normalizeEvent)
      .filter((event): event is Record<string, unknown> => event !== null);

    if (!events.length) {
      return Response.json({ ok: false, error: "No valid events" }, { status: 400 });
    }

    await persistEvents(events);

    return Response.json({ ok: true, received: events.length });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to persist analytics events",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ ok: true, endpoint: "/api/analytics" });
}
