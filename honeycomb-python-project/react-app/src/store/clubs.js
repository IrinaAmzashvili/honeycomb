//action creators
const GET_CLUBS = 'clubs/GET_CLUBS';
const POST_PUT_CLUB = "clubs/POST_PUT_CLUB";
const DELETE_CLUB = 'clubs/DELETE_CLUB';


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
    const allClubs = await fetch('/api/clubs/');
    const clubs = await allClubs.json()
    if (allClubs.ok) {
        dispatch(loadClubs(clubs))
    }
}

export const postClub = (club) => async (dispatch) => {
    const res = await fetch("/api/clubs/", {
        method: "POST",
        body: club
    });
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
        dispatch(createEditClub(data));
        return data;
    }
}

export const editClub = (id, club) => async (dispatch) => {
    const response = await fetch(`/api/clubs/${id}`, {
        // method: 'PUT',
        // headers: {'Content-Type': 'application/json'},
        // body: JSON.stringify(club)
        method: "PUT",
        body: club
    })
    if(response.ok) {
        const data = await response.json()
        if (data.errors) {
            return data;
        }
        dispatch(createEditClub(data))
        return data
    }
}

export const deleteClub = (id) => async (dispatch) => {
    const res = await fetch(`/api/clubs/${id}`, {
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
