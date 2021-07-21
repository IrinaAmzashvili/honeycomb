import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleClub } from '../../store/clubs';
import styles from './IndividualClub.module.css'
import { getEvents } from '../../store/events';
import EventsCard from '../EventCards'
import EventModal from '../CreateEventModal'


const IndividualClub = () => {
    const sessionUser = useSelector(state => state.session.user)
    const { id } = useParams();
    const club = useSelector(state => state.clubs.singleClub)
    // const club = useSelector(state => state.club)
    const dispatch = useDispatch()


    // ---------------------------------------Individual Club----------------------
    useEffect(() => {
        dispatch(getSingleClub(parseInt(id)))
    }, [dispatch, id])

    // ---------------------------------------events----------------------
    useEffect(async () => {
        await dispatch(getEvents(id))
    }, [dispatch, id])

    const events = useSelector(state => Object.values(state.events))


    return (
        <>
            <div className={styles.redCrossBar}>

            </div>
            <div className={styles.clubInfoContainer}>
                <div class={styles.container}>
                    <div class={styles.image}>
                        <img className={styles.clubImage} src={club?.img_url} />
                    </div>
                    <div class={styles.clubinfo}>
                        <p className={styles.clubName}>{club?.name}</p>
                        <button className={styles.joinButton}>Join club</button>
                        <p>Organized by (name here)</p>
                        <p className={styles.clubDescription}>{club?.description}</p>
                        {sessionUser.id === club?.host_id &&
                            <div>
                                <button className={styles.editButton}>Edit</button>
                                <button className={styles.deleteButton}>Delete</button>
                            </div>}
                    </div>
                </div>

            </div>
            <EventModal />
            <div>
                {events.map((event) => (
                    <EventsCard event={event} />
                ))}
            </div>

        </>
    )
}

export default IndividualClub;
