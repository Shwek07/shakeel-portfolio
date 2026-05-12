// components/Contact.tsx
import React from 'react';
import styles from './contact.module.css';

const Contact = () => {
  const phoneNumber = '+5978685952';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}`;

  return (
    <section className={styles.contactSection}>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        {/* LEFT SIDE */}
        <div className={styles.left}>
          <div className={styles.headingWrapper}>
            <div className={styles.line}></div>
            <h2>Contact Me</h2>
          </div>

          <h1 className={styles.title}>
            Let’s build something
            <span> amazing together.</span>
          </h1>

          <p className={styles.description}>
            Heb je een project, business idee of wil je samenwerken?
            Neem gerust contact met mij op via WhatsApp of e-mail.
          </p>

          <div className={styles.contactInfo}>
            
            <div className={styles.contactCard}>
              <div className={styles.icon}>📞</div>

              <div>
                <h3>Phone</h3>
                <p>+597 868-5952</p>
              </div>
            </div>

            
            <div className={styles.contactCard}>
              <div className={styles.icon}>🌐</div>

              <div>
                <h3>WhatsApp</h3>
                <p>+597 868-5952</p>
              </div>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.icon}>✉️</div>

              <div>
                <h3>Email</h3>
                <p>shakeelramdhiansing@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <div className={styles.imageContainer}>
            <img
              src="/projects/contact.png"
              alt="Workspace"
              className={styles.contactImage}
            />
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default Contact;