/**
 * 사이트 전체에 거는 비밀번호. Vercel Routing Middleware라서 캐시보다 앞에서 실행되고,
 * 로그인 전에는 HTML·JS·이미지를 포함한 어떤 파일도 내려가지 않는다(로그인 화면만 나간다).
 *
 * - 비밀번호는 코드에 없다. Vercel 환경 변수 SITE_PASSWORD(6자리 숫자)와 비교한다.
 * - 환경 변수가 없으면 열어 주지 않는다(실수로 공개되는 것을 막으려고).
 * - 맞으면 HttpOnly 쿠키를 30일간 준다. 쿠키 값은 비밀번호로 만든 서명이라 거꾸로 알아낼 수 없다.
 * - 틀리면 0.9초 늦게 거절한다. 시도 횟수 제한은 Vercel Firewall의 Rate Limit으로 건다(README 참고).
 */
import { next } from "@vercel/functions"
import { loginPage } from "./gate/page.ts"

export const config = { matcher: ["/((?!robots\\.txt$).*)"] }

const COOKIE = "ut_auth"
const MONTH = 60 * 60 * 24 * 30
const enc = new TextEncoder()

const hex = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("")
const sha = async (s: string) => hex(await crypto.subtle.digest("SHA-256", enc.encode(s)))

const sign = async (secret: string) => {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
  return hex(await crypto.subtle.sign("HMAC", key, enc.encode("ui-ux-treasure:v1")))
}

/** 길이가 같은 두 문자열을 끝까지 비교한다(중간에 멈추지 않음). */
const same = (a: string, b: string) => {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

const readCookie = (header: string | null, name: string) => {
  for (const part of (header ?? "").split(";")) {
    const i = part.indexOf("=")
    if (i > -1 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim()
  }
  return ""
}

const html = (body: string, status: number) =>
  new Response(body, {
    status,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow, noai, noimageai" },
  })

export default async function middleware(request: Request) {
  const secret = process.env.SITE_PASSWORD
  if (!secret) return html("<!doctype html><meta charset=utf-8><title>잠겨 있음</title><p>SITE_PASSWORD 환경 변수가 설정되지 않아 잠겨 있습니다.</p>", 503)

  const token = await sign(secret)
  const url = new URL(request.url)

  if (request.method === "POST" && url.pathname === "/__login") {
    let code = ""
    try {
      const body = await request.json()
      if (typeof body?.code === "string") code = body.code.slice(0, 64)
    } catch {
      /* 본문이 없거나 JSON이 아니면 빈 값으로 처리한다 */
    }
    const good = /^\d{6}$/.test(code) && same(await sha(code), await sha(secret))
    if (!good) {
      await new Promise((r) => setTimeout(r, 900))
      return new Response(JSON.stringify({ ok: false }), { status: 401, headers: { "content-type": "application/json", "cache-control": "no-store" } })
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store",
        "set-cookie": `${COOKIE}=${token}; Path=/; Max-Age=${MONTH}; HttpOnly; Secure; SameSite=Lax`,
      },
    })
  }

  if (same(readCookie(request.headers.get("cookie"), COOKIE), token)) return next()
  return html(loginPage, 401)
}
