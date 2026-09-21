import { motion } from 'framer-motion'

/*
 * Abstract, hand-built previews of each project — no screenshots, just the
 * shape of the interface. Everything is DOM + CSS so it stays crisp anywhere.
 */

const shell =
  'relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0e] p-3.5'

function Chrome({ accent }) {
  return (
    <div className="mb-3 flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      <span className="ml-2 h-1.5 w-20 rounded-full bg-white/8" />
    </div>
  )
}

function EmailPreview({ accent }) {
  const bars = [38, 62, 46, 78, 54, 88, 66]
  return (
    <div className={shell}>
      <Chrome accent={accent} />
      <div className="flex gap-3">
        <div className="flex w-1/3 flex-col gap-2">
          {[100, 74, 86, 62].map((w, i) => (
            <motion.div
              key={i}
              className="h-6 rounded-md border border-white/8 bg-white/[0.04]"
              style={{ width: `${w}%` }}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i, duration: 0.5 }}
            />
          ))}
          <div className="mt-1 h-6 rounded-md" style={{ background: `${accent}2e`, border: `1px solid ${accent}55` }} />
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          <div className="rounded-md border border-white/8 bg-white/[0.03] p-2.5">
            <div className="h-1.5 w-16 rounded-full bg-white/20" />
            <div className="mt-2 flex items-end gap-1.5">
              {bars.map((h, i) => (
                <motion.span
                  key={i}
                  className="w-full rounded-sm"
                  style={{ background: i === 5 ? accent : 'rgba(255,255,255,0.14)' }}
                  initial={{ height: 4 }}
                  whileInView={{ height: h * 0.42 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['Opens', 'Clicks'].map((k, i) => (
              <div key={k} className="rounded-md border border-white/8 bg-white/[0.03] p-2">
                <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/35">{k}</div>
                <div className="mt-1 h-1.5 w-10 rounded-full" style={{ background: i ? 'rgba(255,255,255,0.22)' : accent }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function LandingPreview({ accent }) {
  return (
    <div className={shell}>
      <Chrome accent={accent} />
      <motion.div
        className="rounded-md border border-white/8 bg-white/[0.03] p-3"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto h-1.5 w-24 rounded-full bg-white/25" />
        <div className="mx-auto mt-1.5 h-1.5 w-36 rounded-full bg-white/12" />
        <div className="mx-auto mt-2.5 h-4 w-16 rounded-full" style={{ background: accent }} />
      </motion.div>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="rounded-md border p-2"
            style={{
              borderColor: i === 1 ? `${accent}66` : 'rgba(255,255,255,0.08)',
              background: i === 1 ? `${accent}14` : 'rgba(255,255,255,0.025)',
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.09, duration: 0.55 }}
          >
            <div className="h-1.5 w-8 rounded-full bg-white/22" />
            <div className="mt-2 h-2.5 w-10 rounded-full bg-white/30" />
            <div className="mt-2 flex flex-col gap-1">
              {[0, 1, 2].map((r) => (
                <div key={r} className="h-1 w-full rounded-full bg-white/8" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SystemPreview({ accent }) {
  const swatches = ['#7a5cff', '#4ad6b0', '#ff7a45', '#f4f2ef', '#56565f']
  return (
    <div className={shell}>
      <Chrome accent={accent} />
      <div className="flex gap-1.5">
        {swatches.map((c, i) => (
          <motion.span
            key={c}
            className="h-9 flex-1 rounded-md"
            style={{ background: c, opacity: 0.85 }}
            initial={{ scaleY: 0.2, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 0.85 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {[
          { w: '62%', h: 10 },
          { w: '44%', h: 7 },
          { w: '78%', h: 4 },
          { w: '70%', h: 4 },
        ].map((row, i) => (
          <motion.div
            key={i}
            className="rounded-full bg-white/18"
            style={{ width: row.w, height: row.h }}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.07, duration: 0.5 }}
          />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-5 rounded border border-dashed border-white/12"
            style={{ background: i === 0 ? `${accent}1f` : 'transparent' }}
          />
        ))}
      </div>
    </div>
  )
}

export default function WorkVisual({ variant, accent }) {
  if (variant === '01') return <EmailPreview accent={accent} />
  if (variant === '02') return <LandingPreview accent={accent} />
  return <SystemPreview accent={accent} />
}
