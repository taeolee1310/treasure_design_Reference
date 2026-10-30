import { CATEGORIES } from "@/data/sites"
import { byName, presets, type QueryResult } from "@/lib/engine"
import { Grid, Section } from "@/components/Section"
import { SiteCard } from "@/components/SiteCard"
import { WorryChips } from "@/components/WorryChip"

const labels = presets.map((p) => p.label)

export function Browse({ active }: { active: string }) {
  return (
    <>
      {CATEGORIES.map((c, i) =>
        active !== "all" && active !== c.id ? null : (
          <Section key={c.id} id={c.id} num={String(i + 1).padStart(2, "0")} title={c.title} count={c.items.length} desc={c.desc}>
            <Grid>
              {c.items.map((s) => (
                <SiteCard key={s.name} site={s} />
              ))}
            </Grid>
          </Section>
        ),
      )}
    </>
  )
}

type Props = { result: QueryResult; query: string; onPick: (label: string) => void }

export function SearchResults({ result: r, query, onPick }: Props) {
  const nothing = !r.stuckOnly && !r.preset && !r.results.length && !r.suggest.length
  return (
    <>
      {r.concepts.length ? (
        <p className="mt-7 text-[13px] text-muted">
          이렇게 이해했어요
          {r.concepts.slice(0, 4).map((c) => (
            <b key={c.id} className="ml-1.5 inline-block rounded-full bg-chip px-2.5 py-0.5 text-xs font-semibold text-ink">
              {c.label}
            </b>
          ))}
        </p>
      ) : null}

      {r.stuckOnly ? (
        <Section id="solve" num="?" title="어떤 부분이 막막한가요?" tip="가장 가까운 고민을 골라 보세요. 어디서부터 보면 좋은지 순서대로 알려드립니다.">
          <WorryChips labels={labels} current={query} onPick={onPick} />
        </Section>
      ) : null}

      {r.preset ? (
        <Section id="solve" num="→" title="이 고민이라면, 이 순서로" count={r.preset.picks.length} tip={r.preset.tip}>
          <Grid>
            {r.preset.picks.map((n, i) => (
              <SiteCard key={n} site={byName[n]} step={i + 1} />
            ))}
          </Grid>
          {r.alts.length ? (
            <div className="mt-5 flex flex-wrap items-center gap-2 text-[13px] text-muted">
              이런 경로도 있어요
              <WorryChips labels={r.alts.map((p) => p.label)} current={query} onPick={onPick} />
            </div>
          ) : null}
        </Section>
      ) : null}

      {r.results.length ? (
        <Section id="related" num="··" title={r.preset ? "함께 보면 좋은 사이트" : "이런 사이트가 맞을 것 같아요"} count={r.results.length}>
          <Grid>
            {r.results.map((x) => (
              <SiteCard key={x.name} site={byName[x.name]} why={x.why} />
            ))}
          </Grid>
        </Section>
      ) : null}

      {!r.stuckOnly && !r.preset && !r.results.length && r.suggest.length ? (
        <Section id="solve" num="?" title="혹시 이런 고민인가요?" tip="적어주신 말과 딱 맞는 곳은 찾지 못했어요. 가까워 보이는 고민을 골라 보세요.">
          <WorryChips labels={r.suggest.map((p) => p.label)} current={query} onPick={onPick} />
        </Section>
      ) : null}

      {nothing ? <p className="py-20 text-center text-muted">딱 맞는 곳을 찾지 못했어요. 다른 말로 적어 보거나, 위의 고민 중에서 골라 보세요.</p> : null}
    </>
  )
}
