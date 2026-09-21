import { DrawLine, Reveal, SplitWords } from './Reveal'

export default function SectionHeading({ index, label, title, accent, aside }) {
  return (
    <div className="flex flex-col gap-6">
      <Reveal className="flex items-center justify-between gap-6">
        {/* Section marker: the brightest of the small labels, so it reads as a divider. */}
        <span className="eyebrow flex items-center gap-3 text-[13.5px] tracking-[0.18em] text-paper">
          {index ? (
            <span className="rounded-md bg-accent/15 px-2 py-1 text-[12px] text-accent-soft">
              {index}
            </span>
          ) : null}
          {label}
        </span>
        {aside ? (
          <span className="eyebrow hidden text-[12.5px] text-muted sm:block">{aside}</span>
        ) : null}
      </Reveal>

      <DrawLine />

      <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-end md:justify-between">
        <h2 className="fluid-h2 font-display font-medium tracking-[-0.04em]">
          <SplitWords text={title} />
          {accent ? (
            <>
              {' '}
              <span className="serif-accent text-accent-soft">
                <SplitWords text={accent} delay={0.12} />
              </span>
            </>
          ) : null}
        </h2>
      </div>
    </div>
  )
}
