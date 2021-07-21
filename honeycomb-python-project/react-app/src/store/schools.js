const GET_SCHOOL = 'schools/GET_SCHOOL';

//action creators
const loadSchool = (school) => ({
    type: GET_SCHOOL,
    school
})

//thunks
export const getSchool = () => async (dispatch) => {
    const oneSchool = await fetch(`/api/schools`);
    const school = await oneSchool.json()
    if(oneSchool.ok) {
        dispatch(loadSchool(school))
    }
}


//reducer

const initialState = {};

const schoolReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SCHOOL:
            // return action.school
            const allSchools = {...state}
                allSchools[action.school.id] = action.school
            return allSchools;
        default:
            return state;
    }
}

export default schoolReducer;
