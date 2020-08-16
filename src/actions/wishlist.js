import axios from 'axios';

import {
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
    GET_WISHLIST,
    GET_WISHLIST_DETAILS
} from './types';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const addToWishlist = (product) => async (dispatch) => {
    try {
        const p = { product };
        dispatch({
            type: ADD_TO_WISHLIST,
            payload: p
        });
        await axios.post(
            'https://quiet-hollows-79620.herokuapp.com/api/wishlist',
            p,
            config
        );
    } catch (err) {}
};

export const removeFromWishList = (product) => async (dispatch) => {
    try {
        const p = { product };
        dispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: p
        });
        await axios.post(
            'https://quiet-hollows-79620.herokuapp.com/api/wishlist/removeitem',
            p,
            config
        );
    } catch (err) {}
};

export const getWishlist = () => async (dispatch) => {
    try {
        const res = await axios.post(
            'https://quiet-hollows-79620.herokuapp.com/api/wishlist/get',
            null,
            config
        );

        dispatch({
            type: GET_WISHLIST,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};

export const getWishlistDetails = () => async (dispatch) => {
    try {
        const res = await axios.post(
            'https://quiet-hollows-79620.herokuapp.com/api/wishlist/getitems',
            null,
            config
        );

        dispatch({
            type: GET_WISHLIST_DETAILS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};
