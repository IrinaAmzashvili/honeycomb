//action creators
const GET_CLUBS = 'clubs/GET_CLUBS';
const POST_PUT_CLUB = "clubs/POST_PUT_CLUB";
const DELETE_CLUB = 'clubs/DELETE_CLUB'

const loadClubs = (clubs) => ({
    type: GET_CLUBS,
    clubs
})

const createEditClub = (club) => ({
    type: POST_PUT_CLUB,
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
    if (allClubs.ok) {
        dispatch(loadClubs(clubs))
    }
}

export const postClub = (club) => async (dispatch) => {
    const res = await fetch("/clubs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(club)
    })
    if (res.ok) {
        const newClub = await res.json()
        dispatch(createEditClub(newClub))
        return newClub
    }
}

export const editClub = (id, club) => async (dispatch) => {
    const response = await fetch(`/api/clubs/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(club)
    })
    if(response.ok) {
        const editedClub = await response.json()
        dispatch(createEditClub(editedClub))
        return editedClub
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
const initialState = {};

const clubsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CLUBS:
            const allClubs = {}
            action.clubs.clubs.forEach((club) => {
                allClubs[club.id] = club
            })
            return allClubs;
        case POST_PUT_CLUB:
            return {
                ...state,
                [action.club.id]: action.club
            }
        case DELETE_CLUB:
            const newObj = { ...state };
            delete newObj[action.id];
            return newObj;
        default:
            return state;
    }
}

export default clubsReducer;
