// 비밀번호 문 테스트. 테스트용 값만 쓰고, 진짜 비밀번호는 코드 어디에도 두지 않는다.
process.env.SITE_PASSWORD = "246810"
const { default: gate } = await import("../middleware.ts")

let pass = 0
let fail = 0
const check = (name, ok, extra = "") => {
  if (ok) pass++
  else {
    fail++
    console.log("FAIL", name, extra)
  }
}
const req = (path, init) => new Request("https://example.test" + path, init)

// 1) 로그인 전에는 어떤 경로도 로그인 화면(401)만 나간다
for (const p of ["/", "/assets/index.js", "/thumbs/mobbin.jpg", "/?q=1"]) {
  const r = await gate(req(p))
  const t = await r.text()
  check("잠김 " + p, r.status === 401 && t.includes("PASSWORD") && !t.includes("246810"), r.status)
  check("캐시 금지 " + p, r.headers.get("cache-control") === "no-store")
}

// 2) 틀린 번호
let t0 = Date.now()
let r = await gate(req("/__login", { method: "POST", body: JSON.stringify({ code: "000000" }) }))
check("틀린 번호 401", r.status === 401 && !r.headers.get("set-cookie"))
check("틀린 번호는 늦게 거절", Date.now() - t0 >= 850, Date.now() - t0)
for (const bad of ["", "24681", "2468100", "abcdef", "24 681", null]) {
  r = await gate(req("/__login", { method: "POST", body: JSON.stringify({ code: bad }) }))
  check("형식 오류 거절 " + JSON.stringify(bad), r.status === 401)
}
r = await gate(req("/__login", { method: "POST", body: "not json" }))
check("JSON 아님 거절", r.status === 401)

// 3) 맞는 번호 → 쿠키
r = await gate(req("/__login", { method: "POST", body: JSON.stringify({ code: "246810" }) }))
const setCookie = r.headers.get("set-cookie") ?? ""
check("맞는 번호 200", r.status === 200)
check("쿠키 속성", /HttpOnly/.test(setCookie) && /Secure/.test(setCookie) && /SameSite=Lax/.test(setCookie) && /Max-Age=2592000/.test(setCookie))
check("쿠키에 비밀번호가 없음", !setCookie.includes("246810"))
const cookie = setCookie.split(";")[0]

// 4) 쿠키가 있으면 통과, 틀리면 막힘
r = await gate(req("/", { headers: { cookie } }))
check("쿠키로 통과", r.status === 200 && r.headers.get("x-middleware-next") === "1", r.status)
r = await gate(req("/", { headers: { cookie: "ut_auth=" + "0".repeat(64) } }))
check("가짜 쿠키 막힘", r.status === 401)
r = await gate(req("/", { headers: { cookie: "other=1; " + cookie } }))
check("다른 쿠키와 같이 와도 통과", r.headers.get("x-middleware-next") === "1")

// 5) 비밀번호가 바뀌면 이전 쿠키는 무효
process.env.SITE_PASSWORD = "135790"
r = await gate(req("/", { headers: { cookie } }))
check("비밀번호 변경 시 기존 쿠키 무효", r.status === 401)

// 6) 환경 변수가 없으면 열리지 않는다
delete process.env.SITE_PASSWORD
r = await gate(req("/", { headers: { cookie } }))
check("환경 변수 없으면 잠김(503)", r.status === 503)

console.log(`pass ${pass} / fail ${fail}`)
process.exit(fail ? 1 : 0)
