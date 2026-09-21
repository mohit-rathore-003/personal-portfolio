import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { work } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/useEnvironment'
import SectionHeading from './ui/SectionHeading'
import WorkVisual from './WorkVisual'

const EASE = [0.16, 1, 0.3, 1]

function ProjectCard({ project, i, total }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 12%', 'end start'],
  })
  // Cards shrink slightly as the next one slides over them.
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.94])
  const dim = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 0.3])

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 20 })
  const sry = useSpring(ry, { stiffness: 180, damping: 20 })

  const onTilt = (e) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ry.set(px * 12)
    rx.set(-py * 12)
  }
  const resetTilt = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `calc(96px + ${i * 14}px)`, zIndex: 10 + i, marginBottom: i === total - 1 ? 0 : '3.5rem' }}
    >
      {/* Outer bezel: a thin frame with a little breathing room around the card,
          the way a product screenshot sits inside a device mock. */}
      <motion.div
        style={{ scale }}
        className="rounded-[28px] border-[1.5px] border-white/14 bg-ink-3 p-2.5 md:rounded-[36px] md:p-4"
      >
        <article className="card-light relative overflow-hidden rounded-[20px] p-6 md:rounded-[24px] md:p-10">
          {/* Per-project colour wash */}
          <div
            className="pointer-events-none absolute -right-16 -top-24 h-52 w-52 rounded-full blur-[70px] md:-right-24 md:-top-32 md:h-80 md:w-80 md:blur-[90px]"
            style={{ background: project.accent, opacity: 0.22 }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0 bg-ink"
            style={{ opacity: dim }}
          />

          {/* Header rule spans the whole card, so both columns start level below it. */}
          <div className="relative flex items-center gap-4">
            <span
              className="font-mono text-[11px] font-medium tracking-[0.2em]"
              style={{ color: project.accentInk }}
            >
              {project.index}
            </span>
            <span className="h-px flex-1 bg-black/12" />
            <span className="eyebrow text-black/45">{project.year}</span>
          </div>

          <div className="relative mt-7 grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <h3 className="font-display text-[clamp(1.9rem,4.4vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink">
                {project.title}
              </h3>
              <p className="mt-2 text-[13px] uppercase tracking-[0.14em] text-black/50">
                {project.kind} · {project.role}
              </p>

              <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.75] text-black/70">
                {project.blurb}
              </p>

              <ul className="mt-7 flex flex-col gap-3">
                {project.highlights.map((h, hi) => (
                  <motion.li
                    key={h}
                    className="flex gap-3 text-[14px] leading-relaxed text-ink/85"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-8% 0px' }}
                    transition={{ delay: 0.06 * hi, duration: 0.6, ease: EASE }}
                  >
                    <span
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                      style={{ background: project.accentInk }}
                    />
                    {h}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/15 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-black/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>

            <div className="flex flex-col gap-5 md:col-span-5">
              <motion.div
                className="aspect-[4/3] w-full md:aspect-[3/4] lg:aspect-[4/3]"
                style={{ perspective: 900 }}
                onPointerMove={onTilt}
                onPointerLeave={resetTilt}
                data-cursor="hover"
                data-cursor-label="Concept"
              >
                <motion.div
                  className="h-full w-full"
                  style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
                >
                  <WorkVisual variant={project.index} accent={project.accent} />
                </motion.div>
              </motion.div>

              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor-label="Visit"
                  className="group/link flex w-full items-center justify-center gap-2.5 rounded-full px-5 py-3.5 text-[13.5px] font-medium text-white transition-[filter] duration-300 hover:brightness-115"
                  style={{ backgroundColor: project.accentInk }}
                >
                  View it live
                  <span className="hidden font-mono text-[11px] opacity-70 sm:inline">
                    {project.urlLabel}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 9L9 3m0 0H4.2M9 3v4.8"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : null}
            </div>
          </div>
        </article>
      </motion.div>
    </div>
  )
}

export default function Work() {
  return (
    <section id="work" className="shell scroll-mt-24 py-24 md:py-36">
      <SectionHeading
        index="02"
        label="Selected work"
        title="Three things I"
        accent="shipped"
        aside={`${work.length} projects`}
      />

      <div className="mt-14 md:mt-20">
        {work.map((project, i) => (
          <ProjectCard key={project.title} project={project} i={i} total={work.length} />
        ))}
      </div>
    </section>
  )
}
