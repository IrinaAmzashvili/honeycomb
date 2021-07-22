import React from "react";
import styles from "./Footer.module.css";
import { useSelector } from "react-redux";
function Footer() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <footer
        className={
          sessionUser ? styles.footer_container : styles.footer_container_active
        }
      >
        <div className={styles.github_links}>
          <div className={styles.icon_container}>
            <i className={`${styles.icon} fab fa-github fa-2x`}></i>
          </div>
          <div className={styles.git_names}>
            <div className={styles.left}>
              <a
                style={{ textDecoration: "none" }}
                href="https://github.com/Machaelmus"
              >
                <div className={styles.name}>Michael Tufo</div>
              </a>
              <a
                style={{ textDecoration: "none" }}
                href="https://github.com/IrinaAmzashvili"
              >
                <div className={styles.name}>Irina Amzashvili</div>
              </a>
            </div>
            <div className={styles.right}>
              <a
                style={{ textDecoration: "none" }}
                href="https://github.com/JanaeCui"
              >
                <div className={styles.name}>Jia Cui</div>
              </a>
              <a
                style={{ textDecoration: "none" }}
                href="https://github.com/tswieser"
              >
                <div className={styles.name}>Timothy Wieser</div>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.linkedin}>
          <div className={styles.icon_container}>
            <i className={`${styles.icon} fab fa-linkedin fa-2x`}></i>
          </div>
          <div className={styles.linkedin_names}>
            <div className={styles.left}>
              <a
                style={{ textDecoration: "none" }}
                href="https://www.linkedin.com/in/michael-tufo-6b0386171/"
              >
                <div className={styles.name}>Michael Tufo</div>
              </a>
              <a
                style={{ textDecoration: "none" }}
                href="https://www.linkedin.com/in/irina-amzashvili-683136211/"
              >
                <div className={styles.name}>Irina Amzashvili</div>
              </a>
            </div>
            <div className={styles.right}>
              <a
                style={{ textDecoration: "none" }}
                href="https://www.linkedin.com/in/cuijiajanae/"
              >
                <div className={styles.name}>Jia Cui</div>
              </a>
              <a
                style={{ textDecoration: "none" }}
                href="https://www.linkedin.com/in/timothy-wieser-722b86215/"
              >
                <div className={styles.name}>Timothy Wieser</div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
