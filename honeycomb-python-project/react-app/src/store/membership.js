const CREATE_MEMBERSHIP = 'membership/CREATE_MEMBERSHIP'
const DELETE_MEMBERSHIP = 'membership/DELETE_MEMBERSHIP'
const GET_MEMBERSHIPS = 'membership/GET_MEMBERSHIPS'


const setMemberships = (clubs) => ({
  type: GET_MEMBERSHIPS,
  clubs
});

const addClubMembership = (club) => ({
  type: CREATE_MEMBERSHIP,
  club
});

const deleteClubMembership = (id) => ({
  type: DELETE_MEMBERSHIP,
  id
});

// get all memberships
export const getMemberships = (id) => async (dispatch) => {
  const res = await fetch(`/api/membership/${id}`);

  if (res.ok) {
    const allClubs = await res.json()
    dispatch(setMemberships(allClubs.clubs))
    return res;
  }
}

// join club
export const joinClub = (id) => async (dispatch) => {
  const res = await fetch(`/api/membership/${id}`, {
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
  });

  if (res.ok) {
    const club = await res.json()
    dispatch(addClubMembership(club.club))
    return club;
  }
}

// leave club
export const leaveClub = (id) => async (dispatch) => {
  const res = await fetch(`/api/membership/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const data = await res.json()
    dispatch(deleteClubMembership(id))
    return data;
  }
}

const initialState = {}

const membershipReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_MEMBERSHIPS:
      action.clubs.forEach(club => {
        newState[club.id] = club
      });
      return { ...state, ...newState }
    case CREATE_MEMBERSHIP:
      return {
        ...state,
        [action.club.id]: action.club
      };
    case DELETE_MEMBERSHIP:
      newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}

export default membershipReducer;
