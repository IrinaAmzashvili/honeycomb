import React, {useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleClub, deleteClub } from '../../store/clubs';
import { postJoinClub } from '../../store/membership';
import styles from './IndividualClub.module.css'
const IndividualClub = () => {
    const {id} = useParams();
    const club = useSelector(state => state.clubs.singleClub)
    const dispatch = useDispatch()
    const history = useHistory()

    // const user = useSelector(state => state.session.user)
    // const member = club?.id // user.clubs.id is equal to club.id

    console.log('--->')
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteClub(id))
        // history.push('/clubs')
    }

    const handleMembership = (e) => {
        console.log('---> in handler')
        e.preventDefault()
        dispatch(postJoinClub(id))
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
                <button className={styles.joinClubButton} onClick={handleMembership}>Join Club</button>
            </div>
        </>
    )
}

export default IndividualClub;
