import { NextRequest } from "next/server";

const GITHUB_OAUTH_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";

export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/decap/oauth/callback`;
  const scope = "repo,user";
  const state = Math.random().toString(36).slice(2);

  const url = new URL(GITHUB_OAUTH_AUTHORIZE_URL);
  url.searchParams.set("client_id", clientId || "");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scope);
  url.searchParams.set("state", state);

  // debug log
  try {
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/debug/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level: "info", message: "oauth_authorize_redirect", meta: { redirect: url.toString() } }),
      cache: "no-store",
    });
  } catch {}

  // open in same window for easier debugging; Decap opens in popup, but popup will redirect here anyway
  return Response.redirect(url.toString(), 302);
}





