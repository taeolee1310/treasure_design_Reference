import { useState, type ReactNode } from "react"
import { CATEGORIES } from "@/data/sites"
import { presets, ALL } from "@/lib/engine"
import { WorryChips } from "@/components/WorryChip"
import { TextRotate } from "@/components/ui/text-rotate"

const WORRY_LABELS = presets.map((p) => p.label)

export const wrap = "mx-auto w-full max-w-[1200px] px-[clamp(16px,4vw,32px)]"

const GUIDE: [string, string, string][] = [
  ["화면 설계할 때", "1. UI·웹 레퍼런스 갤러리", "ui"],
  ["아이디어·무드 모을 때", "2. 무드보드·큐레이션", "mood"],
  ["트렌드와 안목을 키울 때", "3. 매거진 · 4. 스튜디오", "mag"],
  ["작업물을 만들고 보여줄 때", "5. 리소스·제작 도구", "res"],
  ["배움과 커리어를 이어갈 때", "6. 커뮤니티·교육·커리어", "community"],
]

function Rise({ i, children }: { i: number; children: ReactNode }) {
  return (
    <div className="animate-rise" style={{ animationDelay: `${i * 70}ms` }}>
      {children}
    </div>
  )
}

function Stat({ n, label }: { n: number | string; label: string }) {
  return (
    <div>
      <b className="block text-[26px] leading-[1.1] tracking-[-0.02em] text-ink">{n}</b>
      {label}
    </div>
  )
}

type Props = { current: string; onPickWorry: (label: string) => void; onGuide: (id: string) => void }

export function Hero({ current, onPickWorry, onGuide }: Props) {
  const [idx, setIdx] = useState(0)
  const [hold, setHold] = useState(false)
  return (
    <header className="pb-7 pt-[clamp(48px,9vw,96px)]">
      <div className={wrap}>
        <Rise i={0}>
          <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent before:size-2 before:rounded-full before:bg-accent before:content-['']">
            프로덕트 디자이너를 위한 레퍼런스 사이트 모음
          </div>
        </Rise>
        <Rise i={1}>
          <h1 className="mb-[18px] mt-3.5 text-[clamp(40px,8vw,84px)] font-extrabold leading-[1.04] tracking-[-0.045em]">
            UI/UX
            <br />
            보물창고
          </h1>
        </Rise>
        <Rise i={2}>
          <p className="max-w-[560px] text-[clamp(16px,2vw,18px)] text-ink-2">
            화면을 설계하고, 영감을 모으고, 작업을 보여주고, 배움을 이어가는 데 쓰는 사이트를 상황별로 정리했습니다.
          </p>
        </Rise>
        <Rise i={3}>
          <p className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[15px] text-muted">
            <span>혹시 이런 고민이세요?</span>
            <button
              type="button"
              aria-label={`이 고민으로 찾아보기: ${WORRY_LABELS[idx]}`}
              onClick={() => onPickWorry(WORRY_LABELS[idx])}
              onPointerEnter={() => setHold(true)}
              onPointerLeave={() => setHold(false)}
              onFocus={() => setHold(true)}
              onBlur={() => setHold(false)}
              className="rounded-full border border-line-2 bg-surface px-3.5 py-1.5 text-left text-[15px] font-semibold text-ink transition duration-150 ease-out-strong hover:border-accent active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <TextRotate texts={WORRY_LABELS} paused={hold} onChange={setIdx} rotationInterval={2800} staggerDuration={18} />
            </button>
          </p>
        </Rise>
        <Rise i={4}>
          <div className="mt-7 flex gap-7 text-sm text-muted max-sm:gap-[22px]">
            <Stat n={ALL.length} label="사이트" />
            <Stat n={CATEGORIES.length} label="카테고리" />
            <Stat n="2026.10" label="업데이트" />
          </div>
        </Rise>
        <Rise i={5}>
          <div className="mt-9">
            <h2 className="mb-1 text-[15px] font-bold tracking-tight">막막할 땐, 고민부터 골라보세요</h2>
            <p className="mb-3.5 text-[13px] text-muted">누르면 어디서 시작하면 좋은지 순서대로 보여드립니다. 검색창에 직접 적어도 됩니다.</p>
            <WorryChips labels={presets.map((p) => p.label)} current={current} onPick={onPickWorry} />
          </div>
        </Rise>
        <Rise i={6}>
          <ul className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-3 p-0">
            {GUIDE.map(([title, sub, id]) => (
              <li key={id} className="list-none">
                <button
                  type="button"
                  onClick={() => onGuide(id)}
                  className="flex h-full w-full flex-col gap-1 rounded-[14px] border border-line bg-surface px-[18px] py-4 text-left transition duration-200 ease-out-strong hover:-translate-y-0.5 hover:border-accent active:scale-[.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <b className="text-[15px] font-bold">{title}</b>
                  <span className="text-[13px] text-muted">→ {sub}</span>
                </button>
              </li>
            ))}
          </ul>
        </Rise>
      </div>
    </header>
  )
}
