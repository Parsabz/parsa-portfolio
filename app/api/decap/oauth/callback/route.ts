import { NextRequest } from "next/server";

const GITHUB_OAUTH_TOKEN_URL = "https://github.com/login/oauth/access_token";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  if (!code) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/debug/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: "warn", message: "oauth_callback_no_code" }),
      });
    } catch {}
    // Sometimes the popup is opened directly without a code (CMS probes).
    // Do NOT post an error back; just show a message and close quietly.
    return new Response(`<!DOCTYPE html>
    <html>
      <head><meta charset=\"utf-8\" /></head>
      <body style=\"font-family:sans-serif;padding:16px;\">
        <h3>No authorization code present</h3>
        <p>Closing this window…</p>
        <script>setTimeout(function(){ window.close(); }, 1200);</script>
      </body>
    </html>`, { headers: { "Content-Type": "text/html" } });
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
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/debug/log`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ level: "error", message: "oauth_token_exchange_failed", meta: { reason, data } }),
        });
      } catch {}
      return new Response(renderLegacyPostMessage("authorization:github:error", String(reason)), {
        headers: { "Content-Type": "text/html" },
      });
    }

    const token = data.access_token as string;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/debug/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: "info", message: "oauth_token_exchange_success" }),
      });
    } catch {}
    return new Response(renderLegacyPostMessage("authorization:github:success", token), {
      headers: { "Content-Type": "text/html" },
    });
  } catch (e) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/debug/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: "error", message: "oauth_callback_exception", meta: { error: String(e) } }),
      });
    } catch {}
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
    <body style=\"font-family: sans-serif; padding:16px;\">
      <script>
        (function() {
          try {
            var msg = ${JSON.stringify(payload)};
            // also send structured message for newer handlers
            var parts = msg.split(':');
            var obj = { type: parts.slice(0,3).join(':'), value: parts.slice(3).join(':') };
            try { if (window.opener) window.opener.postMessage(msg, '${process.env.NEXT_PUBLIC_SITE_URL || "https://parsaw.netlify.app"}'); } catch (_) {}
            try { if (window.parent) window.parent.postMessage(msg, '${process.env.NEXT_PUBLIC_SITE_URL || "https://parsaw.netlify.app"}'); } catch (_) {}
            try { if (window.opener) window.opener.postMessage(obj, '${process.env.NEXT_PUBLIC_SITE_URL || "https://parsaw.netlify.app"}'); } catch (_) {}
            try { if (window.parent) window.parent.postMessage(obj, '${process.env.NEXT_PUBLIC_SITE_URL || "https://parsaw.netlify.app"}'); } catch (_) {}
            console.log('Posted OAuth message to opener/parent:', msg);
            document.body.innerHTML = '<h3>OAuth callback posted message</h3>'+
              '<pre>'+msg.replace(/</g,'&lt;')+'</pre>'+
              '<p>This window will close automatically.</p>';
          } catch (e) { console.error(e); }
          setTimeout(function(){ window.close(); }, 5000);
        })();
      </script>
    </body>
  </html>`;
}





