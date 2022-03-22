import { CompanyNewsStatistics } from "finnhub";
import { csrfFetch } from "./csrf";

const GET_ASSET = 'session/GET_ASSET';

const get_asset = (asset) => {
    return {
        type: GET_ASSET,
        asset
    }
}

export const getAsset = (symbol) => async (dispatch) => {
    // console.log('inside thunk'  , asset)
    const response = await csrfFetch(`/api/asset/${symbol}`)

    if (response.ok) {
        const asset = await response.json();
        dispatch(get_asset(asset));
        return asset;
    }
}

const initialState = { asset: {} }

export default function assetReducer( state = initialState, action ) {
    let newState = initialState;
    switch (action.type) {
        case GET_ASSET:
            newState = {...state};
            newState.asset = action.asset;
            return newState;
        default:
            return state;
    }
}
