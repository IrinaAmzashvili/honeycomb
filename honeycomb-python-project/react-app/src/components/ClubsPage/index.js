import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getClubs } from "../../store/clubs";
import { Link } from 'react-router-dom';
import styles from './ClubsPage.module.css';

const ClubsPage = () => {
  const dispatch = useDispatch();

  useEffect(async() => {
    await dispatch(getClubs())
  }, [dispatch])

  const clubs = useSelector(state => Object.values(state.clubs))

  return (
    <div>
      {clubs.map((club) => (
        <Link className={styles.club__name__link} to="/club/:id">
          <p>{club.name}</p>
        </Link>
      ))}
    </div>
  )
}

export default ClubsPage;
