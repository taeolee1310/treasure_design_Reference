/**
 * Text Rotate — 목록의 문구를 돌려가며 보여주는 컴포넌트.
 *
 * 동작과 props 구성은 Daniel Petho의 Text Rotate(https://21st.dev/@danielpetho/components/text-rotate,
 * 원본 문서 fancycomponents.dev, MIT License)를 참고했다. 원본은 `motion` 라이브러리에 의존하지만
 * 이 사이트는 의존성을 늘리지 않으려고 CSS 애니메이션으로 다시 구현했다(코드는 직접 작성).
 *
 * - 새 문구는 아래에서 올라오고, 이전 문구는 위로 빠진다.
 * - splitBy: "words" | "characters" — 조각마다 staggerDuration(ms)만큼 늦게 시작한다.
 * - 가장 긴 문구 크기로 자리를 잡아서 문구가 바뀌어도 레이아웃이 흔들리지 않는다.
 * - 동작 줄이기 설정에서는 슬라이드 없이 페이드만 쓴다(index.css).
 */
import { Fragment, useEffect, useMemo, useReducer } from "react"
// 번들을 가볍게 두려고 tailwind-merge 대신 단순 결합을 쓴다.
const join = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ")

type Props = {
  texts: string[]
  /** 문구가 바뀌는 간격(ms). 애니메이션 시간(약 450ms)보다 길어야 한다. */
  rotationInterval?: number
  splitBy?: "words" | "characters"
  /** 조각마다 늦게 시작하는 시간(ms) */
  staggerDuration?: number
  paused?: boolean
  onChange?: (index: number) => void
  className?: string
}

type State = { cur: number; prev: number | null }
type Action = { type: "next"; n: number } | { type: "settled" }

const reducer = (s: State, a: Action): State =>
  a.type === "next" ? { cur: (s.cur + 1) % a.n, prev: s.cur } : { ...s, prev: null }

export function TextRotate({
  texts,
  rotationInterval = 2800,
  splitBy = "words",
  staggerDuration = 25,
  paused = false,
  onChange,
  className,
}: Props) {
  const [{ cur, prev }, dispatch] = useReducer(reducer, { cur: 0, prev: null })
  const longest = useMemo(() => texts.reduce((a, b) => (b.length > a.length ? b : a), ""), [texts])

  useEffect(() => {
    if (paused || texts.length < 2) return
    const id = window.setInterval(() => {
      if (!document.hidden) dispatch({ type: "next", n: texts.length })
    }, rotationInterval)
    return () => window.clearInterval(id)
  }, [paused, rotationInterval, texts.length])

  useEffect(() => {
    if (prev === null) return
    const id = window.setTimeout(() => dispatch({ type: "settled" }), 450 + staggerDuration * 24)
    return () => window.clearTimeout(id)
  }, [prev, staggerDuration])

  useEffect(() => {
    onChange?.(cur)
  }, [cur, onChange])

  const render = (text: string, mode: "in" | "out") => {
    let k = 0
    const words = text.split(" ")
    return words.map((word, wi) => (
      <Fragment key={wi}>
        <span className="-my-0.5 inline-block overflow-hidden py-0.5 align-bottom whitespace-nowrap">
          {(splitBy === "characters" ? Array.from(word) : [word]).map((piece, pi) => (
            <span
              key={pi}
              className={join("inline-block", mode === "in" ? "animate-text-in" : "animate-text-out")}
              style={{ animationDelay: `${k++ * staggerDuration}ms` }}
            >
              {piece}
            </span>
          ))}
        </span>
        {wi < words.length - 1 ? " " : null}
      </Fragment>
    ))
  }

  return (
    <span className={join("inline-grid text-center", className)}>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {longest}
      </span>
      {prev !== null ? (
        <span aria-hidden className="pointer-events-none col-start-1 row-start-1">
          {render(texts[prev], "out")}
        </span>
      ) : null}
      <span key={cur} className="col-start-1 row-start-1">
        {render(texts[cur], "in")}
      </span>
    </span>
  )
}
