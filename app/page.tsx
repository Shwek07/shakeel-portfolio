// app/page.tsx
import React from 'react';
import Hero from '@/components/Hero/Hero';
import Skills from '@/components/skills/skills';
import Projects from '@/components/projects/project';
import Contact from '@/components/contact/Contact';
import ExperienceSection from '@/components/ExperienceSection/ExperienceSection';

export default function Home() {
  return (
    <main className="container">
      <Hero />
      <ExperienceSection />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}