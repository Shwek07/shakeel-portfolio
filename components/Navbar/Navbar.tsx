'use client';

import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* LOGO */}
        <div className={styles.logo}>
          Portfolio website<span>.</span>
        </div>

        {/* DESKTOP MENU */}
        <nav className={styles.navLinks}>
          <a href="#home">Home</a>
          <a href="#Educatie">Educatie</a>
          <a href="#Ervaring">Ervaring</a>
          <a href="#Vaardigheden">Vaardigheden</a>
          <a href="#projects">Projecten</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.active : ''
        }`}
      >
        <a href="#home" onClick={() => setMenuOpen(false)}>
          Home
        </a>

        <a href="#Educatie" onClick={() => setMenuOpen(false)}>
          Educatie
        </a>
        <a href="#Ervaring" onClick={() => setMenuOpen(false)}>
          Ervaring
        </a>
        <a href="#Vaardigheden" onClick={() => setMenuOpen(false)}>
          Vaardigheden
        </a>
        <a href="#projects" onClick={() => setMenuOpen(false)}>
          Projecten
        </a>

        <a href="#contact" onClick={() => setMenuOpen(false)}>
          Contact
        </a>
      </div>
    </header>
  );
};

export default Navbar;