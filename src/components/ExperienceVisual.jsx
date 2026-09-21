import { motion } from 'framer-motion'

/*
 * One small diagram per experience slide. All DOM and CSS — no image assets —
 * so they stay crisp and re-animate every time their slide comes round.
 */

const EASE = [0.16, 1, 0.3, 1]
const ACCENT = '#7a5cff'
const MINT = '#4ad6b0'
const FLAME = '#ff7a45'

const frame =
  'relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0e] p-4'

const pop = (i = 0) => ({
  initial: { opacity: 0, y: 10, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { delay: 0.12 + i * 0.05, duration: 0.5, ease: EASE },
})

const grow = (i = 0) => ({
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { delay: 0.18 + i * 0.07, duration: 0.6, ease: EASE },
})

function Bar({ w = '100%', h = 5, color = 'rgba(255,255,255,0.16)', className = '' }) {
  return (
    <span
      className={`block rounded-full ${className}`}
      style={{ width: w, height: h, background: color }}
    />
  )
}

/* 01 — one visual language across every product page */
function Suite() {
  const pages = ['Connect', 'Chatflow', 'Hook', 'Email', 'Forms', 'Subs']
  return (
    <div className={frame}>
      <div className="grid h-full grid-cols-3 grid-rows-2 gap-2">
        {pages.map((name, i) => (
          <motion.div
            key={name}
            {...pop(i)}
            className="flex flex-col gap-1.5 rounded-md border p-2"
            style={{
              borderColor: i === 3 ? `${ACCENT}66` : 'rgba(255,255,255,0.08)',
              background: i === 3 ? `${ACCENT}14` : 'rgba(255,255,255,0.025)',
            }}
          >
            <Bar w="60%" h={4} color={i === 3 ? ACCENT : 'rgba(255,255,255,0.28)'} />
            <Bar w="100%" h={3} />
            <Bar w="78%" h={3} />
            <span
              className="mt-auto block h-2.5 w-8 rounded-sm"
              style={{ background: i === 3 ? ACCENT : 'rgba(255,255,255,0.14)' }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* 02 — flows to wireframes to shipped interface */
function Flow() {
  const stages = [
    { label: 'Flow', tone: 'rgba(255,255,255,0.2)' },
    { label: 'Wireframe', tone: 'rgba(255,255,255,0.3)' },
    { label: 'Shipped', tone: ACCENT },
  ]
  return (
    <div className={frame}>
      <div className="flex h-full items-center gap-2">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex flex-1 items-center gap-2">
            <motion.div
              {...pop(i)}
              className="flex h-full flex-1 flex-col gap-1.5 rounded-md border p-2"
              style={{
                borderColor: i === 2 ? `${ACCENT}66` : 'rgba(255,255,255,0.08)',
                background: i === 2 ? `${ACCENT}12` : 'rgba(255,255,255,0.025)',
              }}
            >
              <Bar w="70%" h={4} color={stage.tone} />
              <Bar w="100%" h={3} />
              <Bar w="55%" h={3} />
              <span className="mt-1 block flex-1 rounded-sm bg-white/[0.04]" />
              <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/35">
                {stage.label}
              </span>
            </motion.div>
            {i < stages.length - 1 ? (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
                className="shrink-0 text-[10px] text-white/30"
              >
                →
              </motion.span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

/* 03 — features, priorities and release phases */
function Roadmap() {
  const phases = [
    { name: 'Now', rows: [100, 72], color: ACCENT },
    { name: 'Next', rows: [86, 58, 40], color: MINT },
    { name: 'Later', rows: [64, 44], color: 'rgba(255,255,255,0.2)' },
  ]
  return (
    <div className={frame}>
      <div className="flex h-full gap-2">
        {phases.map((phase, pi) => (
          <div key={phase.name} className="flex flex-1 flex-col gap-1.5">
            <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/35">
              {phase.name}
            </span>
            {phase.rows.map((w, ri) => (
              <motion.span
                key={ri}
                {...grow(pi * 2 + ri)}
                className="block min-h-[14px] flex-1 origin-left rounded-sm"
                style={{
                  width: `${w}%`,
                  background: phase.color,
                  opacity: 0.85 - ri * 0.18,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* 04 — pages assembled from proven sections */
function Library() {
  return (
    <div className={frame}>
      <div className="flex h-full items-stretch gap-3">
        <div className="flex w-[38%] flex-col gap-1.5">
          <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/35">
            Library
          </span>
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              {...pop(i)}
              className="block flex-1 rounded border border-dashed"
              style={{
                borderColor: i === 1 ? `${MINT}66` : 'rgba(255,255,255,0.14)',
                background: i === 1 ? `${MINT}14` : 'rgba(255,255,255,0.02)',
              }}
            />
          ))}
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.34, duration: 0.4 }}
          className="self-center text-[10px] text-white/30"
        >
          →
        </motion.span>

        <motion.div
          {...pop(4)}
          className="flex flex-1 flex-col gap-1.5 rounded-md border border-white/10 bg-white/[0.03] p-2"
        >
          <Bar w="55%" h={4} color="rgba(255,255,255,0.3)" />
          <span className="block h-6 rounded-sm" style={{ background: `${MINT}26` }} />
          <span className="block h-4 rounded-sm bg-white/8" />
          <span className="block flex-1 rounded-sm bg-white/[0.05]" />
        </motion.div>
      </div>
    </div>
  )
}

/* 05 — Figma on the left, the real thing on the right */
function Code() {
  const lines = [
    { indent: 0, w: '62%', accent: true },
    { indent: 1, w: '80%' },
    { indent: 1, w: '54%', accent: true },
    { indent: 2, w: '70%' },
    { indent: 1, w: '44%' },
    { indent: 0, w: '36%', accent: true },
  ]
  return (
    <div className={frame}>
      <div className="flex h-full gap-2.5">
        <motion.div
          {...pop(0)}
          className="flex w-1/2 flex-col gap-1.5 rounded-md border border-white/10 bg-white/[0.03] p-2"
        >
          <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/35">
            Figma
          </span>
          <Bar w="70%" h={5} color="rgba(255,255,255,0.28)" />
          <span className="block h-5 rounded-sm" style={{ background: `${ACCENT}33` }} />
          <Bar w="90%" h={3} />
          <span className="mt-auto block h-3 w-10 rounded-full" style={{ background: ACCENT }} />
        </motion.div>

        <motion.div
          {...pop(1)}
          className="flex w-1/2 flex-col gap-[5px] rounded-md border border-white/10 bg-black/40 p-2"
        >
          <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/35">
            React
          </span>
          {lines.map((line, i) => (
            <motion.span
              key={i}
              {...grow(i)}
              className="block origin-left rounded-full"
              style={{
                width: line.w,
                height: 3,
                marginLeft: line.indent * 8,
                background: line.accent ? `${MINT}bb` : 'rgba(255,255,255,0.18)',
              }}
            />
          ))}
          <span className="flex-1" />
        </motion.div>
      </div>
    </div>
  )
}

/* 06 — reviews with product, marketing and development */
function Review() {
  const pins = [
    { top: '22%', left: '18%', color: ACCENT },
    { top: '52%', left: '62%', color: FLAME },
    { top: '72%', left: '32%', color: MINT },
  ]
  return (
    <div className={frame}>
      <div className="relative flex h-full flex-col gap-2 rounded-md border border-white/10 bg-white/[0.02] p-2.5">
        <Bar w="48%" h={5} color="rgba(255,255,255,0.28)" />
        <Bar w="86%" h={3} />
        <span className="block flex-1 rounded-sm bg-white/[0.05]" />
        <Bar w="66%" h={3} />

        {pins.map((pin, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.13, duration: 0.45, ease: EASE }}
            className="absolute flex h-4 w-4 items-center justify-center rounded-full rounded-bl-none text-[7px] font-medium text-white"
            style={{ top: pin.top, left: pin.left, background: pin.color }}
          >
            {i + 1}
          </motion.span>
        ))}

        <div className="mt-auto flex items-center gap-1.5">
          {['P', 'M', 'D'].map((who, i) => (
            <motion.span
              key={who}
              {...pop(i + 3)}
              className="flex h-4 w-4 items-center justify-center rounded-full border border-white/15 bg-white/10 font-mono text-[7px] text-white/70"
            >
              {who}
            </motion.span>
          ))}
          <span className="ml-1 font-mono text-[7px] uppercase tracking-[0.14em] text-white/35">
            3 comments resolved
          </span>
        </div>
      </div>
    </div>
  )
}

const VISUALS = {
  suite: Suite,
  flow: Flow,
  roadmap: Roadmap,
  library: Library,
  code: Code,
  review: Review,
}

export default function ExperienceVisual({ variant }) {
  const Component = VISUALS[variant] ?? Suite
  return <Component />
}
