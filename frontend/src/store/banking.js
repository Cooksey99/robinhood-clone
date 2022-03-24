import { csrfFetch } from "./csrf";

const ADD_BANK = 'session/ADD_BANK';
const GET_BANKS = 'session/GET_BANKS';

const add_bank = (bank) => ({
    type: ADD_BANK,
    bank
})

const get_banks = (banks) => ({
    type: GET_BANKS,
    banks
})

export const addBankFetch = (bank) => async dispatch => {
    const response = await csrfFetch('/api/banking/addBank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(bank)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(add_bank(data))
    }
}

export const fetchBanks = (id) => async dispatch => {
    const response = await csrfFetch(`/api/banking/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(get_banks(data))
    }

}

const initialState = { banks: {} }

export default function bankingReducer( state = initialState, action ) {
    let newState = initialState;
    switch (action.type) {
        case ADD_BANK:
            newState.banks[action.bank.id] = action.bank;
            return newState;
        case GET_BANKS:
            newState.banks = action.banks;
            return newState;
        default:
            return state;
    }
}
