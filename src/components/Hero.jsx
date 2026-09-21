import { motion, useScroll, useTransform } from 'framer-motion'
import { lazy, Suspense, useRef } from 'react'
import { profile } from '../data/content'
import { scrollTo } from '../hooks/useSmoothScroll'
import { usePrefersReducedMotion } from '../hooks/useEnvironment'
import Magnetic from './ui/Magnetic'

// Three.js is the heaviest chunk on the page — keep it out of the first paint.
const HeroScene = lazy(() => import('./three/HeroScene'))

const EASE = [0.16, 1, 0.3, 1]

const rise = {
  hidden: { y: '110%' },
  show: (i = 0) => ({
    y: '0%',
    transition: { duration: 1.15, delay: 0.15 + i * 0.09, ease: EASE },
  }),
}

function Line({ children, i }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span className="block" variants={rise} custom={i}>
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero({ started }) {
  const section = useRef(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '22%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0])

  return (
    <section
      id="top"
      ref={section}
      className="noise relative flex min-h-[100svh] flex-col overflow-hidden pb-20 pt-32 md:pb-14 md:pt-44"
    >
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Settles the scene into the page at the top and bottom edges. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(110% 55% at 50% 0%, rgba(8,8,10,0.6) 0%, transparent 62%), linear-gradient(to top, #08080a 2%, rgba(8,8,10,0.5) 20%, transparent 52%)',
        }}
      />

      {/* Desktop only: quiets the left half so the headline never fights the cloud. */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            'linear-gradient(to right, rgba(8,8,10,0.93) 0%, rgba(8,8,10,0.8) 28%, rgba(8,8,10,0.34) 48%, transparent 64%)',
        }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        initial="hidden"
        animate={started ? 'show' : 'hidden'}
        className="relative z-10 flex flex-1 flex-col justify-center gap-16 md:justify-between md:gap-10"
      >
        {/* Top band — fills the head of the section instead of leaving it empty. */}
        <div className="shell w-full">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
            <span className="block overflow-hidden">
              <motion.span
                className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-start"
                variants={rise}
                custom={0}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.1em] text-paper sm:text-[10px] sm:tracking-[0.18em]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ad6b0] opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ad6b0]" />
                  </span>
                  {profile.available}
                </span>
                <span className="eyebrow text-muted">{profile.location}</span>
              </motion.span>
            </span>

            <motion.dl
              className="grid grid-cols-2 justify-items-center gap-x-10 gap-y-4 text-center sm:grid-cols-3 md:justify-items-start md:text-left"
              initial={{ opacity: 0 }}
              animate={started ? { opacity: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.8 }}
            >
              <div>
                <dt className="eyebrow">Currently</dt>
                <dd className="mt-1.5 text-[13.5px] text-paper">Magnet Brains</dd>
              </div>
              <div>
                <dt className="eyebrow">Focus</dt>
                <dd className="mt-1.5 text-[13.5px] text-paper">Product UI · UX</dd>
              </div>
              <div className="hidden sm:block">
                <dt className="eyebrow">Since</dt>
                <dd className="mt-1.5 text-[13.5px] text-paper">Jul 2025</dd>
              </div>
            </motion.dl>
          </div>
        </div>

        <div className="shell flex w-full flex-col gap-8">
          <h1 className="text-center font-display font-medium uppercase tracking-[-0.045em] md:text-left">
            <span className="fluid-display block leading-[0.82]">
              <Line i={1}>Mohit</Line>
              <Line i={2}>Rathore</Line>
            </span>
            <span className="fluid-role mt-3 block leading-[1.05] tracking-[-0.02em] md:mt-5">
              <Line i={3}>
                UI/UX{' '}
                <span className="serif-accent normal-case tracking-normal text-accent-soft">
                  Designer
                </span>
              </Line>
            </span>
          </h1>

          <div className="hairline" />

          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <span className="block overflow-hidden">
                <motion.p
                  className="mx-auto max-w-[52ch] text-center text-[15px] leading-relaxed text-muted md:mx-0 md:text-left md:text-[16.5px]"
                  variants={rise}
                  custom={4}
                >
                  Product designer building SaaS interfaces and marketing pages for the{' '}
                  <span className="text-paper">Pabbly</span> suite — Figma through to production
                  React, so nothing is lost in handoff.
                </motion.p>
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 md:col-span-4 md:col-start-9 md:justify-end">
              <Magnetic strength={0.4}>
                <motion.button
                  type="button"
                  onClick={() => scrollTo('#work')}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-paper px-5 py-3 text-[13.5px] font-medium text-ink transition-colors duration-300 hover:bg-accent hover:text-white"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={started ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.95, duration: 0.6, ease: EASE }}
                >
                  See the work
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 1.5v11m0 0L2.2 7.7M7 12.5l4.8-4.8"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </Magnetic>
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  )
}
