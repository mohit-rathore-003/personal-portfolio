import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMediaQuery, usePrefersReducedMotion } from '../../hooks/useEnvironment'

const HOVER_SELECTOR = 'a, button, [data-cursor="hover"]'

/** Dot + trailing ring, swapped for a label over elements that ask for one. */
export default function Cursor() {
  const fine = useMediaQuery('(pointer: fine)')
  const reduced = usePrefersReducedMotion()

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 })

  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!fine || reduced) return undefined

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e) => {
      const target = e.target instanceof Element ? e.target.closest(HOVER_SELECTOR) : null
      setHovering(!!target)
      setLabel(target?.getAttribute('data-cursor-label') ?? '')
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [fine, reduced, x, y])

  if (!fine || reduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden="true">
      {/* x/y sit on the outer node so the -50% centring transform is not overwritten.
          Difference blending keeps the cursor visible over the light work cards too;
          it is on the small nodes rather than the full-viewport wrapper to stay cheap. */}
      <motion.div className="fixed left-0 top-0" style={{ x, y, mixBlendMode: 'difference' }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-paper"
          animate={{
            width: hovering ? 6 : 7,
            height: hovering ? 6 : 7,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      <motion.div
        className="fixed left-0 top-0"
        style={{ x: ringX, y: ringY, mixBlendMode: 'difference' }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 font-mono text-[9px] uppercase tracking-[0.18em] text-paper"
          animate={{
            width: label ? 78 : hovering ? 46 : 30,
            height: label ? 78 : hovering ? 46 : 30,
            opacity: visible ? (hovering ? 1 : 0.55) : 0,
            backgroundColor: hovering ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        >
          {label}
        </motion.div>
      </motion.div>
    </div>
  )
}
