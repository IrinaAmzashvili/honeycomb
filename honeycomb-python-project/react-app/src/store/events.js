const GET_EVENTS = 'events/GET_EVENTS';
const POST_EVENT = 'events/POST_EVENT';


const loadEvents = (events) => ({
    type: GET_EVENTS,
    events
})

const createEvent = (event) => ({
    type: POST_EVENT,
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




let initialState = {}

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            const allEvents = {}
            action.events.events.forEach((event) => {
                allEvents[event.id] = event
            })
            return allEvents

        case POST_EVENT:
            return {
                ...state,
                [action.event.id]: action.event
            }

        default:
            return state
    }

}

export default eventsReducer
