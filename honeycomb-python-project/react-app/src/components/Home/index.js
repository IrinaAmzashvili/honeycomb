import React from 'react';
import styles from '../Home/Home.module.css'
import homeImg from "../../images/homeImg.png"
import homeBackground from "../../images/homeBackground.png"
import { useHistory } from "react-router-dom";



const Home = () => {

    const history = useHistory();
    const routeChange = () =>{
        console.log("onclick");
        let path = `clubs`;
        history.push(path);
    }
    // return (
    //     <div>
    //         <div className={styles.outerContainer} >
    //             <div className={styles.topBar} ></div>
    //             <img className={styles.homeBackground} src={homeBackground}></img>
    //             <div className={styles.text} >
    //                 <div className={styles.title} >Buzz on in!</div>
    //                 <div className={styles.content}>Connect with the entire hive or create the buzz around your club.</div>
    //                 <button type="submit" className={styles.startButton} onClick={routeChange} >Get started!</button>
    //             </div>
    //             <div className={styles.picture}>
    //                 <img src={homeImg}></img>
    //             </div>
    //         </div>
    //     </div>
    // )
    return (
        <div className={styles.mostOuterDiv}>
            <div className={styles.outerContainer} >
                <div className={styles.topBar} ></div>
                <div className={styles.text} >
                    <div className={styles.title} >Buzz on in!</div>
                    <div className={styles.content}>Connect with the entire hive or create the buzz around your club.</div>
                    <button type="submit" className={styles.startButton} onClick={routeChange} >Get started!</button>
                </div>
                <div className={styles.picture}>
                    <img src={homeImg}></img>
                </div>
            </div>
            <img className={styles.homeBackground} src={homeBackground}></img>
        </div>
    )}

export default Home
