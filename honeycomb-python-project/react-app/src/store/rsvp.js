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
