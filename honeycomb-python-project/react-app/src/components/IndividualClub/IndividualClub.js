import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleClub } from '../../store/clubs';
import styles from './IndividualClub.module.css'
const IndividualClub = () => {
    const {id} = useParams();
    const club = useSelector(state => state.clubs.singleClub)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSingleClub(parseInt(id)))
    }, [dispatch, id])
    console.log('wowza', club)
    return (
        <>
            <div className={styles.clubInfoContainer}>
                <p className={styles.clubName}>{club?.name}</p>
                <p className={styles.clubDescription}>{club?.description}</p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}>Delete</button>
            </div>
        </>
    )
}

export default IndividualClub;
