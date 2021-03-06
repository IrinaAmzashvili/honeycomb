// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const EDIT_USER = 'session/EDIT_USER';


const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const editUser = (user) => ({
  type: EDIT_USER,
  user
})



const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    // if (data.errors) {
    //   return data.errors;
    // }
    return data
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (user) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: "POST",
    body: user
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    // if (data.errors) {
    //   return data.errors;
    // }
    return data;
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const putUser = (user) => async (dispatch) => {
  const res = await fetch('/api/users/edit', {
    method: "PUT",
    body: user
  })
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return data
    }
    dispatch(editUser(data));
    return data
  }
}

export const deleteUser = () => async (dispatch)=>{
  const res = await fetch('/api/users/delete', {
    method: "DELETE"
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(removeUser())
    return data;
  }

}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case EDIT_USER:
      return { user: action.user }
    default:
      return state;
  }
}
