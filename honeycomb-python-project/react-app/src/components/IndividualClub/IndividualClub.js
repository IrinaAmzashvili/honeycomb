import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleClub } from '../../store/clubs';
import styles from './IndividualClub.module.css'
import { getEvents } from '../../store/events';
import EventsCard from '../EventCards'
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
    const sessionUser = useSelector(state => state.session.user)
    const { id } = useParams();
    const club = useSelector(state => state.clubs.singleClub)
    // const club = useSelector(state => state.club)
    const dispatch = useDispatch()




    // ---------------------------------------Individual Club----------------------
    useEffect(() => {
        dispatch(getSingleClub(parseInt(id)))
    }, [dispatch, id])

    // ---------------------------------------events----------------------
    useEffect(async () => {
        await dispatch(getEvents(id))
    }, [dispatch, id])

    const events = useSelector(state => Object.values(state.events))

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

    // const event = events.map((event) => event)
    return (
        <>
            <div className={styles.redCrossBar}>

            </div>
            <div className={styles.clubInfoContainer}>
                <div class={styles.container}>
                    <div class={styles.image}>
                        <img className={styles.clubImage} src={club?.img_url} />
                    </div>
                    <div class={styles.clubinfo}>
                        <p className={styles.clubName}>{club?.name}</p>
                        <button className={styles.joinButton}>Join club</button>
                        <p>Organized by (name here)</p>
                        <p className={styles.clubDescription}>{club?.description}</p>
                        {sessionUser.id === club?.host_id &&
                            <div>
                                <button className={styles.editButton}>Edit</button>
                                <button className={styles.deleteButton}>Delete</button>
                            </div>}
                    </div>
                </div>

            </div>
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
        </>
    )
}

export default IndividualClub;
