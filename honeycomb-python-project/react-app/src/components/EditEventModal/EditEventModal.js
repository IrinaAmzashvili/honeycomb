import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editEvent, getEvents, deleteEvent } from "../../store/events";
import DatePicker from "react-datepicker";
// import styles from "./EditEventModal.module.css";
import styles from "../../FormModal.module.css";

import "react-datepicker/dist/react-datepicker.css";

function EditEvent({ setShowModal, eventId }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const history = useHistory();
  //  gets events
  //  useEffect(async () => {
  //     await dispatch(getEvents(id))
  // }, [dispatch, id])

  const events = useSelector((state) => Object.values(state.events));
  const event = events.filter((event) => event.id == eventId)[0];

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [startDate, setStartDate] = useState(new Date(event.date_and_time));

  const user = useSelector((state) => state.session.user);

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      name,
      description,
      date_and_time: startDate,
      location,
      host_id: user.id,
    };
    const data = await dispatch(editEvent(eventId, newEvent));
    if (data.errors) {
      setErrors(data.errors);
      return;
    }
    setShowModal(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteEvent(eventId));
    // dispatch(getEvents(id))
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.club__form__div}>
        <form onSubmit={handleSubmit}>
          <div className={styles.club__heading_container}>
            <h1 className={styles.club__form__heading}>Create An Event</h1>
          </div>

          <ul className={styles.errors__container}>
            {errors.map((error, i) => (
              <li className={styles.errors} key={i}>
                {error}
              </li>
            ))}
          </ul>

          <div className={styles.club__label__container}>
            <label className={styles.club__form__label}>Event Title</label>
          </div>
          <div>
            <input
              className={styles.club__name}
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.club__label__container}>
            <label className={styles.club__form__label}>Location</label>
          </div>

          <div>
            <input
              className={styles.club__name}
              name="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className={styles.club__label__container}>
            <label className={styles.club__form__label}>Date and Time</label>
          </div>

          <div>
            <DatePicker
              className={(styles.calender_input, styles.club__name)}
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
            <textarea
              className={styles.club__description}
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.button__div}>
            <button
              className={`${styles.submit_button} cta_button`}
              type="submit"
            >
              Submit Event
            </button>
            <button
              className={`${styles.deleteButton} cta_button_danger`}
              onClick={handleDelete}
            >
              Delete Event
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditEvent;
