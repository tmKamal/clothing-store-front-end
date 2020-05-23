import {
    CHECKOUT,
    CLEAR_CHECKOUT,
    ORDER_PROCESSING,
    SET_ORDER_ITEMS
} from '../actions/types';

const initialState = {
    checkingItems: [],
    orderedItems: [],
    processing: 0,
    orderLoading: true,
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
        case ORDER_PROCESSING:
            return {
                ...state,
                processing: payload
            };
        case SET_ORDER_ITEMS:
            return {
                ...state,
                orderedItems: payload,
                orderLoading: false
            };
        default:
            return state;
    }
}
