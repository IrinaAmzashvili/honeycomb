import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./NotFound.module.css";

const NotFound = () => (
  <div className={styles.outerContainer}>
    <h1>404 - Not Found!</h1>
    <Link to="/">
      Go Home
    </Link>
  </div>
);

export default NotFound;
