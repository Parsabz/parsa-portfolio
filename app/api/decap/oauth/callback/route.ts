import { NextRequest } from "next/server";

const GITHUB_OAUTH_TOKEN_URL = "https://github.com/login/oauth/access_token";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  if (!code) {
    return new Response(renderLegacyPostMessage("authorization:github:error", "missing_code"), {
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
      const reason = (data && (data.error_description || data.error)) || "oauth_error";
      return new Response(renderLegacyPostMessage("authorization:github:error", String(reason)), {
        headers: { "Content-Type": "text/html" },
      });
    }

    const token = data.access_token as string;
    return new Response(renderLegacyPostMessage("authorization:github:success", token), {
      headers: { "Content-Type": "text/html" },
    });
  } catch (e) {
    return new Response(renderLegacyPostMessage("authorization:github:error", String(e)), {
      headers: { "Content-Type": "text/html" },
    });
  }
}

function renderLegacyPostMessage(event: string, value: string) {
  // Decap CMS expects a string message in the format: `authorization:github:success:<token>`
  // or `authorization:github:error:<reason>`
  const payload = `${event}:${value}`;
  return `<!DOCTYPE html>
  <html>
    <head><meta charset=\"utf-8\" /></head>
    <body>
      <script>
        (function() {
          try {
            var msg = ${JSON.stringify(payload)};
            if (window.opener) window.opener.postMessage(msg, '*');
            if (window.parent) window.parent.postMessage(msg, '*');
          } catch (e) { console.error(e); }
          window.close();
        })();
      </script>
    </body>
  </html>`;
}





