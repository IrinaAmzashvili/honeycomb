import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css'


function Footer() {

    return (
        <>
            <div className={styles.footer_container}>
                <div className={styles.github_links}>

                    <div className={styles.icon_container}>
                        <i className="fab fa-github fa-2x"></i>
                        {/* <i className={`fab fa-github fa-2x ${styles.hubIcon}`}></i> */}
                    </div>

                    <div className={styles.git_names}>
                        <div className={styles.left}>
                            <a style={{ textDecoration: 'none' }} href="https://github.com/Machaelmus"><div className={styles.name}>Michael Tufo</div></a>
                            <a style={{ textDecoration: 'none' }} href="https://github.com/IrinaAmzashvili"><div className={styles.name}>Irina Amzashvili</div></a>
                        </div>
                        <div className={styles.right}>
                            <a style={{ textDecoration: 'none' }} href="https://github.com/JanaeCui"><div className={styles.name}>Jia Cui</div></a>
                            <a style={{ textDecoration: 'none' }} href="https://github.com/tswieser"><div className={styles.name}>Timothy Wieser</div></a>
                        </div>

                    </div>
                </div>

                <div className={styles.linkedin}>

                    <div className={styles.icon_container}>
                        <i className="fab fa-linkedin fa-2x"></i>
                    </div>

                    <div className={styles.linkedin_names}>
                        <div className={styles.left}>
                            <a style={{ textDecoration: 'none' }} href="https://www.linkedin.com/in/michael-tufo-6b0386171/"><div className={styles.name}>Michael Tufo</div></a>
                            <a style={{ textDecoration: 'none' }} href="https://www.linkedin.com/in/irina-amzashvili-683136211/"><div className={styles.name}>Irina Amzashvili</div></a>
                        </div>
                        <div className={styles.right}>
                            <a style={{ textDecoration: 'none' }} href="https://www.linkedin.com/in/cuijiajanae/"><div className={styles.name}>Jia Cui</div></a>
                            <a style={{ textDecoration: 'none' }} href="https://www.linkedin.com/in/timothy-wieser-722b86215/"><div className={styles.name}>Timothy Wieser</div></a>
                        </div>
                    </div>

                </div>


            </div >
        </>
    )
}

export default Footer
