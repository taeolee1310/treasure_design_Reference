import { CATEGORIES, type Site } from "@/data/sites"
import { createEngine, PRESETS } from "@/lib/search"

export type Preset = { label: string; keys: string; picks: string[]; tip: string }
export type QueryResult = {
  concepts: { id: string; label: string }[]
  stuckOnly: boolean
  preset: Preset | null
  alts: Preset[]
  results: { name: string; score: number; why: string[] }[]
  suggest: Preset[]
}

export const ALL = CATEGORIES.flatMap((cat) => cat.items.map((site) => ({ site, cat })))
export const byName = Object.fromEntries(ALL.map((o) => [o.site.name, o.site])) as Record<string, Site>
export const presets = PRESETS as Preset[]

const engine = createEngine(
  ALL.map(({ site, cat }) => ({ name: site.name, ko: site.ko, text: site.text, when: site.when, cat: cat.title })),
)
export const runQuery = (q: string): QueryResult => engine.query(q)
