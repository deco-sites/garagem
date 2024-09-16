import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {
  const origin = req.headers.get("Origin") || "*";

  // Handling preflight OPTIONS request for CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers":
          "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT, DELETE",
      },
    });
  }

  // Forward the request to Zapier Webhook
  const zapierUrl = "https://hooks.zapier.com/hooks/catch/16331030/24oinhf";

  try {
    const response = await fetch(zapierUrl, {
      method: req.method,  // Forward the same method (e.g. POST)
      headers: req.headers,  // Forward headers from the original request
      body: req.body,  // Forward the request body
    });

    // Create a new response with Zapier's response and CORS headers
    const respHeaders = new Headers(response.headers);
    respHeaders.set("Access-Control-Allow-Origin", origin);
    respHeaders.set("Access-Control-Allow-Credentials", "true");
    respHeaders.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
    );
    respHeaders.set(
      "Access-Control-Allow-Methods",
      "POST, OPTIONS, GET, PUT, DELETE",
    );

    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: respHeaders,
    });
  } catch (error) {
    return new Response('Failed to fetch from Zapier', { status: 500 });
  }
}
