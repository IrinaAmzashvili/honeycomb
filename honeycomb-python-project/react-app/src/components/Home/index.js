import React from "react";
import styles from "../Home/Home.module.css";
import homeImg from "../../images/homeImg.png";
import homeBackground from "../../images/homeBackground.png";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const routeChange = () => {
    let path = `clubs`;
    history.push(path);
  };

  return (
    <div className={styles.mostOuterDiv}>
      <div className={styles.outerContainer}>
        <div className={styles.text}>
          <div className={styles.title}>Buzz on in!</div>
          <div className={styles.content}>
            Connect with the entire hive or create the buzz around your club.
          </div>
          <button
            type="submit"
            className={`cta_button ${styles.startButton}`}
            onClick={routeChange}
          >
            Get started!
          </button>
        </div>
        <div className={styles.picture}>
          <img className={styles.homeImg} src={homeImg} alt='Splash page illustration'></img>
        </div>
      </div>
      <img className={styles.homeBackground} src={homeBackground} alt=''></img>
    </div>
  );
};

export default Home;
