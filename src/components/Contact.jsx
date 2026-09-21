import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/content'
import { Reveal, SplitWords } from './ui/Reveal'
import Magnetic from './ui/Magnetic'

const EASE = [0.16, 1, 0.3, 1]

function LocalTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        }).format(new Date()),
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="font-mono text-[12px] tabular-nums text-muted">
      {time} <span className="text-faint">IST</span>
    </span>
  )
}

function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[12.5px] text-muted transition-colors duration-300 hover:border-white/25 hover:text-paper"
    >
      {copied ? 'Copied to clipboard' : 'Copy email'}
      <span className={`h-1.5 w-1.5 rounded-full transition-colors ${copied ? 'bg-[#4ad6b0]' : 'bg-white/25'}`} />
    </button>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="shell scroll-mt-24 py-24 md:py-36">
      <Reveal className="flex items-center justify-between gap-6">
        <span className="eyebrow flex items-center gap-3 text-[13.5px] tracking-[0.18em] text-paper">
          <span className="rounded-md bg-accent/15 px-2 py-1 text-[12px] text-accent-soft">05</span>
          Contact
        </span>
        <LocalTime />
      </Reveal>

      <div className="mt-10 md:mt-14">
        <p className="max-w-[30ch] font-display text-[clamp(2.4rem,7.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.04em]">
          <SplitWords text="Have a product that needs" />{' '}
          <span className="serif-accent text-accent-soft">
            <SplitWords text="a designer?" delay={0.15} />
          </span>
        </p>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[52ch] text-[15px] leading-[1.75] text-muted md:text-[16px]">
            I am open to product design and UI/UX roles where design and front-end sit close
            together. Tell me what you are building — I will reply with how I would approach it.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 md:mt-20">
        <motion.a
          href={`mailto:${profile.email}`}
          className="group relative flex flex-col gap-2 border-t border-line py-7 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          data-cursor-label="Email me"
        >
          <span className="font-display text-[clamp(1.4rem,4.2vw,3rem)] tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent-soft">
            {profile.email}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint transition-transform duration-500 group-hover:-translate-x-1 md:group-hover:translate-x-0">
            Write to me →
          </span>
          <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100" />
        </motion.a>

        <motion.a
          href={profile.phoneHref}
          className="group relative flex flex-col gap-2 border-t border-line py-7 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.06, ease: EASE }}
        >
          <span className="font-display text-[clamp(1.4rem,4.2vw,3rem)] tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent-soft">
            {profile.phone}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Call / WhatsApp →
          </span>
          <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100" />
        </motion.a>

        <motion.a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="group relative flex flex-col gap-2 border-y border-line py-7 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
        >
          <span className="font-display text-[clamp(1.4rem,4.2vw,3rem)] tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent-soft">
            {profile.linkedinLabel}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            LinkedIn ↗
          </span>
          <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100" />
        </motion.a>
      </div>

      <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
        <Magnetic strength={0.3}>
          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-2.5 rounded-full bg-paper px-5 py-3 text-[13.5px] font-medium text-ink transition-colors duration-300 hover:bg-accent hover:text-white"
          >
            Download résumé (PDF)
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M6 1v8m0 0L2.6 5.6M6 9l3.4-3.4M1.5 11h9"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Magnetic>
        <CopyEmail />
      </Reveal>
    </section>
  )
}
