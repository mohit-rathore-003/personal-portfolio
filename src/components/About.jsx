import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionTemplate, useMotionValue } from 'framer-motion'
import { intro, profile, stats } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/useEnvironment'
import { Reveal, SplitWords } from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const EASE = [0.16, 1, 0.3, 1]

/** Counts from zero to `target` once the box is on screen. */
function useCountUp(target, active, reduced, duration = 1500) {
  const [value, setValue] = useState(reduced ? target : 0)

  useEffect(() => {
    if (!active || reduced) {
      if (reduced) setValue(target)
      return undefined
    }
    let raf = 0
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      setValue(Math.round((1 - Math.pow(1 - t, 3)) * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, reduced, duration])

  return value
}

/** Card with a pointer-tracked glow, used for all four tiles. */
function Box({ children, delay = 0, boxRef }) {
  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const glow = useMotionTemplate`radial-gradient(240px circle at ${mx}px ${my}px, rgba(122,92,255,0.18), transparent 70%)`

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      ref={boxRef}
      onPointerMove={onMove}
      className="group card-surface relative overflow-hidden rounded-2xl p-5 transition-colors duration-500 hover:border-white/20 md:p-6"
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ delay, duration: 0.75, ease: EASE }}
      whileHover={{ y: -5 }}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  )
}

function StatBox({ count, suffix, label, sub, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const reduced = usePrefersReducedMotion()
  const shown = useCountUp(count, inView, reduced)

  return (
    <Box delay={delay} boxRef={ref}>
      <div className="font-display text-[clamp(2.1rem,3.6vw,3.1rem)] font-medium leading-none tracking-tight tabular-nums">
        {shown}
        <span className="text-accent-soft">{suffix}</span>
      </div>

      <div className="mt-4 h-px w-full bg-white/10">
        <motion.div
          className="h-px origin-left bg-accent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ delay: delay + 0.2, duration: 1.1, ease: EASE }}
        />
      </div>

      <div className="mt-4 text-[13.5px] leading-snug text-paper">{label}</div>
      <div className="mt-1 text-[12.5px] text-faint">{sub}</div>
    </Box>
  )
}

export default function About() {
  return (
    <section id="about" className="shell scroll-mt-24 py-24 md:py-36">
      <SectionHeading
        index="01"
        label="About"
        title="Design that survives"
        accent="the handoff"
        aside={profile.timezone}
      />

      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-5 md:self-center">
          <h3 className="fluid-h3 max-w-[20ch] font-display font-medium leading-[1.08] tracking-tight">
            <SplitWords text={intro.lead} />{' '}
            <span className="text-accent-soft">
              <SplitWords text={intro.leadAccent} delay={0.18} />
            </span>
          </h3>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-2.5 md:mt-14">
            {['SaaS product UI', 'Conversion-first pages', 'Design systems', 'Front-end build'].map(
              (chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] text-muted"
                >
                  {chip}
                </span>
              ),
            )}
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:col-span-7 md:col-start-6">
          {stats.map((stat, i) => (
            <StatBox key={stat.label} {...stat} delay={0.08 * i} />
          ))}

          <Box delay={0.24}>
            <div className="eyebrow">Based in</div>
            <div className="mt-3 font-display text-[clamp(1.35rem,2.1vw,1.8rem)] font-medium leading-none tracking-tight">
              Bhopal, India
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
              Working remotely or on-site with product, marketing and engineering teams.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[12.5px] text-[#4ad6b0]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ad6b0] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ad6b0]" />
              </span>
              {profile.available}
            </div>
          </Box>
        </div>
      </div>
    </section>
  )
}
