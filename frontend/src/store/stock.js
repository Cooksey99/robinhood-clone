import { csrfFetch } from "./csrf";

const GET_STOCKS = 'session/GET_STOCKS';

const get_stocks = (stocks) => ({
    type: GET_STOCKS,
    stocks
})

export const fetchStocks = (id) => async dispatch => {
    const response = await csrfFetch(`/list/${id}`)
    const data = await response.json();

    dispatch(get_stocks(data))
}

const initialState = { stocks: {} }

export default function stocksReducer( state = initialState, action ) {
    let newState = initialState;
    switch (action.type) {
        case GET_STOCKS:
            newState.stocks = action.stocks;
            return newState;
        default:
            return state;
    }
}
