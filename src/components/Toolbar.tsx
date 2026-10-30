import { CATEGORIES } from "@/data/sites"
import { ALL } from "@/lib/engine"
import { wrap } from "@/components/Hero"

type Props = { active: string; onActive: (id: string) => void }

export function Toolbar({ active, onActive }: Props) {
  const chips = [{ id: "all", short: "전체", n: ALL.length }, ...CATEGORIES.map((c) => ({ id: c.id, short: c.short, n: c.items.length }))]
  return (
    <div id="toolbar" className="sticky top-0 z-20 mt-8 border-b border-line bg-bg/85 backdrop-blur-[14px]">
      <div className={`${wrap} py-3`}>
        <div className="-mx-0.5 flex min-w-0 gap-2 overflow-x-auto p-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={c.id === active}
              onClick={() => onActive(c.id)}
              className="inline-flex flex-none items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink-2 transition duration-150 ease-out-strong hover:border-line-2 hover:text-ink active:scale-95 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {c.short}
              <small className="text-xs tabular-nums opacity-60">{c.n}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
