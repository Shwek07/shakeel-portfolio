// components/Skills.tsx
import React from 'react';
import styles from './skills.module.css';

const Skills = () => {
  const skillsData = [
    { name: 'Next.js', percent: 75 },
    { name: 'UX/UI Design', percent: 90 },
    { name: 'SQL / MySQL', percent: 70 },
    { name: 'GitHub', percent: 80 },
    { name: 'Java', percent: 55 },
    { name: 'HTML & CSS', percent: 70 },
  ];

  return (
    <section id='skills' className={styles.skillsSection}>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <div className={styles.line}></div>
          <h2>Vaardigheden</h2>
        </div>

        <div className={styles.skillsGrid}>
          {skillsData.map((skill, index) => (
            <div key={index} className={styles.skillCard}>
              <div className={styles.skillTop}>
                <h3>{skill.name}</h3>
                <span>{skill.percent}%</span>
              </div>

              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${skill.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;