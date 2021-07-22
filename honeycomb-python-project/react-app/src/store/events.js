const GET_EVENTS = 'events/GET_EVENTS';
const POST_EVENT = 'events/POST_EVENT';
const EDIT_EVENT = 'events/EDIT_EVENT';
const DELETE_EVENT = 'events/DELETE_EVENT';

const loadEvents = (events) => ({
    type: GET_EVENTS,
    events
})

const createEvent = (event) => ({
    type: POST_EVENT,
    event
})

const updateEvent = (event) =>({
    type: EDIT_EVENT,
    event
})

const removeEvent = (event) => ({
    type: DELETE_EVENT,
    event
})

//thunk
export const getEvents = (id) => async (dispatch) => {
    const res = await fetch(`/api/clubs/${id}/events`);
    const events = await res.json();
    if (res.ok) {
        dispatch(loadEvents(events))
        return events
    }
}


export const postEvent = (id, event) => async (dispatch) => {
    // console.log('=====================>', event)
    const res = await fetch(`/api/clubs/${id}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
    });
    if (res.ok) {
        const data = await res.json();
        console.log('----> thunk data:', data)
        if (data.errors) {
            return data;
        }
        dispatch(createEvent(data));
        return data;
    }
}


export const editEvent = (id, event) => async (dispatch) => {
    // console.log('=====================>', event)
    const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
    });
    if (res.ok) {
        const newEvent = await res.json()
        dispatch(updateEvent(newEvent))
        return newEvent
    }
}

export const deleteEvent = (id) => async (dispatch) => {
    const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeEvent(data))
        return data;
    }
}


let initialState = {}

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            const allEvents = {}
            // const allEvents = { ...state }
            action.events.events.forEach((event) => {
                allEvents[event.id] = event
            })
            return allEvents

        case POST_EVENT:
            return {
                ...state,
                [action.event.id]: action.event
            }


        case EDIT_EVENT:
            return {
                ...state,
                [action.event.id]: action.event
            }

        case DELETE_EVENT:
            const newObj = { ...state };
            delete newObj[action.event.id];
            return newObj;
        default:
            return state
    }

}

export default eventsReducer
