import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, profile } from '../data/content'
import { scrollTo } from '../hooks/useSmoothScroll'
import Magnetic from './ui/Magnetic'

const EASE = [0.16, 1, 0.3, 1]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (href) => (e) => {
    e.preventDefault()
    setMenuOpen(false)
    // Wait a frame so the overlay is gone before Lenis takes over.
    requestAnimationFrame(() => scrollTo(href))
  }

  return (
    <>
      {/* Floating island rather than a full-width bar — it sits inset from the
          page edges and carries its own scroll-progress line along the bottom. */}
      <header className="fixed inset-x-0 top-0 z-[70] px-3 pt-3 md:px-6 md:pt-4">
        <div
          className={`surface-light relative mx-auto flex h-[58px] w-full max-w-[1232px] items-center justify-between gap-6 overflow-hidden rounded-2xl border border-black/10 px-4 transition-shadow duration-500 md:h-[64px] md:px-7 ${
            scrolled ? 'shadow-[0_12px_44px_rgba(0,0,0,0.6)]' : 'shadow-[0_6px_24px_rgba(0,0,0,0.35)]'
          }`}
        >
          <a
            href="#top"
            onClick={go('#top')}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-display text-[15px] font-medium tracking-tight">
              {profile.name}
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-black/45 sm:inline">
              / {profile.discipline}
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={go(item.href)}
                className="rounded-full px-3.5 py-2 text-[13px] text-black/65 transition-colors duration-300 hover:bg-black/5 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic strength={0.25} className="hidden sm:block">
              <a
                href={profile.resume}
                download
                className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[12.5px] font-medium text-paper transition-colors duration-300 hover:bg-accent"
              >
                Résumé
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1v8m0 0L2.6 5.6M6 9l3.4-3.4M1.5 11h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-black/15 md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <motion.span
                className="block h-px w-4 bg-ink"
                animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-px w-4 bg-ink"
                animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[65] flex flex-col justify-center bg-ink/97 px-6 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={go(item.href)}
                  className="border-b border-line py-4 font-display text-4xl tracking-tight"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.06 * i, duration: 0.55, ease: EASE }}
                >
                  <span className="mr-3 font-mono text-[11px] align-super text-faint">
                    0{i + 1}
                  </span>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href={profile.resume}
              download
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-paper px-5 py-3 text-[14px] font-medium text-ink"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.5, ease: EASE }}
            >
              Download résumé
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
