import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useEnvironment'

const EASE = [0.16, 1, 0.3, 1]

/** Fade + rise on first scroll into view. */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', once = true }) {
  const reduced = usePrefersReducedMotion()
  const Tag = motion[as] ?? motion.div

  if (reduced) return <Tag className={className}>{children}</Tag>

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/** Word-by-word masked reveal for headlines. */
export function SplitWords({ text, className = '', wordClassName = '', delay = 0, stagger = 0.045 }) {
  const reduced = usePrefersReducedMotion()
  const words = text.split(' ')

  if (reduced) return <span className={className}>{text}</span>

  // staggerChildren has to live on a variant, not on the transition prop.
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.08em', marginBottom: '-0.08em' }}
          aria-hidden="true"
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: '0%', opacity: 1 },
            }}
            transition={{ duration: 1, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** A thin rule that draws itself in. */
export function DrawLine({ className = '', delay = 0 }) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.div
      className={`h-px w-full origin-left bg-white/12 ${className}`}
      initial={reduced ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    />
  )
}
