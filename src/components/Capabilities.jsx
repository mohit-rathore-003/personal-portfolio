import { motion } from 'framer-motion'
import { skills } from '../data/content'
import { Reveal } from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const EASE = [0.16, 1, 0.3, 1]

export default function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-24 border-y border-line bg-ink-2/30 py-24 md:py-36">
      <div className="shell">
        <SectionHeading
          index="04"
          label="Capabilities"
          title="Design, build,"
          accent="and decide"
          aside="Figma · React · Roadmaps"
        />

        <div className="mt-14 grid gap-x-10 gap-y-14 md:mt-20 md:grid-cols-3">
          {skills.map((column, ci) => (
            <div key={column.group}>
              <Reveal delay={0.06 * ci} className="flex items-baseline gap-3 border-b border-line pb-4">
                <span className="font-mono text-[10px] text-accent">0{ci + 1}</span>
                <h3 className="font-display text-lg uppercase tracking-[0.06em]">{column.group}</h3>
                <span className="ml-auto font-mono text-[10px] text-faint">
                  {String(column.items.length).padStart(2, '0')}
                </span>
              </Reveal>

              <ul className="mt-2">
                {column.items.map((item, i) => (
                  <motion.li
                    key={item}
                    className="group flex items-center gap-3 border-b border-white/[0.05] py-3 text-[14.5px] text-muted transition-colors duration-300 hover:text-paper"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-6% 0px' }}
                    transition={{ delay: 0.03 * i, duration: 0.55, ease: EASE }}
                  >
                    <span className="h-1 w-1 rounded-full bg-white/20 transition-all duration-300 group-hover:w-4 group-hover:bg-accent" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
