import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClubs } from "../../store/clubs";
import { Link, useParams } from 'react-router-dom';
import { getSingleClub } from '../../store/clubs';
import styles from './ClubsPage.module.css';
import ClubModal from '../CreateClubModal'

const ClubsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();


  useEffect(async () => {
    await dispatch(getClubs())
  }, [dispatch])

  useEffect(async () => {
    await dispatch(getSingleClub(id))
  }, [dispatch])

  const clubs = useSelector(state => Object.values(state.clubs))



  return (
    <>
      {clubs.map((club) => (
        <Link key={club?.id} className={styles.club__name__link} to={`/clubs/${club?.id}`}>
          <p>{club?.name}</p>
        </Link>
      ))}



      <ClubModal/>
    </>

  )
}

export default ClubsPage;
