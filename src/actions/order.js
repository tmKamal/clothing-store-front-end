import axios from 'axios';
import {
    CHECKOUT,
    CLEAR_CHECKOUT,
    ORDER_PROCESSING,
    SET_ORDER_ITEMS,
    CLEAR_CART
} from './types';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const checkout = (products, qty, size, total) => async (dispatch) => {
    dispatch({
        type: CLEAR_CHECKOUT
    });
    try {
        if (products.length > 0) {
            const items = {};
            products.map(
                (product) =>
                    (product.price =
                        product.product.price -
                        (product.product.discount
                            ? product.product.discount
                            : 0))
            );

            items.products = products;
            items.total = total;

            dispatch({
                type: CHECKOUT,
                payload: items
            });
        } else {
            const items = {};
            items.products = products;
            if (qty) {
                items.qty = qty;
            }
            if (size) {
                items.size = size;
            }
            if (products.discount) {
                items.price = products.price - products.discount;
            } else {
                items.price = products.price;
            }
            items.total = total;

            dispatch({
                type: CHECKOUT,
                payload: items
            });
        }
    } catch (err) {
        console.error(err);
    }
};

export const placeOrder = (prods, address, payment) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_PROCESSING,
            payload: 1
        });
        const products = prods.products;
        const total = prods.total;
        const newOrder = [];

        if (products.length > 0) {
            products.map((product) => {
                let pr = {};
                pr.product = product.product._id;
                pr.qty = product.qty;
                pr.price = product.price;
                pr.size = product.size;
                newOrder.push(pr);
            });
        } else {
            let pr = {};
            pr.product = products.id;
            pr.qty = prods.qty;
            pr.price = prods.price;
            pr.size = prods.size;
            newOrder.push(pr);
        }

        const body = {
            products: newOrder,
            address: address,
            total: total,
            payment: payment
        };

        const res = await axios.post(
            'https://quiet-hollows-79620.herokuapp.com/api/order/',
            body,
            config
        );
        dispatch({
            type: ORDER_PROCESSING,
            payload: 2
        });
        dispatch({
            type: SET_ORDER_ITEMS,
            payload: res.data.orders
        });

        if (products.length > 0) {
            await axios.post(
                'https://quiet-hollows-79620.herokuapp.com/api/cart/clearcart',
                null,
                config
            );
            console.log('clear');
            dispatch({
                type: CLEAR_CART
            });
        }
        setTimeout(() => {
            dispatch({
                type: ORDER_PROCESSING,
                payload: 0
            });

            dispatch({
                type: CLEAR_CHECKOUT
            });
        }, 5000);
    } catch (err) {
        console.error(err);
    }
};

export const getOrderedItems = () => async (dispatch) => {
    try {
        const res = await axios.get(
            'https://quiet-hollows-79620.herokuapp.com/api/order/items'
        );
        dispatch({
            type: SET_ORDER_ITEMS,
            payload: res.data.orders
        });
    } catch (err) {
        console.error(err);
    }
};

export const setOrderComplete = (orderId) => async (dispatch) => {
    try {
        const body = {};
        body.orderId = orderId;
        const res = await axios.post(
            'https://quiet-hollows-79620.herokuapp.com/api/order/complete/',
            body,
            config
        );
        dispatch({
            type: SET_ORDER_ITEMS,
            payload: res.data.orders
        });
    } catch (err) {
        console.error(err);
    }
};

export const itemReviewd = (pid, oid) => async (dispatch) => {
    try {
        const body = {};
        body.orderId = oid;
        body.product = pid;

        const res = await axios.post(
            'https://quiet-hollows-79620.herokuapp.com/api/order/rated',
            body,
            config
        );
        dispatch({
            type: SET_ORDER_ITEMS,
            payload: res.data.orders
        });
    } catch (err) {
        console.log(err);
    }
};
