export const profile = {
  name: 'Mohit Rathore',
  role: 'Product Designer',
  discipline: 'UI & UX',
  location: 'Bhopal, Madhya Pradesh, India',
  timezone: 'IST · UTC+5:30',
  phone: '+91 62643 98181',
  phoneHref: 'tel:+916264398181',
  email: 'ankitrathor2mni@gmail.com',
  linkedin: 'https://linkedin.com/in/mohit-rathore-67468a270',
  linkedinLabel: 'linkedin.com/in/mohit-rathore',
  resume: '/Mohit-Rathore-Resume.pdf',
  available: 'Open to product / UI-UX design roles',
}

export const intro = {
  lead: 'I design SaaS product interfaces and high-converting marketing pages —',
  leadAccent: 'then build them myself.',
  // `body` is the long résumé profile text. It is kept here but not rendered — the
  // About section shows the statement plus the four tiles instead. Drop it back in
  // if you ever want the paragraphs again.
  body: [
    'Product designer focused on UI/UX for SaaS products and high-converting marketing pages. I design and ship the landing pages for every product in the Pabbly suite, and owned the end-to-end UI/UX for Pabbly Email Marketing — from user flows and wireframes through high-fidelity Figma prototypes to the shipped interface, including its internal product roadmap.',
    'Comfortable working in the browser as well as in Figma, so what I design is what actually goes live.',
  ],
}

// `count` and `suffix` are split so the number can animate up on scroll.
export const stats = [
  { count: 6, suffix: '+', label: 'Products designed for', sub: 'across the Pabbly suite' },
  { count: 1, suffix: '', label: 'SaaS product owned end-to-end', sub: 'Pabbly Email Marketing' },
  { count: 100, suffix: '%', label: 'Designs I ship myself', sub: 'Figma to React, in production' },
]

export const experience = [
  {
    company: 'Magnet Brains Software Pvt. Ltd.',
    role: 'Product Designer (UI/UX)',
    place: 'Bhopal, India',
    period: 'Jul 2025 — Present',
    status: 'current',
    summary:
      'Designing across the whole Pabbly suite — the product UI and the marketing surface that sells it.',
    // Each point is one slide of the experience carousel. `visual` picks the
    // illustration in ExperienceVisual.jsx.
    points: [
      {
        title: 'Landing pages for the whole suite',
        body: 'Design and ship the landing pages for the entire Pabbly product suite — Connect, Chatflow, Hook, Email Marketing and more — keeping one consistent visual language across every product.',
        visual: 'suite',
      },
      {
        title: 'End-to-end product UI',
        body: 'Owned end-to-end UI/UX for Pabbly Email Marketing: user flows, wireframes, high-fidelity Figma prototypes and design QA through to release.',
        visual: 'flow',
      },
      {
        title: 'The internal product roadmap',
        body: 'Built the internal product roadmap for Pabbly Email Marketing, mapping features, priorities and release phases together with the product and engineering team.',
        visual: 'roadmap',
      },
      {
        title: 'A shared component library',
        body: 'Maintain a shared component and section library for the landing pages, so new pages are assembled from proven patterns instead of being designed from scratch.',
        visual: 'library',
      },
      {
        title: 'Design straight into production',
        body: 'Build my own designs in HTML, CSS, Tailwind and React, keeping handoff lossless and design intent intact in production.',
        visual: 'code',
      },
      {
        title: 'Reviews, then iteration',
        body: 'Run design reviews with product, marketing and development, and iterate on pages based on how they actually perform.',
        visual: 'review',
      },
    ],
  },
]

export const work = [
  {
    index: '01',
    title: 'Pabbly Email Marketing',
    kind: 'Email campaign platform',
    year: '2025',
    role: 'End-to-end UI/UX · Product roadmap',
    blurb:
      'Handled UI/UX end to end: campaign creation flow, template and subscriber management, and reporting views — plus the internal roadmap that shaped the release plan.',
    highlights: [
      'User flows, wireframes and high-fidelity Figma prototypes',
      'Campaign builder, templates, subscriber management, reporting',
      'Design QA through to release, alongside engineering',
    ],
    tags: ['Product UI', 'User flows', 'Design QA', 'Roadmap'],
    // Add `url` + `urlLabel` to any project to show a "view it live" button on its card.
    url: 'https://www.pabbly.com/email-marketing/',
    urlLabel: 'pabbly.com/email-marketing',
    accent: '#7a5cff',
    // Darker twin of `accent`, legible on the light card background.
    accentInk: '#4f2fd4',
  },
  {
    index: '02',
    title: 'Pabbly Landing Pages',
    kind: 'Marketing surface for the suite',
    year: '2025',
    role: 'Design and front-end build',
    blurb:
      'Designed and built the marketing pages for all Pabbly products: hero sections, pricing tables, feature blocks and responsive layouts, designed for clarity and signup conversion.',
    highlights: [
      'Hero, pricing, feature and comparison blocks built as reusable sections',
      'Responsive down to small phones, accessible by default',
      'Built with Astro, React and Tailwind, shipped to production',
    ],
    tags: ['Conversion design', 'Astro', 'Tailwind', 'Responsive'],
    url: 'https://www.pabbly.com/',
    urlLabel: 'pabbly.com',
    accent: '#ff7a45',
    accentInk: '#c2410c',
  },
  {
    index: '03',
    title: 'Pabbly Design Language',
    kind: 'Design system',
    year: '2025',
    role: 'System design and maintenance',
    blurb:
      'A shared set of typography, colour and section patterns used across every Pabbly page, which cut page build time and removed visual inconsistencies between products.',
    highlights: [
      'Type scale, colour tokens and spacing rhythm shared across products',
      'A section library that new pages get assembled from',
      'Fewer one-off decisions, faster builds, one visual voice',
    ],
    tags: ['Design system', 'Components', 'Tokens', 'Documentation'],
    accent: '#4ad6b0',
    accentInk: '#0d7a63',
  },
]

export const process = [
  {
    step: 'Understand',
    body: 'Talk to product, marketing and support. Map the job a screen has to do before touching a canvas.',
  },
  {
    step: 'Structure',
    body: 'Flows, information architecture and low-fidelity wireframes. Decide hierarchy while it is still cheap to change.',
  },
  {
    step: 'Design',
    body: 'High-fidelity Figma against a real component library, with states, edge cases and responsive behaviour built in.',
  },
  {
    step: 'Ship and iterate',
    body: 'Build it in React and Tailwind, run design QA with engineering, then iterate on how the page actually performs.',
  },
]

export const skills = [
  {
    group: 'Design',
    items: [
      'Figma (advanced)',
      'Prototyping & interaction design',
      'Wireframing',
      'Design systems & component libraries',
      'User research',
      'Usability testing',
      'Information architecture',
      'Responsive & accessible design',
      'Landing page & conversion design',
      'Design handoff',
      'Canva',
    ],
  },
  {
    group: 'Development',
    items: [
      'React JS',
      'HTML / CSS / JavaScript',
      'Tailwind CSS',
      'Astro',
      'MUI',
      'Bootstrap',
      'WordPress',
      'Elementor',
      'Git',
    ],
  },
  {
    group: 'Product & Process',
    items: [
      'Product roadmapping',
      'Feature prioritisation',
      'Design QA',
      'Cross-functional collaboration',
      'Design critique',
      'Stakeholder communication',
    ],
  },
]

export const education = [
  {
    period: '2021 — 2025',
    title: 'B.Tech, Computer Science',
    org: 'Sagar Institute of Science Technology & Engineering (RGPV)',
    place: 'Bhopal',
  },
]

export const languages = [
  { name: 'English', level: 'Professional working proficiency' },
  { name: 'Hindi', level: 'Native' },
]

export const marqueeWords = [
  'UI/UX Design',
  'Design Systems',
  'Figma',
  'Prototyping',
  'React',
  'Tailwind CSS',
  'Landing Pages',
  'User Flows',
  'Design QA',
  'Product Roadmaps',
  'Accessibility',
  'Conversion Design',
]

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
]
