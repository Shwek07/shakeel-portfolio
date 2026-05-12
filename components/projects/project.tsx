// components/Projects.tsx
import React from 'react';
import styles from './project.module.css';

const Projects = () => {
  const projectsData = [
    {
      title: 'AutoBot',
      image: '/projects/autobot.png',
      url: 'https://autobot-unasat.vercel.app/',
      description:
        'Auto parts platform with AI chatbot, reservations, Google OAuth and scalable Next.js architecture.',
    },
    {
      title: 'SharpEdge Visuals',
      image: '/projects/sharpedge.png',
      url: 'https://597-sharpedge-visuals.vercel.app/',
      description:
        'Modern photography business website with booking functionality and premium branding.',
    },
    {
      title: 'Sranan Kapper',
      image: '/projects/sranangkapper.png',
      url: 'https://sranankapper.vercel.app/',
      description:
        'Online barber booking platform with service overview and shop discovery.',
    },
    {
      title: 'BookFlow SU',
      image: '/projects/bookflow.png',
      url: 'https://bookflow-su.vercel.app/',
      description:
        'Universal booking platform landing page for salons, barbers and service businesses.',
    },
  ];

  return (
    <section className={styles.projectsSection}>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <div className={styles.line}></div>
          <h2>Projects</h2>
        </div>

        <div className={styles.projectGrid}>
          {projectsData.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.projectImage}
                />
              </div>

              <div className={styles.projectContent}>
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveButton}
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;