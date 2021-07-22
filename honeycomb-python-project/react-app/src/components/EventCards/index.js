import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../EventCards/EventCards.module.css'


const EventsCard = ({ event, indx }) => {
    const [attending, setAttending] = useState(false);
    // console.log('Find the event members through this console log',event)
    // const getRsvps = () => {
    //     return event.rsvps.length;
    // }
    const newTime = new Date(event.date_and_time)

    return (
        <div key={indx} className={styles.outerContainer}>
            <div className={styles.content}>
                <div className={styles.eventDate}>{newTime.toLocaleDateString()}{newTime.toLocaleTimeString()}</div>
                {/* <div className={styles.eventDate}>{event.date_and_time}</div> */}
                <div className={styles.eventRsvps}>There are {!event.rsvps.length <= 0 ? ` ${event.rsvps.length} members attending` : ' no members attending'}</div>
                <div className={styles.eventLocation}>Location: {event.location}</div>
                <div className={styles.eventName}>{event.name}</div>
                <div className={styles.eventDescription}>{event.description}</div>
            </div>
            <div className={styles.buttonGroup}>
                <button className={styles.editButton}>Edit Event</button>
                <button className={styles.attendButton}>Attend</button>
            </div>
        </div>
    )

}

export default EventsCard
