import { NextRequest } from "next/server";

const GITHUB_OAUTH_TOKEN_URL = "https://github.com/login/oauth/access_token";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  if (!code) {
    const err = { error: "missing_code" };
    return new Response(renderPostMessage("authorization:github:error", err), {
      headers: { "Content-Type": "text/html" },
    });
  }

  try {
    const clientId = process.env.GITHUB_CLIENT_ID || "";
    const clientSecret = process.env.GITHUB_CLIENT_SECRET || "";
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/decap/oauth/callback`;

    const res = await fetch(GITHUB_OAUTH_TOKEN_URL, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        state: state || "",
      }),
    });
    const data = await res.json();

    if (!res.ok || data.error || !data.access_token) {
      const err = { error: data.error || "oauth_error", details: data };
      return new Response(renderPostMessage("authorization:github:error", err), {
        headers: { "Content-Type": "text/html" },
      });
    }

    const token = data.access_token as string;
    return new Response(renderPostMessage("authorization:github:success", { token }), {
      headers: { "Content-Type": "text/html" },
    });
  } catch (e) {
    return new Response(renderPostMessage("authorization:github:error", { error: "exception", details: String(e) }), {
      headers: { "Content-Type": "text/html" },
    });
  }
}

function renderPostMessage(event: string, payload: object) {
  return `<!DOCTYPE html>
  <html>
    <head><meta charset=\"utf-8\" /></head>
    <body>
      <script>
        (function() {
          function send() {
            var payload = ${JSON.stringify(payload)};
            var msg = { type: '${event}', ...payload };
            window.opener && window.opener.postMessage(msg, '*');
            window.parent && window.parent.postMessage(msg, '*');
            window.close();
          }
          try { send(); } catch (e) { console.error(e); }
        })();
      </script>
    </body>
  </html>`;
}


