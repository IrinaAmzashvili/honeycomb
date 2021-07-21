import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleClub, deleteClub } from "../../store/clubs";
import { getMemberships, joinClub, leaveClub } from "../../store/membership";
import { getEvents } from '../../store/events';
import EventsCard from '../EventCards'
import EventModal from '../CreateEventModal'
import styles from "./IndividualClub.module.css";
import '@zach.codes/react-calendar/dist/calendar-tailwind-no-reset.css';
import { format } from "date-fns";

import {
  MonthlyBody,
  MonthlyCalendar,
  MonthlyNav,
  MonthlyDay,
  DefaultMonthlyEventItem,
} from '@zach.codes/react-calendar';

const subHours = (date, hour) => {
  return date.setHours(date.getHours() - hour);
}

const IndividualClub = () => {
  const { id } = useParams();
  const club = useSelector((state) => state.clubs.singleClub);
  const sessionUser = useSelector((state) => state.session.user);
  const memberships = useSelector((state) => Object.values(state.memberships));
  const member = memberships.find((joinedClub) => joinedClub?.id === +id);
  const dispatch = useDispatch();
  const history = useHistory();

  // get all memberships
  useEffect(() => {
    dispatch(getMemberships(sessionUser.id));
  }, [dispatch]);

  // join/leave club
  const handleMembership = (e) => {
    e.preventDefault();
    // if user is a member, leave club on click, else join club on click
    if (member) {
      dispatch(leaveClub(id));
      // setMemberStatus(false)
    } else {
      dispatch(joinClub(id));
      // setMemberStatus(true)
    }
  };


  // gets events
  useEffect(async () => {
    await dispatch(getEvents(id))
  }, [dispatch, id])

  const events = useSelector(state => Object.values(state.events))

  // delete club
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteClub(id));
    // if successfully deleted, redirect
    if (res["message"]) {
      history.push("/clubs");
    }
  };

  useEffect(() => {
    dispatch(getSingleClub(parseInt(id)));
  }, [dispatch, id]);


  // ---------------------------------------calender----------------------
  let [currentMonth, setCurrentMonth] = useState(
    new Date()
  );


  const calendarEvents = () => {
      let list = []
      for (const event of events) {
          let obj = {}
          obj["title"] = event.name
          obj["date"] = new Date(event.date_and_time)
          list.push(obj)
      }
      return list

  }

  return (
    <div>
      <div className={styles.redCrossBar}></div>
      <div className={styles.clubInfoContainer}>
        <div class={styles.container}>
          <div class={styles.image}>
            <img className={styles.clubImage} src={club?.img_url} />
          </div>
          <div class={styles.clubinfo}>
            <p className={styles.clubName}>{club?.name}</p>
            <button className={styles.joinButton} onClick={handleMembership}>
              {member ? "Leave Club" : "Join Club"}
            </button>
            <p>Organized by (name here)</p>
            <p className={styles.clubDescription}>{club?.description}</p>
            {sessionUser.id === club?.host_id && (
              <div>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton} onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <EventModal />
      <div className={styles.eventsAndCalender}>
                <div className={styles.eventCardsContainer}>
                    {events.map((event) => (
                        <EventsCard event={event} />
                    ))}
                </div>
                <div className={styles.calenderContainer}>
                    <MonthlyCalendar
                        className={styles.monthlyCalender}
                        currentMonth={currentMonth}
                        onCurrentMonthChange={date => setCurrentMonth(date)}
                    >
                        <MonthlyNav />
                        <MonthlyBody
                            // events={[
                            //     { title: 'Call John', date: subHours(new Date(), 2) },
                            //     { title: 'Call John', date: subHours(new Date(), 1) },
                            //     { title: 'Meeting with Bob', date: new Date() },
                            // ]}
                            events={
                                calendarEvents()
                            }
                        >
                        <MonthlyDay className={styles.monthlyDay}
                            renderDay={data =>
                                data.map((item, index) => (
                                <DefaultMonthlyEventItem
                                    key={index}
                                    title={item.title}
                                    // Format the date here to be in the format you prefer
                                    date={format(item.date, 'HH:mm')}
                        />
                        ))
                    }
                    />
                        </MonthlyBody>
                    </MonthlyCalendar>
                </div>
            </div>


    </div>
  );
};

export default IndividualClub;
