const GET_SCHOOL = 'schools/GET_SCHOOL';

const ALL_SCHOOLS = 'schools/ALL_SCHOOLS';

//action creators
const loadSchool = (school) => ({
    type: GET_SCHOOL,
    school
})

const loadAllSchools = (schools) => ({
    type: ALL_SCHOOLS,
    schools

})

//thunks
export const getSchool = () => async (dispatch) => {
    const oneSchool = await fetch(`/api/schools`);
    const school = await oneSchool.json()
    if (oneSchool.ok) {
        dispatch(loadSchool(school))
    }
}


export const getAllSchools = () => async (dispatch) => {
    const res = await fetch(`/api/signup/schools`);
    const allSchools = await res.json()
    if (res.ok) {
        dispatch(loadAllSchools(allSchools))
    }
}


//reducer

const initialState = {};

const schoolReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SCHOOL:
            const allSchools = { ...state }
            allSchools[action.school.id] = action.school
            return allSchools;

        case ALL_SCHOOLS:
            const GetAllSchools = { ...state }
            action.schools.schools.forEach((school) => {
                GetAllSchools[school.id] = school
            })
            return GetAllSchools;

        default:
            return state;
    }
}

export default schoolReducer;
