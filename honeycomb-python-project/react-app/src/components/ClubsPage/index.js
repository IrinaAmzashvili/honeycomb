import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getClubs } from "../../store/clubs";

const ClubsPage = () => {
  const dispatch = useDispatch();

  useEffect(async() => {
    await dispatch(getClubs())
  }, [dispatch])

  const clubs = useSelector(state => Object.values(state.clubs))

  return (
    <div>
      {clubs.map((club) => (
        <div>{club.name}</div>
      ))}
    </div>
  )
}

export default ClubsPage;
