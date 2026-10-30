import { CATEGORIES } from "@/data/sites"
import { ALL, presets } from "@/lib/engine"
import { wrap } from "@/components/Hero"

const EXAMPLES = [
  "무드보드 어떻게 시작하지",
  "경쟁사 앱 온보딩이 궁금해요",
  "결제 화면 참고하고 싶어요",
  "그 핀터레스트처럼 생긴 레이아웃 이름이 뭐지",
  "스크롤 애니메이션 멋진 사이트",
  "요즘 브랜딩 트렌드",
  "폰트 고르는 안목",
  "코드 없이 포트폴리오 사이트 만들기",
  "클로드한테 디자인 스타일 알려주고 싶어",
  "디자인 시스템 처음 공부",
  "ㅁㄷㅂㄷ",
]

type Props = { active: string; onActive: (id: string) => void; query: string; onQuery: (q: string) => void }

export function Toolbar({ active, onActive, query, onQuery }: Props) {
  const chips = [{ id: "all", short: "전체", n: ALL.length }, ...CATEGORIES.map((c) => ({ id: c.id, short: c.short, n: c.items.length }))]
  return (
    <div id="toolbar" className="sticky top-0 z-20 mt-8 border-b border-line bg-bg/85 backdrop-blur-[14px]">
      <div className={`${wrap} flex flex-col gap-2.5 py-3 sm:flex-row sm:items-center sm:gap-3.5`}>
        <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto p-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={c.id === active}
              onClick={() => onActive(c.id)}
              className="inline-flex flex-none items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-[7px] text-sm font-medium text-ink-2 transition duration-150 ease-out-strong hover:border-line-2 hover:text-ink active:scale-95 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {c.short}
              <small className="text-xs tabular-nums opacity-60">{c.n}</small>
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          list="ideas"
          autoComplete="off"
          placeholder="고민을 적어보세요 (예: 무드보드 어떻게 시작하지)"
          aria-label="고민 또는 키워드 검색"
          className="min-w-[150px] rounded-full border border-line bg-surface px-4 py-[9px] text-sm text-ink transition-colors duration-150 placeholder:text-muted focus:border-accent focus:outline-none sm:w-[380px] sm:flex-none"
        />
        <datalist id="ideas">
          {[...presets.map((p) => p.label), ...EXAMPLES].map((v) => (
            <option key={v} value={v} />
          ))}
        </datalist>
      </div>
    </div>
  )
}
