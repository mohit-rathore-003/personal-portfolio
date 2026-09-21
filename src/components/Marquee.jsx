import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { marqueeWords } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/useEnvironment'

/** Infinite ticker whose offset is nudged by scroll position. */
export default function Marquee() {
  const wrap = useRef(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ['start end', 'end start'],
  })
  const shift = useTransform(scrollYProgress, [0, 1], ['4%', '-12%'])

  const row = [...marqueeWords, ...marqueeWords]

  return (
    <div
      ref={wrap}
      className="relative overflow-hidden border-y border-line bg-ink-2/40 py-5 md:py-7"
    >
      <motion.div
        className="mask-fade-x flex whitespace-nowrap"
        style={reduced ? undefined : { x: shift }}
      >
        <motion.div
          className="flex shrink-0 items-center"
          animate={reduced ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
          style={{ willChange: 'transform' }}
        >
          {[...row, ...row].map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center">
              <span className="px-6 font-display text-[clamp(1.1rem,2.2vw,1.9rem)] font-light tracking-tight text-paper/85">
                {word}
              </span>
              {/* Plain span: a motion value per star meant ~24 style writes a
                  frame while the ticker was on screen. */}
              <span className="text-accent" aria-hidden="true">
                ✳
              </span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
