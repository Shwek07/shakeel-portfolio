// components/Contact.tsx
import React from 'react';
import styles from './contact.module.css';

const Contact = () => {
  const phoneNumber = '+5978685952';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}`;

  return (
    <section id='contact' className={styles.contactSection}>
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
            Do you have a project, a business idea, or would you like to collaborate? Feel free to contact me via WhatsApp or email.
          </p>

          <div className={styles.contactInfo}>

            {/* PHONE */}
            <a
              href="tel:+5978685952"
              className={styles.contactCard}
            >
              <div className={styles.icon}>📞</div>

              <div>
                <h3>Phone</h3>
                <p>+597 868-5952</p>
              </div>
            </a>

            {/* WHATSAPP */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactCard}
            >
              <div className={styles.icon}>🌐</div>

              <div>
                <h3>WhatsApp</h3>
                <p>+597 868-5952</p>
              </div>
            </a>

            {/* EMAIL */}
            <a
              href="mailto:shakeelramdhiansing@gmail.com"
              className={styles.contactCard}
            >
              <div className={styles.icon}>✉️</div>

              <div>
                <h3>Email</h3>
                <p>shakeelramdhiansing@gmail.com</p>
              </div>
            </a>

        
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