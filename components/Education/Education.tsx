// components/Education.tsx
import React from 'react';
import styles from './Education.module.css';

const Education = () => {
  const educationData = [
    {
      degree: 'Applicatie Ontwerper',
      institution: 'Natin-MBO ICT',
      date: '2019 - 2023',
      status: 'Afgerond',
    },
    {
      degree: 'Software Engineering',
      institution: 'Unasat-HBO',
      date: '2023 - heden',
      status: '3e jaar',
    },
  ];

  return (
    <section id='Educatie'>
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <div className={styles.line}></div>
        <h2>Education</h2>
      </div>

      <div className={styles.cardContainer}>
        {educationData.map((item, index) => (
          <div key={index} className={styles.card}>
            <span className={styles.status}>{item.status}</span>

            <h3 className={styles.degree}>{item.institution}</h3>

            <p className={styles.institution}>{item.degree}</p>

            <span className={styles.date}>{item.date}</span>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default Education;