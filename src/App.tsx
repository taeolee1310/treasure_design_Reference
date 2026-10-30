import { useMemo, useState } from "react"
import { Hero, wrap } from "@/components/Hero"
import { Toolbar } from "@/components/Toolbar"
import { Browse, SearchResults } from "@/components/Results"
import { runQuery } from "@/lib/engine"

const scrollToToolbar = () => {
  const el = document.getElementById("toolbar")
  if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" })
}

export default function App() {
  const [query, setQuery] = useState("")
  const [active, setActive] = useState("all")
  const q = query.trim()
  const result = useMemo(() => (q ? runQuery(q) : null), [q])

  const pickWorry = (label: string) => {
    setQuery(label)
    scrollToToolbar()
  }
  const goGuide = (id: string) => {
    setQuery("")
    setActive("all")
    requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })))
  }
  const pickCategory = (id: string) => {
    setActive(id)
    scrollToToolbar()
  }

  return (
    <>
      <Hero current={q} query={query} onQuery={setQuery} onSubmit={scrollToToolbar} onPickWorry={pickWorry} onGuide={goGuide} />
      <Toolbar active={active} onActive={pickCategory} />
      <main className={wrap}>{result ? <SearchResults result={result} query={q} onPick={pickWorry} /> : <Browse active={active} />}</main>
      <footer className="py-[72px] text-[13px] text-muted">
        <div className={wrap}>
          <div className="border-t border-line pt-6">
            썸네일은 2026년 10월 기준 각 사이트의 첫 화면 스크린샷입니다. 아이콘·폰트·목업을 상업적으로 쓸 때는 각 사이트의 라이선스를 꼭 확인하세요.
          </div>
        </div>
      </footer>
    </>
  )
}
