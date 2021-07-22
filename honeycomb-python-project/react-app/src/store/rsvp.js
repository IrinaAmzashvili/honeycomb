const ATTEND_EVENT = 'events/ATTEND_EVENT';
const LEAVE_EVENT = 'events/LEAVE_EVENT';

//action creators
const joinEvent = (rsvp) => ({
    type: ATTEND_EVENT,
    rsvp
})

const leaveEvent = (rsvp) => ({
    type: LEAVE_EVENT,
    rsvp
})

//thunks

export const attendOneEvent = (id, rsvp) => async (dispatch) => {
    const response = await fetch('link here and id', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(rsvp)
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
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(rsvp)
    })
    if(response.ok) {
        const rsvpRevocation = await response.json();
        dispatch(leaveEvent(rsvpRevocation))
    }
}
