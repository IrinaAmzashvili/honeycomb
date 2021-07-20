const JOIN_CLUB = 'membership/JOIN_CLUB'

const joinClub = (club) => ({
  type: JOIN_CLUB,
  club
});

// join club
export const postJoinClub = (id) => async (dispatch) => {
  const res = await fetch(`/api/membership/${id}`, {
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  const club = await res.json()

  if (res.ok) {
    dispatch(joinClub(club))
  }
}

const initialState = {}

const membershipReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_CLUB:
      return {
        ...state,
        [action.club.club.id]: action.club.club
      };
    default:
      return state;
  }
}

export default membershipReducer;
