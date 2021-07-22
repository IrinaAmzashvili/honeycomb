const ATTEND_EVENT = 'events/ATTEND_EVENT';
const LEAVE_EVENT = 'events/LEAVE_EVENT';

//action creators
const joinEvent = (event) => ({
    type: ATTEND_EVENT,
    event
})

const leaveEvent = (id) => ({
    type: LEAVE_EVENT,
    id
})

//thunks

export const attendOneEvent = (id, rsvp) => async (dispatch) => {
    const response = await fetch('link here and id', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });
    if(response.ok) {
        const rsvpConfirmation = await response.json();
        dispatch(joinEvent(rsvpConfirmation))
        return rsvpConfirmation;
    }
}

export const leaveOneEvent = (id, rsvp) => async (dispatch) => {
    const response = await fetch('link here and id', {
        method: 'DELETE',
    })
    if(response.ok) {
        const rsvpRevocation = await response.json();
        dispatch(leaveEvent(rsvpRevocation))
        return rsvpRevocation;
    }
}

const initialState = {}
export const rsvpReducer = (state = initialState, action ) => {
    let rsvpToDelete = {};
    switch(action.type) {
        case ATTEND_EVENT:
            return {
                ...state,
                [action.event.id]: action.event
            }
        case LEAVE_EVENT:
            rsvpToDelete = {...state};
            delete rsvpToDelete[action.id];
            return rsvpToDelete;
        default:
            return state;
    }
}
