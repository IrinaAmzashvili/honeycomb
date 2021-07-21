import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';



const EventsCard = ({ event }) => {

    const newTime = new Date(event.date_and_time)

    return (
        <div>
            <div>{newTime.toLocaleDateString()}{newTime.toLocaleTimeString()}</div>
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
