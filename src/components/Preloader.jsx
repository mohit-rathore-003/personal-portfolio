import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/useEnvironment'

const EASE = [0.76, 0, 0.24, 1]

export default function Preloader({ onDone }) {
  const reduced = usePrefersReducedMotion()
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (reduced) {
      setOpen(false)
      onDone?.()
      return undefined
    }

    let raf = 0
    const start = performance.now()
    const duration = 1500

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      // Ease-out so the number sprints then settles.
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setOpen(false)
          onDone?.()
        }, 260)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced, onDone])

  // Lock the page while the curtain is up.
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-8 md:px-12 md:py-12"
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="flex items-start justify-between">
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {profile.name}
            </motion.span>
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              Portfolio · 2026
            </motion.span>
          </div>

          <div className="flex flex-col gap-6">
            <motion.div
              className="font-display text-[15vw] leading-[0.8] tracking-tighter md:text-[9vw]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              Product Designer
              <span className="serif-accent text-accent-soft"> / UI &amp; UX</span>
            </motion.div>

            <div className="relative h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>

          <div className="flex items-end justify-between">
            <span className="eyebrow">Bhopal, India</span>
            <span className="font-display text-[14vw] leading-none tabular-nums md:text-[7vw]">
              {String(count).padStart(3, '0')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
