import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEvent, deleteEvent } from "../../store/events";
import DatePicker from "react-datepicker";
import styles from "../../FormModal.module.css";

import "react-datepicker/dist/react-datepicker.css";

function EditEvent({ setShowModal, eventId }) {
  const dispatch = useDispatch();
  const events = useSelector((state) => Object.values(state.events));
  const event = events.filter((event) => event.id === eventId)[0];

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
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.club__form__div}>
        <form onSubmit={handleSubmit}>
          <div className={styles.club__heading_container}>
            <h1 className={styles.club__form__heading}>Edit Your Event</h1>
          </div>

          <ul className={styles.errors__container}>
            {errors.map((error, i) => (
              <li className={styles.errors} key={i}>
                {error}
              </li>
            ))}
          </ul>

          <div className={styles.club__label__container}>
            <label htmlFor='editEventName' className={styles.club__form__label}>Event Title</label>
          </div>
          <div>
            <input
              id='editEventName'
              className={styles.club__name}
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.club__label__container}>
            <label htmlFor='editLocation' className={styles.club__form__label}>Location</label>
          </div>

          <div>
            <input
              id='editLocation'
              className={styles.club__name}
              name="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className={styles.club__label__container}>
            <label htmlFor='editDate' className={styles.club__form__label}>Date and Time</label>
          </div>

          <div>
            <DatePicker
              id='editDate'
              className={(styles.calender_input, styles.club__name)}
              showTimeSelect
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              timeClassName={handleColor}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>

          <div className={styles.club__label__container}>
            <label htmlFor='editDescription' className={styles.club__form__label}>Description</label>
          </div>

          <div>
            <textarea
              id='editDescription'
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
