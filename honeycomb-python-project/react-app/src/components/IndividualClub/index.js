import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClubs } from "../../store/clubs";
import { getMemberships, joinClub, leaveClub } from "../../store/membership";
import { getEvents } from "../../store/events";
import EditClubModal from "../EditClubForm";
import EventsCard from "../EventCards";
import EventModal from "../CreateEventModal";
import styles from "./IndividualClub.module.css";
import "@zach.codes/react-calendar/dist/calendar-tailwind-no-reset.css";
import { format } from "date-fns";

import {
  MonthlyBody,
  MonthlyCalendar,
  MonthlyNav,
  MonthlyDay,
  DefaultMonthlyEventItem,
} from "@zach.codes/react-calendar";

const subHours = (date, hour) => {
  return date.setHours(date.getHours() - hour);
};

const IndividualClub = () => {
  const { id } = useParams();
  const clubs = useSelector((state) => Object.values(state.clubs));
  const club = clubs.find((club) => club?.id === +id);
  const sessionUser = useSelector((state) => state.session.user);
  const memberships = useSelector((state) => Object.values(state.memberships));
  const member = memberships.find((joinedClub) => joinedClub?.id === +id);
  const dispatch = useDispatch();

  // get all memberships and all club
  useEffect(() => {
    dispatch(getMemberships(sessionUser.id));
    dispatch(getClubs());
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
    await dispatch(getEvents(id));
  }, [dispatch, id]);

  const events = useSelector((state) => Object.values(state.events));

  // ---------------------------------------calender----------------------
  let [currentMonth, setCurrentMonth] = useState(new Date());

  const calendarEvents = () => {
    let list = [];
    for (const event of events) {
      let obj = {};
      obj["title"] = event.name;
      obj["date"] = new Date(event.date_and_time);
      list.push(obj);
    }
    return list;
  };

  return (
    <div>
      {/* <div className={styles.redCrossBar}></div> */}
      <div className={styles.clubInfoContainer}>
        <div className={styles.imageDiv}>
          <img className={styles.clubImage} src={club?.img_url} />
        </div>

        <div class={styles.clubinfo}>
          <p className={styles.clubName}>{club?.name}</p>
          <p>Organized by <span className={styles.hostName}>{sessionUser.username}</span></p>
          <p className={styles.clubDescription}>{club?.description}</p>
          <button className='cta_button_coral' onClick={handleMembership}>
            {member ? "Leave Club" : "Join Club"}
          </button>
          {sessionUser.id === club?.host_id && (
            <div className={styles.hostButtonsDiv}>
              <EditClubModal club={club} />
            </div>
          )}
        </div>

      </div>
      <div className={styles.eventsSectionDiv}>
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
              onCurrentMonthChange={(date) => setCurrentMonth(date)}
            >
              <MonthlyNav />
              <MonthlyBody
                // events={[
                //     { title: 'Call John', date: subHours(new Date(), 2) },
                //     { title: 'Call John', date: subHours(new Date(), 1) },
                //     { title: 'Meeting with Bob', date: new Date() },
                // ]}
                events={calendarEvents()}
              >
                <MonthlyDay
                  className={styles.monthlyDay}
                  renderDay={(data) =>
                    data.map((item, index) => (
                      <DefaultMonthlyEventItem
                        key={index}
                        title={item.title}
                        // Format the date here to be in the format you prefer
                        date={format(item.date, "HH:mm")}
                      />
                    ))
                  }
                />
              </MonthlyBody>
            </MonthlyCalendar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualClub;
