import { media } from '@/config/media'
import type { Project } from './types'

/**
 * All project content. Order within each kind = order on the home page.
 *
 * Sources: résumé (Oct 2026), project READMEs / architecture docs, and the live JobNirdesh
 * site. Client work never includes source code, internal URLs or credentials.
 */
export const projects: Project[] = [
  // ───────────────────────────── Independent products ─────────────────────────────
  {
    slug: 'jobnirdesh',
    title: 'JobNirdesh',
    kind: 'independent',
    category: 'Government jobs & exam platform',
    summary:
      'A live platform for Indian government job seekers: recruitment notifications, results, admit cards, answer keys, syllabus, scholarships and career guidance, plus free PDF and image tools that run entirely in the browser.',
    role: 'Product, design & full-stack development',
    highlights: [
      'Content platform for jobs, results, admit cards and exam notices with an admin CMS behind it',
      'Student tools hub with server-scored mock tests that keep answer keys off the client',
      'PDF and image tools (merge, split, PDF to Word with on-device OCR, compress) that never upload files',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Web Push'],
    status: 'Live',
    cover: { type: 'image', image: media.projects.jobnirdesh.home },
    links: { live: { label: 'jobnirdesh.com', href: 'https://www.jobnirdesh.com/' } },
    tier: 'lead',
    caseStudy: {
      overview:
        'JobNirdesh is a government job information platform focused on Indian aspirants, with dedicated hubs for Bihar and CBSE updates. It brings recruitment notifications, results, admit cards, answer keys, syllabus, scholarships and career guidance into one place, and adds the small utilities applicants keep needing, such as shrinking a photo for an application form or merging certificates into one PDF.',
      problem:
        'Exam and recruitment information is scattered across many official portals, and deadlines are easy to miss. Applicants also rely on ad-heavy third-party sites to resize photos or merge PDFs, which means uploading personal documents to unknown servers.',
      goals: [
        'One fast, searchable place for jobs, results, admit cards and exam notices, newest first',
        'Content that editors can publish and update without a deploy',
        'Pages that search engines can index, with per-page metadata and a generated sitemap',
        'Document tools that process files locally, so nothing is uploaded',
      ],
      contributions: [
        'Designed the information architecture: government jobs vs. exams, results, admit cards, syllabus, scholarships, state and board hubs',
        'Built the React front end, including the alert ticker, featured-job carousel, category filters and mobile navigation',
        'Built the Express/MongoDB API with Joi validation, JWT-protected admin routes, request sanitisation and structured logging',
        'Built a Student Tools hub whose mock tests are scored on the server, so answer keys never reach the browser',
        'Built the in-browser PDF and image toolkit with pdf-lib, pdf.js and tesseract.js for on-device OCR',
        'Added web-push and email notification campaigns, and sitemap generation for every enabled page',
      ],
      stack: [
        { group: 'Frontend', items: ['React 19', 'Vite', 'React Router', 'Tailwind CSS', 'Material UI'] },
        { group: 'In-browser processing', items: ['pdf-lib', 'pdf.js', 'tesseract.js (OCR)', 'docx', 'jSquash (AVIF)'] },
        { group: 'Backend', items: ['Node.js', 'Express', 'MongoDB / Mongoose', 'Joi', 'JWT', 'Winston'] },
        { group: 'Infrastructure', items: ['Upstash Redis cache', 'S3-compatible storage', 'Web Push', 'Nodemailer'] },
      ],
      workflow: {
        title: 'How content moves through the system',
        steps: [
          { title: 'Publish', body: 'Editors create jobs, results, admit cards and notices in the admin panel. Joi schemas validate every field before anything is saved.' },
          { title: 'Serve', body: 'Public read endpoints return newest-first lists for each category, with a Redis cache in front of frequently read data.' },
          { title: 'Discover', body: 'Each page sets its own metadata, and the sitemap service lists every enabled job, result and tool page for search engines.' },
          { title: 'Notify', body: 'Subscribers get web-push and email alerts through campaign and delivery records, so every send can be tracked.' },
        ],
      },
      gallery: [media.projects.jobnirdesh.jobs, media.projects.jobnirdesh.tools, media.projects.jobnirdesh.mobile],
      challenges: [
        {
          challenge: 'Mock tests are useless if the answer key can be read from the network tab.',
          solution:
            'Questions go to the client without answers. Submissions are scored by a pure, unit-tested helper on the server, and only the result comes back.',
        },
        {
          challenge: 'Applicants need PDF and image tools, but their documents are personal.',
          solution:
            'Every tool runs in the browser using WebAssembly and JavaScript libraries, including OCR for scanned PDFs, so files never leave the device. Planned tools that would need a server are shown as planned, not as buttons that fail.',
        },
        {
          challenge: 'Listings change daily, and stale or slow pages lose users.',
          solution:
            'Lists are ordered newest first, frequently read data is cached in Redis, and an alerts ticker puts time-critical notices such as answer keys, date changes and cancellations at the top of every page.',
        },
      ],
    },
  },
  {
    slug: 'building-material-marketplace',
    title: 'Build Material',
    kind: 'independent',
    category: 'Construction materials marketplace',
    summary:
      'A marketplace where buyers find new, surplus and nearby construction materials from individual sellers and registered stores, with offers, escrow-style payment states, seller payouts and delivery quotes.',
    role: 'Full-stack development',
    highlights: [
      'Offer and negotiation flow that turns an accepted offer into a transaction',
      'Escrow-style money state machine with an append-only ledger and audit log',
      'Razorpay checkout and RazorpayX seller payouts behind a swappable adapter registry',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'GeoJSON'],
    status: 'In development',
    cover: { type: 'image', image: media.projects.buildMaterial.brand, fit: 'contain' },
    links: {
      source: [{ label: 'API source', href: 'https://github.com/vanshkushwaha8/material-marketplace-api' }],
    },
    tier: 'feature',
    caseStudy: {
      statusNote:
        'In active development and not yet public. Seller-quoted delivery (phase 1) is implemented. Cart and multi-product store orders (phase 2) have not started.',
      overview:
        'Build Material connects people buying construction materials with two kinds of sellers: individuals selling surplus or unused stock, and registered business stores selling new stock. Buyers can negotiate on price, pay through the platform and confirm receipt before the seller is paid.',
      problem:
        'Leftover materials from construction sites rarely find a second buyer, and buying from local stores means phone calls and cash. A marketplace for this needs trust on both sides. Buyers need to know the money is safe until the goods arrive, and sellers need to know they will be paid.',
      goals: [
        'Separate, correct flows for individual sellers and business stores',
        'Money that moves only through explicit, audited state transitions',
        'Payment and payout providers that can be swapped without touching business logic',
        'Location-aware listings so buyers can find materials nearby',
      ],
      contributions: [
        'Modelled buyers, two seller types and separately authenticated admins with permission-based RBAC',
        'Built the listing lifecycle: draft, then submitted for verification, then approved by an admin before going live',
        'Built offers, counter-offers and buy-now, all of which create a transaction with amounts snapshotted at that moment',
        'Implemented the escrow status machine with atomic compare-and-set transitions, each writing a ledger row and an audit entry',
        'Integrated Razorpay Checkout for buyer payments and RazorpayX payouts with penny-drop bank verification',
        'Added GeoJSON locations with 2dsphere indexes on users, stores and listings, and seller-quoted delivery',
      ],
      stack: [
        { group: 'Frontend', items: ['React 19', 'React Router', 'i18n'] },
        { group: 'Backend', items: ['Node.js', 'Express', 'Mongoose', 'Joi'] },
        { group: 'Payments', items: ['Razorpay Checkout', 'RazorpayX payouts', 'Adapter registry'] },
        { group: 'Data', items: ['MongoDB', 'GeoJSON + 2dsphere indexes', 'Append-only audit log'] },
      ],
      workflow: {
        title: 'Order lifecycle',
        intro: 'Each step is a guarded transition. Anything that does not match the expected current state is rejected.',
        steps: [
          { title: 'List', body: 'The seller creates a draft listing and submits it for verification. An admin approves it before it goes live.' },
          { title: 'Negotiate', body: 'The buyer makes an offer. The seller accepts, counters or rejects it. Stores can also offer buy-now at the listed price.' },
          { title: 'Pay & hold', body: 'An accepted offer becomes a transaction. The buyer pays through Razorpay, and the funds are marked as held.' },
          { title: 'Deliver', body: 'The buyer chooses pickup or delivery. For delivery, the seller quotes from the address, and the buyer accepts the quote before paying.' },
          { title: 'Release', body: 'The buyer confirms receipt. Commission is deducted, and the payout is released to the seller’s verified bank account.' },
        ],
      },
      challenges: [
        {
          challenge: 'A payment webhook and a user action can race to change the same order.',
          solution:
            'Escrow state changes only through one service that does an atomic compare-and-set on the current status, then records a ledger row and an audit entry. A second, conflicting transition fails instead of overwriting the first.',
        },
        {
          challenge: 'A test payment provider must never be reachable in production.',
          solution:
            'Providers are resolved from an integrations registry. The manual test adapter is enabled by an environment flag and hard-disabled when NODE_ENV is production.',
        },
        {
          challenge: 'Store listings must stay consistent with the store’s own profile.',
          solution:
            'Business-store listings inherit the store’s location and allowed categories, and editing the store location updates all of its listings.',
        },
      ],
    },
  },
  {
    slug: 'farm-inventory-management',
    title: 'Farm Inventory',
    kind: 'independent',
    category: 'Farm operations system',
    summary:
      'A system for running a farm’s day-to-day records: inventory, expenses, pond water testing, and a marketplace module.',
    role: 'Product & full-stack development',
    highlights: ['Inventory tracking', 'Expense records', 'Pond water testing logs', 'Marketplace module'],
    stack: [],
    status: 'In development',
    cover: {
      type: 'typographic',
      mark: 'FARM',
      lines: ['Inventory', 'Expenses', 'Pond testing', 'Marketplace'],
      tone: 'moss',
    },
    links: {},
    tier: 'grid',
    caseStudy: {
      statusNote:
        'In development. Screenshots, stack details and outcomes will be added when the product is ready to show.',
      overview:
        'Farm Inventory brings the records a working farm depends on into one product: what is in stock, what has been spent, the results of pond water tests, and a marketplace module for selling produce.',
      problem:
        'Inventory, spending and water-quality checks are separate jobs that are easy to keep in separate places. Keeping them together makes it possible to see one view of how the farm is running.',
      goals: [
        'Track inventory and stock movement',
        'Record expenses against farm operations',
        'Log pond water tests over time',
        'Offer produce through a marketplace module',
      ],
      contributions: ['Product scope and module design', 'Full-stack implementation of the modules listed above'],
      stack: [],
    },
  },
  {
    slug: 'levender-ai-assistant',
    title: 'Levender',
    kind: 'independent',
    category: 'AI assistant · RAG & agents',
    summary:
      'An AI assistant for an investment platform. A LangGraph agent decides, for each question, whether to look up live platform data or search a knowledge base of eligibility rules and regulatory documents.',
    role: 'AI & backend engineering',
    highlights: [
      'Custom LangGraph StateGraph that routes each query to the right tool',
      'RAG over regulatory documents with self-hosted Ollama embeddings and Chroma',
      'Verified eligibility data passed to the model as facts, so answers stay grounded',
    ],
    stack: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'Chroma', 'Ollama', 'Node.js'],
    status: 'Prototype',
    cover: {
      type: 'typographic',
      mark: 'RAG',
      lines: ['query → agent', 'agent → platform data', 'agent → knowledge base', 'facts → grounded answer'],
      tone: 'ink',
    },
    links: {},
    tier: 'grid',
    caseStudy: {
      overview:
        'Levender is an assistant that answers investor questions on an investment platform. Some questions need live account data, such as “am I eligible?” Others need the rules themselves, such as “what does this category mean?” The assistant decides which kind each question is and answers from verified sources.',
      problem:
        'A general-purpose model will confidently invent eligibility rules and account details. In a regulated product that is worse than giving no answer at all.',
      goals: [
        'Choose between live-data lookup and document search per question, without brittle if/else routing',
        'Answer regulatory questions from the platform’s own documents',
        'Never let the model guess a user’s eligibility status',
        'Run embeddings locally rather than sending documents to a third party',
      ],
      contributions: [
        'Built a LangGraph agent on a custom StateGraph (not the prebuilt helper) with two tools: platform-data lookup and knowledge-base search',
        'Built the RAG pipeline: chunking eligibility rules and regulatory documents, embedding them with self-hosted Ollama (nomic-embed-text), and storing them in Chroma',
        'Integrated with the existing Node.js/MongoDB platform so eligibility status and validation results are fetched first and passed in as authorised facts',
        'Exposed the assistant through FastAPI and tested it end to end with Postman',
      ],
      stack: [
        { group: 'AI', items: ['LangGraph', 'LangChain', 'Chroma', 'Ollama (nomic-embed-text)'] },
        { group: 'Service', items: ['Python', 'FastAPI'] },
        { group: 'Platform integration', items: ['Node.js', 'MongoDB'] },
      ],
      workflow: {
        title: 'Request path',
        steps: [
          { title: 'Ask', body: 'A user question reaches the FastAPI service together with the user’s context.' },
          { title: 'Fetch facts', body: 'Eligibility status and validation results come from the platform as authorised facts. The model never derives them itself.' },
          { title: 'Decide', body: 'The StateGraph agent chooses which tool to call: live platform data or knowledge-base search.' },
          { title: 'Answer', body: 'The response is built from the retrieved passages and the supplied facts.' },
        ],
      },
    },
  },
  {
    slug: 'cricketpulse',
    title: 'CricketPulse',
    kind: 'independent',
    category: 'Sports data platform',
    summary:
      'A mobile-first, SEO-first cricket platform with live scores, match centres, ball-by-ball data, scorecards and an editorial CMS. The data provider is a swappable adapter.',
    role: 'Full-stack development',
    highlights: [
      'Next.js App Router with server rendering for crawlable match pages',
      'Provider adapter with a deterministic mock feed, so it runs without a paid API',
      'MongoDB fallback and statistics when the live provider is unavailable',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Redis'],
    status: 'In development',
    cover: {
      type: 'typographic',
      mark: 'LIVE',
      lines: ['provider → adapter', 'adapter → cache', 'cache → match centre', 'fallback → MongoDB'],
      tone: 'signal',
    },
    links: {},
    tier: 'grid',
  },

  // ───────────────────────────── Professional work ─────────────────────────────
  {
    slug: 'opalus',
    title: 'Opalus',
    kind: 'professional',
    category: 'Fintech · EU-regulated crowdfunding',
    client: 'Client in Lithuania · via Brain Technosys',
    summary:
      'A real estate crowdfunding platform regulated under the EU’s ECSP framework. I built investor KYC/AML onboarding, financial-crime compliance modules and the state machine that governs project publication.',
    role: 'Full-stack engineer',
    highlights: [
      '8-step KYC/AML onboarding with the Sumsub WebSDK',
      'Provider-agnostic money-operations and compliance module',
      'Role-based project-publication state machine with field locking',
      'Fixed investor-list pagination drift across 100+ active projects',
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'React', 'Sumsub'],
    status: 'Delivered',
    period: '2025–2026',
    cover: {
      type: 'typographic',
      mark: 'KYC',
      lines: ['Identity · Sumsub WebSDK', 'Residency verification', 'Tax profiling', 'Investor categorisation', 'Knowledge assessment'],
      tone: 'signal',
    },
    links: {},
    tier: 'feature',
    caseStudy: {
      overview:
        'Opalus is a real estate crowdfunding platform operating under the EU’s European Crowdfunding Service Providers (ECSP) regulation. Before anyone can invest, they must be identified, categorised and assessed, and every project offered to them must pass review. I worked across the backend and front end on onboarding, compliance and project lifecycle features.',
      problem:
        'ECSP rules decide who may invest, in what, and after which checks. Those rules have to be enforced by the system itself, not left to good intentions. Payment and AML providers also change over a product’s life, and compliance code should not need rewriting when they do.',
      goals: [
        'An onboarding flow that collects and verifies everything ECSP requires before an investor can act',
        'Compliance and money operations that are not tied to one vendor',
        'A project lifecycle where only the right role can move a project forward, and locked fields stay locked',
        'Investor lists that stay correct at scale',
      ],
      contributions: [
        'Built the 8-step KYC/AML onboarding with the Sumsub WebSDK, covering residency verification, tax profiling, investor categorisation and knowledge assessments',
        'Designed the money-operations and financial-crime compliance module around a provider-agnostic adapter pattern, with providers switched through environment toggles rather than code changes',
        'Built the project-publication state machine: role-based transitions, conditional field locking and automated admin review',
        'Fixed pagination drift in investor lists across 100+ active projects by running the count and data aggregation pipelines in parallel with Promise.all',
        'Built the REST APIs behind project lifecycle, onboarding and KYC/AML compliance. Opalus is one of the 4+ real-world products and client projects I delivered at Brain Technosys',
      ],
      stack: [
        { group: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'State machines', 'RBAC'] },
        { group: 'Data', items: ['MongoDB aggregation pipelines', 'PostgreSQL'] },
        { group: 'Frontend', items: ['React'] },
        { group: 'Compliance', items: ['Sumsub WebSDK', 'KYC/AML', 'ECSP requirements'] },
      ],
      workflow: {
        title: 'What onboarding covers',
        intro: 'Each part of onboarding has to be completed and checked before the investor can move on.',
        steps: [
          { title: 'Identity', body: 'Identity verification through the embedded Sumsub WebSDK.' },
          { title: 'Residency', body: 'Residency verification for the investor’s jurisdiction.' },
          { title: 'Tax profile', body: 'Tax profiling collected as part of onboarding.' },
          { title: 'Category', body: 'Investor categorisation, which controls what the investor can access.' },
          { title: 'Knowledge', body: 'Knowledge assessments required under ECSP.' },
        ],
      },
      challenges: [
        {
          challenge: 'Payment and AML vendors can change, but compliance logic should not have to.',
          solution:
            'Compliance code talks to an adapter interface. Each provider implements it, and the active one is selected through environment toggles, so switching vendors means configuration, not a rewrite.',
        },
        {
          challenge: 'Investor lists showed totals that did not match the rows on the page.',
          solution:
            'The count and the page of data now come from two aggregation pipelines run in parallel with Promise.all over the same filter, so totals and rows stay in sync across 100+ active projects.',
        },
        {
          challenge: 'Some project fields must freeze once a project reaches a certain stage, but only for some roles.',
          solution:
            'A publication state machine defines which role can trigger each transition and which fields can still change in each state, with an automated admin review step.',
        },
      ],
    },
  },
  {
    slug: 'shift-work',
    title: 'Shift Work',
    kind: 'professional',
    category: 'Workforce & shift management',
    client: 'Client in Australia · via Brain Technosys',
    summary:
      'A workforce and shift-management platform with 1000+ users. I built backend services for scheduling, timers, payments and reporting, plus automated, tax-compliant invoicing.',
    role: 'Backend engineer',
    highlights: [
      '30+ REST APIs for scheduling, timers, payments and reporting',
      'Cron-based invoice generation with PDF rendering and Australian GST formatting, producing 500+ invoices a month',
      'Soft-delete data handling and OTP-verified account deletion',
    ],
    stack: ['Node.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'MongoDB'],
    status: 'Delivered',
    cover: {
      type: 'typographic',
      mark: 'SHIFT',
      lines: ['Scheduling', 'Timers', 'Payments', 'GST invoices · monthly cron'],
      tone: 'ink',
    },
    links: {},
    tier: 'feature',
  },
  {
    slug: 'hirra',
    title: 'Hirra',
    kind: 'professional',
    category: 'Hiring platform',
    client: 'Client project · via Brain Technosys',
    summary: 'Hiring workflows and APIs for subcontractor management, applicant tracking and job matching.',
    role: 'Backend engineer',
    highlights: ['Subcontractor management', 'Applicant tracking', 'Job matching APIs'],
    stack: ['Node.js', 'Express', 'MongoDB', 'React', 'Material UI'],
    status: 'Delivered',
    cover: { type: 'typographic', mark: 'HIRE', lines: ['Subcontractors', 'Applicants', 'Matching'], tone: 'bone' },
    links: {},
    tier: 'grid',
  },
  {
    slug: 'homiiconnect',
    title: 'HomiiConnect',
    kind: 'professional',
    category: 'Social commerce',
    client: 'Client project · via Brain Technosys',
    summary: 'Backend architecture and APIs for posts, videos, stories, communities, polls and a marketplace.',
    role: 'Backend engineer',
    highlights: ['Posts, videos & stories', 'Communities & polls', 'Marketplace'],
    stack: ['Next.js', 'Prisma', 'PostgreSQL'],
    status: 'Delivered',
    cover: { type: 'typographic', mark: 'FEED', lines: ['Posts · Videos · Stories', 'Communities · Polls', 'Marketplace'], tone: 'moss' },
    links: {},
    tier: 'grid',
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

export const caseStudies = projects.filter((p): p is Project & { caseStudy: NonNullable<Project['caseStudy']> } =>
  Boolean(p.caseStudy),
)

export const independentProjects = projects.filter((p) => p.kind === 'independent')
export const professionalProjects = projects.filter((p) => p.kind === 'professional')
