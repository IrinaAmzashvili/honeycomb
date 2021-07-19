import React from 'react';
import styles from '../Home2/Home2.module.css'
import homeImg2 from "../../images/homeImg2.png"
import homeBackground from "../../images/homeBackground.png"
import navBar2 from '../../images/navBar2.png';

const Home2 = () =>{
    return (
        <div>
            <div className={styles.topDiv} >
                <img className={styles.navBar} src={navBar2}></img>
            </div>
            <div className={styles.outerContainer}>
                <div className={styles.topBar} ></div>
                <img className={styles.homeBackground} src={homeBackground}></img>
                <div className={styles.text}>
                    <div className={styles.title}>Buzz on in!</div>
                    <div className={styles.content}>Connect with the entire hive or create the buzz around your club.</div>
                    <button className={styles.startButton}>Get started!</button>
                </div>
                <div className={styles.picture}>
                    <img src={homeImg2}></img>
                </div>

            </div>
            <div className={styles.bottomBar}></div>
        </div>
    )
}

export default Home2
