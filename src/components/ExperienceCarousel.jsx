import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/useEnvironment'
import ExperienceVisual from './ExperienceVisual'

const EASE = [0.16, 1, 0.3, 1]
const AUTOPLAY_MS = 3000

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
}

// Solid dark pill with a near-white chevron — the buttons straddle the light card,
// so a muted glyph disappeared against it.
const ARROW_BASE =
  'z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-ink text-paper shadow-lg shadow-black/40 transition-colors duration-300 hover:border-white/45 hover:bg-ink-3'

function Arrow({ dir, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir > 0 ? 'Next responsibility' : 'Previous responsibility'}
      className={`${ARROW_BASE} ${className}`}
    >
      <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d={dir > 0 ? 'M4.5 1.5L10 7l-5.5 5.5' : 'M9.5 1.5L4 7l5.5 5.5'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default function ExperienceCarousel({ points }) {
  const reduced = usePrefersReducedMotion()
  const [[index, direction], setState] = useState([0, 1])
  const [paused, setPaused] = useState(false)
  const total = points.length

  const go = useCallback(
    (delta) => {
      setState(([current]) => [(current + delta + total) % total, delta])
    },
    [total],
  )

  const jumpTo = useCallback(
    (next) => {
      setState(([current]) => [next, next > current ? 1 : -1])
    },
    [],
  )

  // Autoplay, paused on hover/focus and switched off entirely for reduced motion.
  const playing = !paused && !reduced
  useEffect(() => {
    if (!playing) return undefined
    const id = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [playing, go, index])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  // Swipe on touch devices.
  const touchX = useRef(null)
  const onTouchStart = (e) => {
    touchX.current = e.changedTouches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const delta = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1)
    touchX.current = null
  }

  const point = points[index]

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="group"
      aria-roledescription="carousel"
      aria-label="What I do at Magnet Brains"
      tabIndex={0}
    >
      {/* Wrapper is only as tall as the card, so top-1/2 lands on the card's own
          centre rather than halfway down the card plus its footer row. */}
      <div className="relative">
        <Arrow
          dir={-1}
          onClick={() => go(-1)}
          className="absolute -left-5 top-1/2 hidden -translate-y-1/2 md:flex"
        />
        <Arrow
          dir={1}
          onClick={() => go(1)}
          className="absolute -right-5 top-1/2 hidden -translate-y-1/2 md:flex"
        />

        <div className="card-light overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={reduced ? undefined : slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: EASE }}
            className="flex min-h-[420px] flex-col items-center justify-center gap-7 p-6 sm:min-h-[300px] md:flex-row md:gap-12 md:p-8"
            aria-live="polite"
          >
              <div className="order-2 w-full max-w-[46ch] md:order-1">
                <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-accent-ink">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <h4 className="mt-4 font-display text-[clamp(1.25rem,2.2vw,1.85rem)] font-medium leading-[1.15] tracking-tight text-ink">
                  {point.title}
                </h4>
                <p className="mt-3 text-[14.5px] leading-[1.75] text-black/70">{point.body}</p>
              </div>

              <div className="order-1 h-[170px] w-full shrink-0 md:order-2 md:h-[215px] md:w-[330px]">
                <ExperienceVisual variant={point.visual} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress bars double as the slide picker. */}
      <div className="mt-5 flex items-center gap-3">
        <Arrow dir={-1} onClick={() => go(-1)} className="md:hidden" />

        <div className="flex flex-1 items-center gap-2">
          {points.map((item, i) => (
            <button
              key={item.title}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Go to ${item.title}`}
              aria-current={i === index}
              className="group h-6 flex-1 outline-offset-4"
            >
              <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/12 transition-colors duration-300 group-hover:bg-white/25">
                {i === index ? (
                  <motion.span
                    key={`${index}-${playing}`}
                    className="absolute inset-y-0 left-0 block rounded-full bg-accent"
                    initial={{ width: playing ? '0%' : '100%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: playing ? AUTOPLAY_MS / 1000 : 0, ease: 'linear' }}
                  />
                ) : null}
              </span>
            </button>
          ))}
        </div>

        <Arrow dir={1} onClick={() => go(1)} className="md:hidden" />
      </div>
    </div>
  )
}
