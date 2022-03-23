import { csrfFetch } from "./csrf";

const CREATE_LIST = 'session/CREATE_LIST';
const GET_LISTS = 'session/GET_LISTS';
const EDIT_LIST = 'session/EDIT_LIST';
const DELETE_LIST = 'session/DELETE_LIST';

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

const delete_list = (listId) => {
    return {
        type: DELETE_LIST,
        listId
    }
}

export const fetchLists = () => async (dispatch) => {
    const response = await csrfFetch('/api/portfolio/lists')
    const data = await response.json();
    dispatch(get_list(data));
}

export const createNewList = ({ user_id, list_name }) => async (dispatch) => {
    console.log('testing thunk')
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

export const editList = (list) => async (dispatch) => {
    let id = list.id;
    console.log('testing the thunk', id);
    const response = await csrfFetch(`/api/portfolio/list/${id}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(list)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(edit_list(data));
    }
}

export const deleteList = (listId) => async (dispatch) => {
    let id = listId;
    console.log('listId:        ', id)
    const response = await csrfFetch(`/api/portfolio/list/${id}`, {
        method: 'delete'
    });
    if (response.ok) dispatch(delete_list(listId));
}

const initialState = { lists: {} }

export default function listReducer( state = initialState, action) {
    let newState = initialState;
    switch (action.type) {
        case GET_LISTS:
            newState = {...state};
            newState.lists = action.lists;
            return newState;
        case CREATE_LIST:
            newState = {...state};
            newState.lists[action.data.id] = action.data;
            return newState;
        case EDIT_LIST:
            newState = {...state};
            newState.lists[action.list.id] = action.list;
            return newState;
        case DELETE_LIST:
            newState = {...state};
            delete newState.lists[action.id];
            return newState;
        default:
            return state;
    }
}
