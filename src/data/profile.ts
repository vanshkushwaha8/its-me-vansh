/** Copy for the hero, intro and about sections. */
export const profile = {
  hero: {
    eyebrow: 'Full-Stack Software Engineer',
    lines: ['Building digital products.', 'Solving real problems.'],
    intro:
      'I design and build web applications, APIs and user experiences, from regulated fintech onboarding to products I run myself.',
  },

  /** Short phrases for the scrolling band under the hero. */
  focusAreas: [
    'KYC / AML onboarding',
    'REST API design',
    'State machines',
    'Payments & payouts',
    'RBAC',
    'Next.js & React',
    'PostgreSQL & MongoDB',
    'RAG & agents',
  ],

  statement:
    'I build the parts of software that have to be right: who can do what, where the money is, and what happens when two things happen at once.',

  /** Résumé-verified numbers only. */
  facts: [
    { value: '1.5+', label: 'Years building production systems' },
    { value: '4+', label: 'Products Delivered', description: 'Real-world products and client projects' },
    { value: '4', label: 'Client products for teams in Europe & Australia' },
    { value: '1', label: 'Independent product live in production' },
  ],

  about: {
    lead: 'I like problems that start messy: a regulation, a payment flow, a process that lives in someone’s head.',
    paragraphs: [
      'Most of my work so far has been on the backend of products with real constraints. For an EU-regulated crowdfunding platform, that meant onboarding where every step is a compliance requirement. For an Australian workforce platform, it meant invoices that must be correct for tax every single month. I enjoy turning those rules into data models and state machines that make the wrong thing hard to do.',
      'I also build and run my own products. Running JobNirdesh end to end means owning the parts client work often hides: SEO, content operations, performance on low-end phones, and deciding what to build next.',
      'I work best close to the problem. I ask what has to be true before writing code, keep the design simple enough to change, and ship in small, reviewable steps.',
    ],
    principles: [
      { title: 'Model the rules', body: 'Explicit states and transitions beat scattered if-statements.' },
      { title: 'Make it swappable', body: 'Vendors change. Adapters keep the core stable.' },
      { title: 'Ship, then sharpen', body: 'Small releases, real feedback, measured fixes.' },
    ],
  },

  approach: {
    title: 'From idea to production.',
    steps: [
      { n: '01', title: 'Understand', body: 'Find the real constraint: the regulation, the user, the edge case.' },
      { n: '02', title: 'Design', body: 'Data model, states and API contracts before screens.' },
      { n: '03', title: 'Build', body: 'Typed, validated, tested where it counts, across the full stack.' },
      { n: '04', title: 'Deliver', body: 'Deploy, observe, fix what users actually hit.' },
    ],
  },

  contact: {
    lines: ['Have a project in mind?', 'Let’s build something meaningful.'],
    body: 'I’m open to full-time frontend, backend and full-stack roles, including relocation to Germany or the EU, and to selected freelance projects. The fastest way to reach me is email.',
  },
}
