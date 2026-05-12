// components/WorkExperience.tsx
import React from 'react';
import styles from './work.module.css';

const WorkExperience = () => {
  const workData = [
    {
      role: 'ICT Stagiarre',
      company: 'Anton de Kom Universiteit van Suriname',
      period: 'juni 2023 - aug 2023',
      description:
        'Assisted with IT infrastructure support, troubleshooting hardware and software issues, and providing technical assistance.',
    },
    {
      role: 'Marketing & Communicatie',
      company: 'Anton de Kom Universiteit van Suriname',
      period: 'sept 2023 - heden',
      description:
        'Responsible for digital marketing strategies, content creation and communication campaigns.',
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <div className={styles.line}></div>
        <h2>Work Experience</h2>
      </div>

      <div className={styles.cardContainer}>
        {workData.map((item, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.role}>{item.role}</h3>

            <p className={styles.company}>{item.company}</p>

            <span className={styles.period}>{item.period}</span>

            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;