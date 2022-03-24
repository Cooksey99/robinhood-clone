import { csrfFetch } from "./csrf";

const GET_STOCKS = 'session/GET_STOCKS';
const ADD_STOCK = 'session/ADD_STOCK'

const get_stocks = (stocks) => ({
    type: GET_STOCKS,
    stocks
});

const add_stock = (stock) => ({
    type: ADD_STOCK,
    stock
});

export const fetchStocks = (id) => async dispatch => {
    const response = await csrfFetch(`/api/list/${id}`)
    // console.log('thunk: ', id)
    const stocks = await response.json();

    dispatch(get_stocks(stocks))
}

export const addStockToList = (watchlist_id, ticker) => async dispatch => {
    const response = await csrfFetch(`/api/list/addStock/${ticker}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            watchlist_id,
            ticker
        })
    });
    const stock = await response.json();
    dispatch(add_stock(stock))
}

const initialState = { stocks: {} }

export default function stocksReducer( state = initialState, action ) {
    let newState = initialState;
    switch (action.type) {
        case GET_STOCKS:
            newState.stocks = action.stocks;
            return newState;
        case ADD_STOCK:
            newState.stocks[action.stock.id] = action.stock;
            return newState;
        default:
            return state;
    }
}
