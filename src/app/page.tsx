import { Hero } from '@/components/hero/Hero'
import { About } from '@/components/sections/About'
import { Approach } from '@/components/sections/Approach'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { FocusBand } from '@/components/sections/FocusBand'
import { Intro } from '@/components/sections/Intro'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Skills } from '@/components/sections/Skills'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FocusBand />
      <Intro />
      <SelectedWork />
      <Approach />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </>
  )
}
