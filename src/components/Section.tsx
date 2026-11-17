import type { ReactNode } from "react"
import FadeContent from "@/components/ui/fade-content"

type Props = {
  id: string
  num: string
  title: string
  count?: number
  desc?: string
  tip?: string
  children: ReactNode
}

export function Section({ id, num, title, count, desc, tip, children }: Props) {
  return (
    <section id={id} className="pt-14">
      <FadeContent effect="focus" duration={0.8} threshold={0.05}>
        <div className="mb-1.5 flex items-baseline gap-3.5">
          <span className="text-sm font-bold tabular-nums text-accent">{num}</span>
          <h2 className="m-0 text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.03em]">{title}</h2>
          {count != null ? <span className="ml-auto text-[13px] text-muted">{count}곳</span> : null}
        </div>
        {desc ? <p className="mb-[22px] max-w-[680px] text-[15px] text-ink-2">{desc}</p> : null}
        {tip ? <p className="mb-[22px] max-w-[760px] rounded-[14px] bg-accent-soft px-[18px] py-3.5 text-[15px]">{tip}</p> : null}
      </FadeContent>
      {children}
    </section>
  )
}

export function Grid({ children }: { children: ReactNode }) {
  // FadeContent의 래퍼가 그대로 그리드가 된다. 카드가 래퍼의 직계 자식이라 subgrid 정렬이 유지되고, 카드가 차례로 나타난다.
  return (
    <FadeContent
      stagger={0.06}
      duration={0.7}
      threshold={0.05}
      className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-x-5 gap-y-0 [&>article]:mb-5"
    >
      {children}
    </FadeContent>
  )
}
