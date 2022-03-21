import { init } from "express/lib/application";
import { csrfFetch } from "./csrf";

const CREATE_LIST = 'session/CREATE_LIST';
const GET_LISTS = 'session/GET_LISTS';
const EDIT_LIST = 'session/EDIT_LIST';

const create_list = (data) => {
    return {
        type: CREATE_LIST,
        data
    }
}
const get_list = (lists) => {
    return {
        type: GET_LISTS,
        lists
    }
}
const edit_list = (list) => {
    return {
        type: EDIT_LIST,
        list
    }
}

export const fetchLists = () => async (dispatch) => {
    const response = await csrfFetch('/api/portfolio/lists')
    const data = await response.json();
    dispatch(get_list(data));
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
        dispatch(create_list(data));
    }
}

export const editList = (list) => {

}

const initialState = { lists: {} }

export default function listReducer( state = initialState, action) {
    let newState = initialState;
    switch (action.type) {
        case GET_LISTS:
            newState.lists = action.lists;
            return newState;
        case CREATE_LIST:
            newState.lists[action.data.id] = action.data;
            return newState;
        default:
            return state;
    }
}
