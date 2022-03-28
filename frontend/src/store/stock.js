import { csrfFetch } from "./csrf";
import { addBuyingPower, removeBuyingPower } from "./session";

const GET_STOCKS = 'session/GET_STOCKS';
const ADD_STOCK = 'session/ADD_STOCK';
const PURCHASE_STOCK = 'session/PURCHASE_STOCK';
const SELL_STOCK = 'session/PURHCASE_STOCK';
const CHECK_AMOUNT = 'session/CHECK_AMOUNT';

const get_stocks = (stocks) => ({
    type: GET_STOCKS,
    stocks
});
const add_stock = (stock) => ({
    type: ADD_STOCK,
    stock
});
const purchase_stock = (stock) => ({
    type: PURCHASE_STOCK,
    stock
});
const sell_stock = (id) => ({
    type: SELL_STOCK,
    id
});
const check_owned = (stocks) => ({
    type: CHECK_AMOUNT,
    stocks
})

export const checkOwned = (ticker, id) => async dispatch => {
    const response = await csrfFetch(`/api/asset/${ticker}/${id}`)

    const stocks = await response.json();

    dispatch(check_owned(stocks))
}

export const fetchStocks = (id) => async dispatch => {
    const response = await csrfFetch(`/api/list/${id}`)
    // console.log('thunk: ', id)
    const stocks = await response.json();

    dispatch(get_stocks(stocks))
};

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

export const purchaseStock = (asset_id, ticker, price, quantity, sessionUser) => async dispatch => {
    // console.log("=======", asset_id, ticker)
    const userId = asset_id;
    const response = await csrfFetch(`/api/asset/purchaseStock/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            asset_id,
            ticker,
            price,
            quantity
        })
    });
    if (response.ok) {
        const stock = await response.json();
        // console.log('WORKING RIGHT HERE:    ', stock)
        dispatch(purchase_stock(stock));
        dispatch(removeBuyingPower(sessionUser, price));
    }
}

export const sellStock = (assetId, stockId, ticker, price, quantity, sessionUser) => async dispatch => {
    console.log('hello from the thunk:  ', price, quantity, ticker)
    const response = await csrfFetch(`/api/asset/sellStock`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            assetId,
            stockId,
            ticker,
            price,
            quantity
        })
    });
    if (response.ok) {
        // console.log('\n\n\n', response)
        dispatch(sell_stock(stockId));
        dispatch(addBuyingPower(sessionUser, price));
    }

}


const initialState = { stocks: {}, assets: {} }

export default function stocksReducer(state = initialState, action) {
    let newState = initialState;
    switch (action.type) {
        case GET_STOCKS:
            newState.stocks = action.stocks;
            return newState;
        case ADD_STOCK:
            newState.stocks[action.stock.id] = action.stock;
            return newState;
        case PURCHASE_STOCK:
            newState.assets[action.stock.id] = action.assets;
            return newState;
        case SELL_STOCK:
            // action.stock.id ? delete newState.assets[action.stock.id] : newState = state;
            return newState;
        case CHECK_AMOUNT:
            newState.assets = action.stocks;
            return newState;
        default:
            return state;
    }
}
