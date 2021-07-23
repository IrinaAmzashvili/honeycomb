import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attendOneEvent, leaveOneEvent, getRsvps } from "../../store/rsvp";
import styles from "../EventCards/EventCards.module.css";
import EditEventModal from "../EditEventModal";

const EventsCard = ({ event, indx }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allRsvps = useSelector((state) => Object.values(state.rsvp));
  const rsvp = allRsvps.find((rsvp) => +rsvp?.id === +event?.id);
  const [attending, setAttending] = useState(event.rsvps.length);
  const newTime = new Date(event.date_and_time);


  useEffect(() => {
    dispatch(getRsvps());
  }, [dispatch]);

  const handleRsvp = (e) => {
    e.preventDefault();

    if (rsvp) {
      dispatch(leaveOneEvent(event.id));
      setAttending((event.rsvps.length -= 1));
    } else {
      dispatch(attendOneEvent(event.id));
      setAttending((event.rsvps.length += 1));
    }
  };

  return (
    <div key={indx} className={styles.outerContainer}>
      <div className={styles.content}>
        <div className={styles.eventDate}>
          {newTime.toLocaleDateString()}{" "}
          <span className={styles.timeStampMiddle}>at</span>{" "}
          {newTime.toLocaleTimeString()}
        </div>
        <div className={styles.eventRsvps}>
          There are{" "}
          {attending
            ? ` ${attending} members attending`
            : " no members attending"}
        </div>
        <div className={styles.eventLocation}>Location: {event.location}</div>
        <div className={styles.eventName}>{event.name}</div>
        <div className={styles.eventDescription}>{event.description}</div>
      </div>
      <div className={styles.buttonGroup}>
        {/* if user is host, display "edit event" button */}
        {sessionUser.id === event?.host_id && (
          <EditEventModal eventId={event.id} className={styles.editButton} />
        )}
        <button
          className={
            rsvp
              ? `cta_button_empty ${styles.attendButton}`
              : `cta_button ${styles.attendButton}`
          }
          onClick={handleRsvp}
        >
          {rsvp ? "Can't make it" : "Attend"}
        </button>
      </div>
    </div>
  );
};

export default EventsCard;
