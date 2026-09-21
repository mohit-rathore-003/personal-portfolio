import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './useEnvironment'

let lenisInstance = null

export const scrollTo = (target, options) => {
  if (lenisInstance) {
    // Clear the fixed header so section headings are not tucked underneath it.
    lenisInstance.scrollTo(target, { offset: -80, duration: 1.4, ...options })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Boots Lenis inertial scrolling, skipped entirely when reduced motion is on. */
export function useSmoothScroll(enabled = true) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!enabled || reduced) return undefined

    // Frame-based smoothing, not duration-based. With `duration` every wheel tick
    // restarts a fixed-length tween, which feels stuck when you scroll up and down
    // quickly; `lerp` just eases towards the target and stays responsive.
    const lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: false,
    })
    lenisInstance = lenis

    let frame = 0
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisInstance = null
    }
  }, [enabled, reduced])
}
