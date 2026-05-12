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
            Hallo, ik ben <span>Shakeel</span> <span>Ramdhiansing</span>
          </h1>

          <p className={styles.description}>
            Ik bouw moderne, snelle en gebruiksvriendelijke websites met een
            sterke focus op design, performance en animaties.
          </p>

          <div className={styles.buttons}>
            <button className={styles.primaryBtn}>Bekijk Projecten</button>
            <button className={styles.secondaryBtn}>Contact</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;