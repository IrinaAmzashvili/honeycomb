import React from 'react';
import styles from '../Home1/Home1.module.css'
import homeImg from "../../images/homeImg.png"
import navBar1 from '../../images/navBar1.png';

const Home1 = () =>{
    return (
        <div className={styles.topDiv} >
        <div >
            <img className={styles.navBar} src={navBar1}></img>
        </div>
        <div className={styles.outerContainer}>
            <div className={styles.text}>
                <div className={styles.title}>Buzz on in!</div>
                <div className={styles.content}>Connect with the entire hive or create the buzz around your club.</div>
                <button className={styles.startButton}>Get started!</button>
            </div>
            <div className={styles.picture}>
                <img src={homeImg}></img>
            </div>
        </div>
        <div className={styles.bottomBar}></div>
        </div>
    )
}

export default Home1
