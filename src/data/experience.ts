export type Experience = {
  company: string
  role: string
  start: string
  end: string
  /** ISO dates for <time> elements. */
  startIso: string
  endIso: string
  location: string
  summary: string
  /** Project slugs from data/projects.ts worked on in this role. */
  projects: string[]
  highlights: string[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    company: 'Brain Technosys Pvt. Ltd.',
    role: 'Software Developer',
    start: 'Feb 2025',
    end: 'Aug 2026',
    startIso: '2025-02',
    endIso: '2026-08',
    location: 'India · clients in Europe & Australia',
    summary:
      'Backend and full-stack work for four client products in fintech, workforce management, hiring and social commerce, from API design to production delivery.',
    projects: ['opalus', 'shift-work', 'hirra', 'homiiconnect'],
    highlights: [
      'Delivered 4+ real-world products and client projects, building their REST APIs with Express.js, MongoDB, PostgreSQL and Prisma',
      'Delivered KYC/AML onboarding and financial-crime compliance modules for an EU-regulated (ECSP) platform',
      'Designed state-machine-driven workflows with role-based transitions and field locking',
      'Automated monthly GST-compliant invoicing (500+ invoices a month) for an Australian workforce platform',
      'Shipped production features for client teams in Europe and Australia',
    ],
    stack: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'MongoDB', 'Prisma', 'React', 'Next.js', 'Sumsub'],
  },
]
