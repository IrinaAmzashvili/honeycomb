//action creators
const GET_CLUBS = 'clubs/GET_CLUBS';
const GET_ONE_CLUB = 'clubs/GET_ONE_CLUB';
const DELETE_CLUB = 'clubs/DELETE_CLUB'

const loadClubs = (clubs) => ({
    type: GET_CLUBS,
    clubs
})

const getOneClub = (club) => ({
    type: GET_ONE_CLUB,
    club
})

const removeClub = (id) => ({
    type: DELETE_CLUB,
    id
})

//thunks
export const getClubs = () => async (dispatch) => {
    const allClubs = await fetch('/clubs');
    const clubs = await allClubs.json()
    if(allClubs.ok) {
        dispatch(loadClubs(clubs))
    }
}

export const getSingleClub = (id) => async (dispatch) => {
    const oneClub = await fetch(`/clubs/${id}`)
    const club = await oneClub.json()
    if(oneClub.ok) {
        dispatch(getOneClub(club))
    }
}

export const deleteClub = (id) => async (dispatch) => {
    const res = await fetch(`/clubs/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeClub(id))
        return data;
    }
}

//reducer

const initialState = {singleClub: null};

const clubsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CLUBS:
            const allClubs = {...state}
            action.clubs.clubs.forEach((club) => {
                allClubs[club.id] = club
            })
            return allClubs;
        case GET_ONE_CLUB:
            const oneClub = Object.assign({}, state);
            oneClub.singleClub = action.club;
            return oneClub;
            // return {
            //     ...action.payload
            // }
        case DELETE_CLUB:
            const newObj = { ...state };
            delete newObj[action.id];
            return newObj;
        default:
            return state;
    }
}

export default clubsReducer;
