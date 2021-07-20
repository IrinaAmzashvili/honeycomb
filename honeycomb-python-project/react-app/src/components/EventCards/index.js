import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';



const EventsCard = ({ event }) => {

    return (
        <div>
            <div>{event.date_and_time}</div>
            <div>Location: {event.location}</div>
            <div>{event.name}</div>
            <div>{event.description}</div>
            <div>
                <button>Edit Event</button>
                <button>Attend</button>
            </div>
        </div>
    )



}

export default EventsCard
