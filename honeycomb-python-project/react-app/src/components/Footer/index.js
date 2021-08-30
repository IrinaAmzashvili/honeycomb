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

          <div className={styles.names}>
            <div className={styles.left}>
              <div className={styles.programer_container}>
                <div className={styles.icon_container} onClick={() => window.open("https://github.com/Machaelmus", "_blank")}>
                  <i className={`${styles.link_icon} fab fa-github fa-2x`}></i>
                </div>
                <div className={styles.icon_container} onClick={() => window.open("https://www.linkedin.com/in/michael-tufo-6b0386171/", "_blank")}>
                  <i className={`${styles.link_icon} fab fa-linkedin fa-2x`}></i>
                </div>
                <div className={styles.name}>Michael Tufo</div>
              </div>

              <div className={styles.programer_container}>
                <div className={styles.icon_container} onClick={() => window.open("https://github.com/IrinaAmzashvili", "_blank")}>
                  <i className={`${styles.link_icon} fab fa-github fa-2x`}></i>
                </div>
                <div className={styles.icon_container} onClick={() => window.open("https://www.linkedin.com/in/irina-amzashvili-683136211/", "_blank")}>
                  <i className={`${styles.link_icon} fab fa-linkedin fa-2x`}></i>
                </div>
                <div className={styles.name}>Irina Amzashvili</div>
              </div>
            </div>


            <div className={styles.right}>
              <div className={styles.programer_container}>
                <div className={styles.icon_container} onClick={() => window.open("https://github.com/JanaeCui", "_blank")}>
                  <i className={`${styles.link_icon} fab fa-github fa-2x`}></i>
                </div>
                <div className={styles.icon_container} onClick={() => window.open("https://www.linkedin.com/in/cuijiajanae/", "_blank")}>
                  <i className={`${styles.link_icon} fab fa-linkedin fa-2x`}></i>
                </div>
                <div className={styles.name}>Jia Cui</div>
              </div>

              <div className={styles.programer_container}>
                <div className={styles.icon_container} onClick={() => window.open("https://github.com/tswieser", "_blank")}>
                  <i className={`${styles.link_icon} fab fa-github fa-2x`}></i>
                </div>
                <div className={styles.icon_container} onClick={() => window.open("https://www.linkedin.com/in/timothy-wieser-722b86215/", "_blank")}>
                  <i className={`${styles.link_icon} fab fa-linkedin fa-2x`}></i>
                </div>
                <div className={styles.name}>Timothy Wieser</div>
              </div>
            </div>
          </div>

      </footer >
    </>
  );
}

export default Footer;
