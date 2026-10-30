import type { PointerEvent } from "react"
import { ArrowUpRight } from "lucide-react"
import type { Site } from "@/data/sites"

const hue = (s: string) => {
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 360
  return h
}
const slug = (n: string) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
const host = (u: string) => new URL(u).hostname.replace(/^www\./, "")

/**
 * 마우스를 따라다니는 은은한 빛(spotlight). 21st.dev의 Spotlight Card(Hossain Jahed)에서
 * 효과의 아이디어를 얻었다. 원본 소스는 공개되지 않아 보지 못했고, 코드는 직접 작성했다.
 * 위치는 CSS 변수로만 갱신해서 React 리렌더 없이 가볍게 동작한다(마우스 환경에서만 보인다).
 */
const spotlight = (e: PointerEvent<HTMLElement>) => {
  if (e.pointerType !== "mouse") return
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`)
}

type Props = { site: Site; step?: number; why?: string[] }

export function SiteCard({ site, step, why }: Props) {
  const h = hue(site.name)
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={spotlight}
      className="card-reveal group relative flex flex-col overflow-hidden rounded-[18px] border border-line bg-surface transition duration-300 ease-out-strong hover:-translate-y-1 hover:border-line-2 hover:shadow-card active:scale-[.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent) 13%, transparent), transparent 70%)",
        }}
      />
      <div className="relative aspect-[3/2] overflow-hidden border-b border-line bg-chip">
        {step ? (
          <span
            aria-label={`${step}번째`}
            className="absolute left-3 top-3 z-10 grid size-7 place-items-center rounded-full bg-accent text-sm font-extrabold text-on-accent shadow-md"
          >
            {step}
          </span>
        ) : null}
        <div
          aria-hidden
          className="absolute inset-0 grid place-items-center text-5xl font-extrabold text-white/90"
          style={{ background: `linear-gradient(135deg,hsl(${h} 50% 42%),hsl(${(h + 40) % 360} 55% 32%))` }}
        >
          {site.name[0]}
        </div>
        <img
          src={`/thumbs/${slug(site.name)}.jpg`}
          alt={`${site.name} 첫 화면`}
          loading="lazy"
          decoding="async"
          onError={(e) => e.currentTarget.remove()}
          className="relative size-full object-cover object-top transition-transform duration-[350ms] ease-out-strong group-hover:scale-[1.035]"
        />
        <span
          aria-hidden
          className="absolute right-3 top-3 grid size-[34px] -translate-x-1 translate-y-1 place-items-center rounded-full bg-surface text-ink opacity-0 shadow-md transition duration-200 ease-out-strong group-hover:translate-0 group-hover:opacity-100 group-focus-visible:translate-0 group-focus-visible:opacity-100 pointer-coarse:translate-0 pointer-coarse:opacity-100"
        >
          <ArrowUpRight size={16} strokeWidth={1.8} />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-[18px] pb-[18px] pt-4">
        <div className="text-[17px] font-bold leading-snug tracking-tight">
          {site.name} <span className="text-[13px] font-normal tracking-normal text-muted">{site.ko}</span>
        </div>
        <div className="text-xs text-muted">{host(site.url)}</div>
        <p className="mt-1 text-sm text-ink-2">{site.text}</p>
        {why?.length ? <div className="text-xs font-semibold text-accent">추천 이유 · {why.join(" · ")}</div> : null}
        <div className="mt-auto flex gap-2 pt-3.5 text-[13px] text-ink-2">
          <em className="mt-0.5 h-fit flex-none rounded-md bg-accent-soft px-[7px] py-0.5 text-[11px] font-bold not-italic text-accent">
            이럴 때
          </em>
          <span>{site.when}</span>
        </div>
      </div>
    </a>
  )
}
