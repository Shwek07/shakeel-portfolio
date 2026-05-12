// components/WorkExperience.tsx
import React from 'react';
import styles from './work.module.css';

const WorkExperience = () => {
  const workData = [
    {
      role: 'ICT Intern',
      company: 'Anton de Kom University of Suriname',
      period: 'juni 2023 - aug 2023',
      description:
        'During my internship at the Anton de Kom University of Suriname (AdeKUS), I contributed to the development of a document approval system. This system was developed to digitize and make more efficient the manual process of managing and approving purchase receipts.',
    },
    {
      role: 'Marketing & Communicatie',
      company: 'Anton de Kom University of Suriname',
      period: 'sept 2023 - heden',
      description:
        'As a graphic designer, I work on designing flyers, logos and other visual materials for various purposes. This experience has further enhanced my creativity, eye for detail, and sense of user-centered design.',
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