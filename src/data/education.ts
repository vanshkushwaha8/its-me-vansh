export type Education = {
  degree: string
  field: string
  institution: string
  location: string
  start: string
  end: string
  grade: string
}

/**
 * NOTE: the résumé lists CGPA 8.48/10; the portfolio brief said 8.18.
 * The résumé value is used. Correct `grade` here if needed.
 */
export const education: Education[] = [
  {
    degree: 'B.Tech',
    field: 'Computer Science and Engineering',
    institution: 'Centurion University of Technology and Management',
    location: 'Odisha, India',
    start: '2021',
    end: '2025',
    grade: 'CGPA 8.48 / 10',
  },
]

export const certifications = [
  { title: 'MERN Stack Web Development', issuer: 'CodeHelp' },
  { title: 'Problem Solving & Algorithms', issuer: 'TCAC' },
]

export const activities = ['Organised hackathons and tech workshops with 250+ participants']
