import { profile } from '../data/content'
import { scrollTo } from '../hooks/useSmoothScroll'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    /* Light block closing a dark page — the colour change is the divider, so no rule. */
    <footer className="surface-light relative overflow-hidden pt-14">
      <div className="shell flex flex-col gap-10 pb-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-black/45">
              {profile.role} / {profile.discipline}
            </span>
            <p className="mt-2 max-w-[34ch] text-[13.5px] leading-relaxed text-black/65">
              Designed and built from scratch — React, Three.js and Tailwind, no template.
            </p>
          </div>

          <button
            type="button"
            onClick={() => scrollTo('#top')}
            className="group inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-[12.5px] text-black/65 transition-colors duration-300 hover:border-black/40 hover:text-ink"
          >
            Back to top
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              <path
                d="M6 11V2m0 0L2 6M6 2l4 4"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="h-px w-full bg-black/10" />

        <div className="flex flex-wrap items-center justify-between gap-4 text-[12px] text-black/50">
          <span>
            © {year} {profile.name}. All rights reserved.
          </span>
          <div className="flex items-center gap-5">
            <a className="link-underline hover:text-ink" href={`mailto:${profile.email}`}>
              Email
            </a>
            <a
              className="link-underline hover:text-ink"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
            >
              LinkedIn
            </a>
            <a className="link-underline hover:text-ink" href={profile.phoneHref}>
              Phone
            </a>
          </div>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the viewport edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none px-3 text-center font-display font-medium uppercase leading-[0.78] tracking-[-0.05em] text-black/[0.07]"
        style={{ fontSize: 'clamp(3.5rem, 17vw, 16rem)' }}
      >
        Mohit Rathore
      </div>
    </footer>
  )
}
