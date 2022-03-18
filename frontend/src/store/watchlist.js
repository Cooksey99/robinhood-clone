import { csrfFetch } from "./csrf";

const CREATE_LIST = 'session/CREATE_LIST';

const createList = (list) => {
    type: CREATE_LIST,
    list
}
