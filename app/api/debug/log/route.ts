import { NextRequest } from "next/server";

// In-memory log store (ephemeral on serverless), just for debugging
const logs: { t: string; level: string; message: string; meta?: any }[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    logs.push({ t: new Date().toISOString(), level: body.level || "info", message: body.message || "", meta: body.meta });
    // cap length
    if (logs.length > 200) logs.shift();
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 400 });
  }
}

export async function GET() {
  return Response.json({ logs });
}


