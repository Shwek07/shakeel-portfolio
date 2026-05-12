// components/ExperienceSection.tsx
import React from 'react';
import Education from '@/components/Education/Education';
import WorkExperience from '@/components/WorkExperience/WorkExperience';
import styles from './ExperienceSection.module.css';

const ExperienceSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <div className={styles.column}>
          <Education />
        </div>

        <div className={styles.column}>
          <WorkExperience />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;