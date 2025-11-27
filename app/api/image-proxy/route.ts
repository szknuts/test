/**
 * 画像プロキシAPIエンドポイント
 * Google Driveなどの外部画像をサーバー経由で配信してCORS制約を回避
 */
import type { NextRequest } from "next/server";

const ALLOWED_HOSTS = new Set([
  "drive.google.com",
  "drive.usercontent.google.com",
  "lh3.googleusercontent.com",
]);

export async function GET(req: NextRequest) {
  const encodedUrl = req.nextUrl.searchParams.get("url");
  if (!encodedUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(encodedUrl);
  } catch {
    return new Response("Invalid url", { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(targetUrl.hostname)) {
    return new Response("Host not allowed", { status: 400 });
  }

  const upstream = await fetch(targetUrl.toString());

  if (!upstream.ok) {
    return new Response("Upstream fetch failed", { status: upstream.status });
  }

  const headers = new Headers(upstream.headers);
  headers.delete("cross-origin-resource-policy");
  headers.set("Cache-Control", "public, max-age=86400");

  return new Response(upstream.body, {
    status: 200,
    headers,
  });
}
