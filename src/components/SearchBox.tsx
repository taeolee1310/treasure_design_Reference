import { Search } from "lucide-react"
import { presets } from "@/lib/engine"

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

type Props = { query: string; onQuery: (q: string) => void; onSubmit: () => void }

export function SearchBox({ query, onQuery, onSubmit }: Props) {
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="relative w-full max-w-[560px]"
    >
      <Search aria-hidden size={16} strokeWidth={1.8} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
      <input
        type="search"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        list="ideas"
        autoComplete="off"
        enterKeyHint="search"
        placeholder="고민을 적어보세요 (예: 무드보드 어떻게 시작하지)"
        aria-label="고민 또는 키워드 검색"
        className="w-full rounded-full border border-line-2 bg-surface py-2.5 pl-10 pr-4 text-[15px] text-ink transition-colors duration-150 placeholder:text-muted focus:border-accent focus:outline-none"
      />
      <datalist id="ideas">
        {[...presets.map((p) => p.label), ...EXAMPLES].map((v) => (
          <option key={v} value={v} />
        ))}
      </datalist>
    </form>
  )
}
