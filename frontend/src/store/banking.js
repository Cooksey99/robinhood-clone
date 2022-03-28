import { csrfFetch } from "./csrf";

const ADD_BANK = 'session/ADD_BANK';
const GET_BANKS = 'session/GET_BANKS';
const DELETE_BANK = 'session/DELETE_BANK';
const EDIT_BANK = 'session/EDIT_BANK';

const add_bank = (bank) => ({
    type: ADD_BANK,
    bank
});

const get_banks = (banks) => ({
    type: GET_BANKS,
    banks
});

const delete_bank = (bankId) => ({
    type: DELETE_BANK,
    bankId
})

const edit_bank = (bank) => ({
    type: EDIT_BANK,
    bank
})

export const addBankFetch = (bank) => async dispatch => {
    const response = await csrfFetch('/api/banking/addBank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

export const deleteBankFetch = (bankId) => async dispatch => {
    await csrfFetch(`/api/banking/removeBank/${bankId}`, {
        method: 'DELETE'
    });

    dispatch(delete_bank(bankId));
}

export const editBank = (bank, bankId) => async dispatch => {
    const response = await csrfFetch(`/api/banking/editBank/${bankId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bank)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(edit_bank(data))
    }
}

const initialState = { banks: {} }

export default function bankingReducer(state = initialState, action) {
    let newState = initialState;
    switch (action.type) {
        case ADD_BANK:
            newState = { ...state };
            newState.banks[action.bank.id] = action.bank;
            return newState;
        case GET_BANKS:
            newState.banks = action.banks;
            return newState;
        case DELETE_BANK:
            delete newState.banks[action.bankId];
            return newState;
        case EDIT_BANK:
            newState = { ...state };
            newState.banks[action.bank.id] = action.bank;
            return newState;
        default:
            return state;
    }
}
