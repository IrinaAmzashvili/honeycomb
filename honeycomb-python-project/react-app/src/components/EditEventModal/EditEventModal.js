import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import { editEvent, getEvents, deleteEvent } from "../../store/events";
import DatePicker from "react-datepicker";
import styles from './EditEventModal.module.css';

import "react-datepicker/dist/react-datepicker.css";


function EditEvent({ setShowModal, eventId }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    // const history = useHistory();
    //  gets events
    //  useEffect(async () => {
    //     await dispatch(getEvents(id))
    // }, [dispatch, id])

    const events = useSelector(state => Object.values(state.events))
    // console.log("eventenenteeeeeeeeeeeee", eventId);
    const event = events.filter(event => event.id == eventId)[0]


    const [name, setName] = useState(event.name);
    const [description, setDescription] = useState(event.description);
    const [location, setLocation] = useState(event.location)
    const [startDate, setStartDate] = useState(new Date(event.date_and_time));

    const user = useSelector(state => state.session.user)




    let handleColor = (time) => {
        return time.getHours() > 12 ? "text-success" : "text-error";
    };


    const handleSubmit = (e) => {
        e.preventDefault();


        const newEvent = {
            name,
            description,
            date_and_time: startDate,
            location,
            host_id: user.id,
        }
        dispatch(editEvent(eventId, newEvent))
        setShowModal(false);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteEvent(eventId))
        // dispatch(getEvents(id))
        setShowModal(false);
    }

    return (

        <>
            <div className={styles.outerContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.club__heading_container}>
                        <h1 className={styles.club__form__heading}>Create An Event</h1>

                    <div className={styles.club__label__container}>
                        <label className={styles.club__form__label}>Event Title</label>
                    </div>
                    <div>
                        <input className={styles.club__name} name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>


                    <div className={styles.club__label__container}>
                        <label className={styles.club__form__label}>Location</label>
                    </div>

                    <div>
                        <input className={styles.club__name} name="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>

                    <div className={styles.club__label__container}>
                        <label className={styles.club__form__label}>Date and Time</label>
                    </div>

                    <div>
                        <DatePicker
                            className={styles.calender_input}
                            showTimeSelect
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            timeClassName={handleColor}
                            dateFormat="MMMM d, yyyy h:mm aa"

                        />
                    </div>

                    <div className={styles.club__label__container}>
                        <label className={styles.club__form__label}>Description</label>
                    </div>

                    <div>
                        <textarea className={styles.club__description} name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    </div>

                    <div>
                        <button className={styles.submit_button} type="submit">Submit Event</button>

                    </div>
                </form>
                <button className={styles.submit_button_delete} onClick={handleDelete}  type="submit">Delete Event</button>
            </div>
        </>
    )
}

export default EditEvent
