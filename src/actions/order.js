import axios from 'axios';
import { CHECKOUT, CLEAR_CHECKOUT } from './types';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const checkout = (products, qty, total) => async (dispatch) => {
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
            if (qty) {
                items.qty = qty;
            }
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
