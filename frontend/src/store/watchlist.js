import { init } from "express/lib/application";
import { csrfFetch } from "./csrf";

const CREATE_LIST = 'session/CREATE_LIST';
const GET_LISTS = 'session/GET_LISTS';


const createList = (data) => {
    return {
        type: CREATE_LIST,
        data
    }
}
const getLists = (lists) => {
    return {
        type: GET_LISTS,
        lists
    }
}

export const fetchLists = async (dispatch) => {
    const response = await csrfFetch('/api/portfolio/lists')
    const data = await response.json();

    dispatch(getLists(data));
    return data;
}

export const createNewList = ({ user_id, list_name }) => async (dispatch) => {
    // console.log('testing thunk')
    const response = await csrfFetch('/api/portfolio/list', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_id,
            list_name
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createList(data));
    }
}

const initialState = { lists: {} }

export default function listReducer( state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_LISTS:
            newState.lists = action.lists;
            return newState;
        case CREATE_LIST:
            // console.log('testing', action.data)
            newState = initialState;
            newState.lists[action.data.id] = action.data;
            return newState;
        default:
            return state;
    }
}
