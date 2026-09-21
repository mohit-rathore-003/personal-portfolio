import { motion } from 'framer-motion'
import { education, experience, languages, process } from '../data/content'
import ExperienceCarousel from './ExperienceCarousel'
import { Reveal } from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const EASE = [0.16, 1, 0.3, 1]

function Timeline() {
  return (
    <div className="relative pl-6 md:pl-8">
      {experience.map((job) => (
        <div key={job.company} className="relative">
          <span className="absolute -left-6 top-4 flex h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:-left-8">
            <span className="absolute h-3 w-3 animate-ping rounded-full bg-accent/40" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-accent" />
          </span>

          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="font-display text-[clamp(1.35rem,2.6vw,2.1rem)] font-medium tracking-tight">
                {job.company}
              </h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-soft">
                {job.period}
              </span>
            </div>
            <p className="mt-1.5 text-[14px] text-muted">
              {job.role} — {job.place}
            </p>
            <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.75] text-paper/85">
              {job.summary}
            </p>
          </Reveal>

          <div className="mt-9">
            <ExperienceCarousel points={job.points} />
          </div>
        </div>
      ))}
    </div>
  )
}

function ProcessGrid() {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
      {process.map((item, i) => (
        <motion.div
          key={item.step}
          className="group relative bg-ink p-6 transition-colors duration-500 hover:bg-ink-3"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ delay: 0.07 * i, duration: 0.7, ease: EASE }}
        >
          <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
            0{i + 1}
          </span>
          <h4 className="mt-4 font-display text-xl tracking-tight">{item.step}</h4>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{item.body}</p>
          <span className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
        </motion.div>
      ))}
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="shell scroll-mt-24 py-24 md:py-36">
      <SectionHeading
        index="03"
        label="Experience"
        title="Where I do"
        accent="the work"
        aside="Jul 2025 — Present"
      />

      <div className="mt-14 md:mt-20">
        <Timeline />
      </div>

      <div className="mt-24 md:mt-32">
        <Reveal className="mb-8 flex items-center justify-between gap-6">
          <span className="eyebrow">How I work</span>
          <span className="eyebrow hidden sm:block">Four steps, every time</span>
        </Reveal>
        <ProcessGrid />
      </div>

      <div className="mt-24 grid gap-12 md:mt-32 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal className="eyebrow mb-6 block">Education</Reveal>
          {education.map((item) => (
            <Reveal key={item.title} className="border-t border-line pt-6">
              <span className="font-mono text-[11px] tracking-[0.16em] text-accent-soft">
                {item.period}
              </span>
              <h4 className="mt-3 font-display text-2xl tracking-tight">{item.title}</h4>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                {item.org}, {item.place}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <Reveal className="eyebrow mb-6 block">Languages</Reveal>
          <div className="flex flex-col">
            {languages.map((lang, i) => (
              <Reveal
                key={lang.name}
                delay={0.06 * i}
                className="flex items-baseline justify-between gap-4 border-t border-line py-5"
              >
                <span className="font-display text-xl tracking-tight">{lang.name}</span>
                <span className="text-right text-[13px] text-muted">{lang.level}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
