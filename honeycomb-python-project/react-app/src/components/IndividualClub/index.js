import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
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

const IndividualClub = () => {
  const history = useHistory()
  const { id } = useParams();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const memberships = useSelector((state) => Object.values(state.memberships));
  const events = useSelector((state) => Object.values(state.events));
  const clubs = useSelector((state) => Object.values(state.clubs));

  const club = clubs.find((club) => club?.id === +id);
  const member = memberships.find((joinedClub) => joinedClub?.id === +id);
  const clubHost = club?.members.find(
    (member) => +member[0] === +club?.host_id
  );

  // if no club show 404 not found
  if (clubs.length > 0) {
    if (!club) {
      history.push("/404");
    }
  }

  // get all memberships, clubs, and events
  useEffect(() => {
    dispatch(getMemberships(sessionUser.id));
    dispatch(getEvents(id));
    dispatch(getClubs());
  }, [dispatch, id, sessionUser.id]);

  // join/leave club
  const handleMembership = (e) => {
    // if user is a member, leave club on click, else join club on click
    if (member) {
      dispatch(leaveClub(id));
    } else {
      dispatch(joinClub(id));
    }
  };


  const renderEventCard = ()=>{
    if(events.length > 0){
      return events.map((event, indx) => (
        <EventsCard indx={indx} event={event} />
      ))
    }else{
      return <div class={styles.outerContainer}>No Events for now...</div>
    }

  }

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
      <div className={styles.clubInfoContainer}>
        <div className={styles.imageDiv}>
          <img className={styles.clubImage} src={club?.img_url} alt={`${club?.name} club`}/>
        </div>

        <div className={styles.clubinfo}>
          <p className={styles.clubName}>{club?.name}</p>
          <p>
            Organized by
            <Link to={`/users/${sessionUser.id}`}>
              <span className={styles.hostName}> {clubHost ? clubHost[1] : undefined}</span>
            </Link>
          </p>
          <p className={styles.clubDescription}>{club?.description}</p>
          {/* if user is not host, display "join/leave club" button */}
          {sessionUser.id !== club?.host_id && (
            <button
              className={member ? "cta_button_coral_empty" : "cta_button_coral"}
              onClick={handleMembership}
            >
              {member ? "Leave Club" : "Join Club"}
            </button>
          )}
          {/* if user is host, display "edit club" button */}
          {sessionUser.id === club?.host_id && (
            <div className={styles.hostButtonsDiv}>
              <EditClubModal club={club} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.eventsSectionDiv}>
        <div className={styles.TitleAndEventModalContainer}>
          <div className={styles.TitleAndEventModal}>
            <div className={styles.title}>Upcoming Events</div>
            {/* if user is host, display "create event" button */}
            {sessionUser.id === club?.host_id && (
              <EventModal />
            )}
          </div>
        </div>
        <div className={styles.eventsAndCalender}>
          <div className={styles.eventCardsContainer}>
            {
              renderEventCard()
            }
          </div>
          <div className={styles.calenderContainer}>
            <MonthlyCalendar
              className={styles.monthlyCalender}
              currentMonth={currentMonth}
              onCurrentMonthChange={(date) => setCurrentMonth(date)}
            >
              <MonthlyNav className={styles.calendarButtons} />
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
