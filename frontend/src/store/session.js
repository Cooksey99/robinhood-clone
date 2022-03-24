import { csrfFetch } from "./csrf.js";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const BUYING_POWER = 'session/BUYING_POWER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const buying_power = (user) => ({
  type: BUYING_POWER,
  user
})

export const updateBuyingPower = (user) => async dispatch => {
  const response = await csrfFetch(`/api/users/${user.id}/buyingPower`, {
    method: 'PUT',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(user)
  })
  if (response.ok) {
    const user = await response.json();
    dispatch(buying_power(user))
  }
}

export const login = ({ credential, password }) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  // console.log('==============', data)
  dispatch(setUser(data.user));
  return response;
};

export const signup = ({ email, firstName, lastName, password }) => async (dispatch) => {
  const user = { email, firstName, lastName, password };
  console.log('test', firstName, lastName)
  // console.log(user)
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
    }),
  });
  // console.log('-------', res.json())
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
