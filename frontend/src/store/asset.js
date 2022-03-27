import { csrfFetch } from "./csrf";

const GET_ASSETS = 'session/GET_ASSETS';
const GET_TRANSACTIONS = 'session/GET_TRANSACTIONS';

const get_asset = (asset) => {
    return {
        type: GET_ASSETS,
        asset
    }
}

export const getAsset = (id) => async dispatch => {

    const response = await csrfFetch(`/api/asset/${id}`);
    // console.log('inside thunk'  , symbol)

    if (response.ok) {
        const data = await response.json();

        console.log('should be working', data)
        dispatch(get_asset(data))
    }

}
export const getTransactions = (id) => async dispatch => {
    const response = await csrfFetch(`/api/asset/transactions/${id}`);


}

let dataSet = new Set();
const initialState = { asset: {} }

export default function assetReducer(state = initialState, action) {
    let newState = initialState;
    switch (action.type) {
        case GET_ASSETS:
            let data = action.asset;
            newState = { ...state };
            newState.asset = data;
            data.forEach(stock => (dataSet.add(stock.ticker)));
            newState.dataSet = dataSet;
            // newState.set = action.asset.dataSet
            return newState;
        default:
            return state;
    }
}
