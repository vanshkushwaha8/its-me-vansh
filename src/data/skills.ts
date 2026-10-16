export type SkillGroup = { id: string; title: string; note: string; items: string[] }

/** Only technologies listed on the current résumé and used in shipped work. */
export const skills: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend',
    note: 'Where most of my production work lives.',
    items: ['Node.js', 'Express.js', 'TypeScript', 'REST API design', 'Authentication & RBAC', 'State machines', 'Cron jobs', 'Swagger / OpenAPI', 'FastAPI'],
  },
  {
    id: 'data',
    title: 'Databases',
    note: 'Schema design first, query tuning second.',
    items: ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'Aggregation pipelines', 'Schema design', 'Query optimisation'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    note: 'Interfaces for the systems I build.',
    items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Redux', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    id: 'ai',
    title: 'AI & LLM',
    note: 'Grounded assistants, not demos.',
    items: ['LangGraph', 'LangChain', 'RAG', 'Chroma', 'Ollama', 'Python'],
  },
  {
    id: 'domain',
    title: 'Domain & tools',
    note: 'Regulated workflows and the tooling around them.',
    items: ['KYC/AML compliance', 'Sumsub WebSDK', 'Payment integrations', 'Git & GitHub', 'Postman', 'pgAdmin', 'MongoDB Compass'],
  },
]
