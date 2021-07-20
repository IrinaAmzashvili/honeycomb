const GET_EVENTS = 'events/GET_EVENTS';

const loadEvents = (events) => ({
    type: GET_EVENTS,
    events
})


//thunk
export const getEvents = (id) => async (dispatch) => {
    const res = await fetch(`/api/clubs/${id}/events`);
    const events = await res.json();
    if (res.ok) {
        console.log('=======================> made it to res', events)
        dispatch(loadEvents(events))
        return events
    }
}

let initialState = {}

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            const allEvents = { ...state }
            action.events.events.forEach((event) => {
                allEvents[event.id] = event
            })
            return allEvents
        default:
            return state
    }

}

export default eventsReducer
