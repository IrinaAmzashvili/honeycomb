import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getClubs } from "../../store/clubs";
import styles from '../ClubsCard/ClubsCard.module.css'
import { Link } from 'react-router-dom';

const ClubsCard = ({club}) => {
  // const dispatch = useDispatch();

  // useEffect(async() => {
  //   await dispatch(getClubs())
  // }, [dispatch])

  // const clubs = useSelector(state => Object.values(state.clubs))

  return (
    <div className={styles.ClubsCardDiv}>

        <img className={styles.ClubsCardImg} src={club.img_url}></img>

        <div className={styles.ClubsCardContent}>
          <Link key={club?.id} className={styles.clubName} to={`/clubs/${club?.id}`}>{club.name}</Link>
          <div className={styles.clubDescription}>{club.description}</div>
        </div>
    </div>
  )
}

export default ClubsCard;
