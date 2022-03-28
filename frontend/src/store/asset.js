import { csrfFetch } from "./csrf";

const GET_ASSETS = 'session/GET_ASSETS';
const GET_TRANSACTIONS = 'session/GET_TRANSACTIONS';

const get_asset = (asset) => {
    return {
        type: GET_ASSETS,
        asset
    }
}
const get_transactions = (transactions) => {
    return {
        type: GET_TRANSACTIONS,
        transactions
    }
}


export const getAsset = (id) => async dispatch => {

    const response = await csrfFetch(`/api/asset/${id}`);

    if (response.ok) {
        const asset = await response.json();


        dispatch(get_asset(asset))
    }

}
export const getTransactions = (id) => async dispatch => {
    const response = await csrfFetch(`/api/asset/transactions/${id}`);
    if (response.ok) {
        const transactions = await response.json();

        dispatch(get_transactions(transactions))
    }

}

let dataSet = new Set();
const initialState = { asset: {}, transactions: {} }

export default function assetReducer(state = initialState, action) {
    let newState = initialState;
    switch (action.type) {
        case GET_ASSETS:
            let data = action.asset;
            newState = { ...state };
            newState.asset = data;
            data.forEach(stock => (dataSet.add(stock.ticker)));

            let dataObj = {};

            data.forEach(stock => {
                stock = stock.ticker;
                console.log(stock)
                if (dataObj[stock]) {
                    let num = dataObj[stock];
                    dataObj[stock] = num + 1;
                } else {
                    dataObj[stock] = 1;
                }
            })
            newState.assetsArray = dataObj;
            newState.dataSet = dataSet;
            // newState.set = action.asset.dataSet
            return newState;
        case GET_TRANSACTIONS:
            let info = action.transactions;
            newState = { ...state };
            newState.transactions = info;

            let tranObj = {};
            action.transactions.forEach(tran => {
                let ticker = tran.ticker;
                let count = tran.quantity;

                if (tranObj[ticker]) {
                    tranObj[ticker] = tranObj[ticker].quantity + count;
                }
                else {
                    tranObj[ticker] = count
                }

                // tranObj = { [ticker]: count }
            })


            newState.tranObj = tranObj;
            return newState;
        default:
            return state;
    }
}
