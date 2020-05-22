import { CHECKOUT, CLEAR_CHECKOUT } from '../actions/types';

const initialState = {
    checkingItems: [],
    loading: true
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CHECKOUT:
            return {
                ...state,
                checkingItems: payload,
                loading: false
            };
        case CLEAR_CHECKOUT:
            return {
                ...state,
                checkingItems: [],
                loading: true
            };
        default:
            return state;
    }
}
