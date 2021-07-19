const GET_CLUBS = 'clubs/GET_CLUBS';
const POST_CLUB = "clubs/POST_CLUB"

//action creators
const loadClubs = (clubs) => ({
    type: GET_CLUBS,
    clubs
})

const createClub = (club) => ({
    type: POST_CLUB,
    club
})

//thunks
export const getClubs = () => async (dispatch) => {
    const allClubs = await fetch('/clubs');
    const clubs = await allClubs.json()
    if (allClubs.ok) {
        dispatch(loadClubs(clubs))
    }
}

export const postClub = (club) => async (dispatch) => {
    console.log('==========================> Made it to thunk creator')
    const res = await fetch("/clubs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(club)
    })
    console.log('==========================> Made it past res')
    if (res.ok) {
        const newClub = await res.json()
        console.log('==========================>', club)
        dispatch(createClub(newClub))
        return newClub
    }
}


//reducer

const initialState = {};

const clubsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CLUBS:
            const allClubs = { ...state }
            action.clubs.clubs.forEach((club) => {
                allClubs[club.id] = club
            })
            return allClubs;
        case POST_CLUB:
            return {
                ...state,
                [action.club.id]: action.club
            }
        default:
            return state;
    }
}

export default clubsReducer;
