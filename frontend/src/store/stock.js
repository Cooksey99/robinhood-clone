import { csrfFetch } from "./csrf";
import { addBuyingPower, removeBuyingPower } from "./session";

const GET_STOCKS = 'session/GET_STOCKS';
const ADD_STOCK = 'session/ADD_STOCK';
const PURCHASE_STOCK = 'session/PURCHASE_STOCK';
const SELL_STOCK = 'session/PURHCASE_STOCK';

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
const sell_stock = (stock) => ({
    type: SELL_STOCK,
    stock
});


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

export const sellStock = (assetId, stockId, price, quantity, sessionUser) => async dispatch => {

    const response = await csrfFetch(`/api/asset/sellStock`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            assetId,
            stockId,
            price,
            quantity
        })
    });
    if (response.ok) {
        dispatch(sell_stock(response));
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
            delete newState.assets[action.stock.id];
            return newState;
        default:
            return state;
    }
}
