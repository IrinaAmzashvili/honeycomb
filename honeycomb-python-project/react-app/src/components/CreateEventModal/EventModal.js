import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postEvent } from "../../store/events";
import DatePicker from "react-datepicker";
import eventStyles from './EventModal.module.css';
import styles from '../../FormModal.module.css'

import "react-datepicker/dist/react-datepicker.css";

function CreateEvent({ setShowModal }) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const { id } = useParams();
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
      club_id: id,
    };
    const data = await dispatch(postEvent(id, newEvent));
    if (data.errors) {
      setErrors(data.errors);
      return;
    }
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
            <label htmlFor='name' className={styles.club__form__label}>Event Title</label>
          </div>
          <div>
            <input
              id='name'
              className={styles.club__name}
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.club__label__container}>
            <label htmlFor='location' className={styles.club__form__label}>Location</label>
          </div>

          <div>
            <input
              id='location'
              className={styles.club__name}
              name="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className={styles.club__label__container}>
            <label htmlFor='date' className={styles.club__form__label}>Date and Time</label>
          </div>

          <div className={eventStyles.calendar_div}>
            <DatePicker
              id='date'
              className={eventStyles.calendar_input}
              showTimeSelect
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              timeClassName={handleColor}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>

          <div className={styles.club__label__container}>
            <label htmlFor='description' className={styles.club__form__label}>Description</label>
          </div>

          <div>
            <textarea
              id='description'
              className={styles.club__description}
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.button__div}>
            <button className='cta_button' type="submit">
              Submit Event
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateEvent;
