type Props = { label: string; pressed?: boolean; onPick: (label: string) => void }

export function WorryChip({ label, pressed = false, onPick }: Props) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => onPick(label)}
      className="rounded-full border border-dashed border-line-2 bg-transparent px-3.5 py-2 text-sm text-ink-2 transition duration-150 ease-out-strong hover:border-solid hover:border-accent hover:text-ink active:scale-95 aria-pressed:border-solid aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {label}
    </button>
  )
}

export function WorryChips({ labels, current, onPick }: { labels: string[]; current: string; onPick: (l: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {labels.map((l) => (
        <WorryChip key={l} label={l} pressed={l === current} onPick={onPick} />
      ))}
    </div>
  )
}
