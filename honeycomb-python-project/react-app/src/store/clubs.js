const GET_CLUBS = 'clubs/GET_CLUBS';

//action creators
const loadClubs = (clubs) => ({
    type: GET_CLUBS,
    clubs
})

//thunks
export const getClubs = () => async (dispatch) => {
    const allClubs = await fetch('/clubs');
    const clubs = await allClubs.json()
    if(allClubs.ok) {
        dispatch(loadClubs(clubs))
    }
}


//reducer

const initialState = {};

const clubsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CLUBS:
            const allClubs = {...state}
            action.clubs.clubs.forEach((club) => {
                allClubs[club.id] = club
            })
            return allClubs;
        default:
            return state;
    }
}

export default clubsReducer;
