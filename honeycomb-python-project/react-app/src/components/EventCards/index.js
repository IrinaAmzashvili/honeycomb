import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../EventCards/EventCards.module.css'
import EditEventModal from '../EditEventModal'

const EventsCard = ({ event }) => {

    const newTime = new Date(event.date_and_time)

    return (
        <div className={styles.outerContainer}>
            <div className={styles.content}>
                <div className={styles.eventDate}>{newTime.toLocaleDateString()}{newTime.toLocaleTimeString()}</div>
                {/* <div className={styles.eventDate}>{event.date_and_time}</div> */}
                <div className={styles.eventLocation}>Location: {event.location}</div>
                <div className={styles.eventName}>{event.name}</div>
                <div className={styles.eventDescription}>{event.description}</div>
            </div>
            <div className={styles.buttonGroup}>
                {/* <button id={event.id} className={styles.editButton}>Edit Event</button> */}
                <EditEventModal eventId={event.id} className={styles.editButton} />
                <button className={styles.attendButton}>Attend</button>
            </div>
        </div>
    )



}

export default EventsCard
