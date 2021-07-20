import React, {useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleClub, deleteClub } from '../../store/clubs';
import styles from './IndividualClub.module.css'
const IndividualClub = () => {
    const {id} = useParams();
    const club = useSelector(state => state.clubs.singleClub)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = (e) => {
        e.preventDefault();
        console.log('---> in delete handler')
        dispatch(deleteClub(id))
        // history.push('/clubs')
    }

    useEffect(() => {
        dispatch(getSingleClub(parseInt(id)))
    }, [dispatch, id])

    return (
        <>
            <div className={styles.clubInfoContainer}>
                <p className={styles.clubName}>{club?.name}</p>
                <p className={styles.clubDescription}>{club?.description}</p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>
            </div>
        </>
    )
}

export default IndividualClub;
