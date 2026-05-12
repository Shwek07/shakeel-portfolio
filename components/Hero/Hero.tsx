// components/Hero.tsx
import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero} id='home'>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        {/* LEFT SIDE - IMAGE */}
        <div className={styles.imageWrapper}>
          <img
            src="/images/me.png"
            alt="Shakeel"
            className={styles.profileImage}
          />
        </div>

        {/* RIGHT SIDE - TEXT */}
        <div className={styles.content}>
          <p className={styles.subtitle}>Software Developer</p>

          <h1 className={styles.heading}>
            Hi, I'm <span>Shakeel</span> <span>Ramdhiansing</span>
          </h1>

          <p className={styles.description}>
            I build modern, fast, and user-friendly websites with a strong focus on design, performance, and animations.
          </p>

          <div className={styles.buttons}>
            <button className={styles.primaryBtn}><a href="#projects">Check Projects</a></button>
            <button className={styles.secondaryBtn}><a href="#contact">Contact</a></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;