import axios from 'axios';

import {
	ADD_ITEM,
	LOAD_CART,
	LOAD_CART_CHECKOUT,
	CLEAR_ITEM_FROM_CART,
	REDUCE_QTY,
	INCREASE_QTY,
	CLEAR_STORE
} from './types';

const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};
export const loadCart = () => async (dispatch) => {
	try {
		const body = {};

		const res = await axios.post('/api/cart/load', body, config);

		if (typeof res.data === 'object') {
			dispatch({
				type: LOAD_CART,
				payload: res.data
			});
		}
	} catch (err) {}
};

export const loadCartCheckout = () => async (dispatch) => {
	try {
		const body = {};

		const res = await axios.post('/api/cart/loadcheckout', body, config);

		dispatch({
			type: LOAD_CART_CHECKOUT,
			payload: res.data
		});
	} catch (err) {
		window.location.href = '/auth';
	}
};

export const addItem = (item, size = 'm', qty = 1) => async (dispatch) => {
	loadCart();

	try {
		const newItem = {};
		if (typeof axios.defaults.headers.common['Authrization'] === 'undefined') {
			window.location.href = '/auth';
		}

		newItem.product = item._id;
		newItem.size = size;
		newItem.qty = qty;

		dispatch({
			type: ADD_ITEM,
			payload: newItem
		});
	} catch (err) {
		window.location.href = '/auth';
	}
};

export const clearItemFromCart = (item) => async (dispatch) => {
	try {
		const newItem = {};
		newItem.product = item.product._id;

		dispatch({
			type: CLEAR_ITEM_FROM_CART,
			payload: newItem
		});

		//axios part
		await axios.post('/api/cart/removeitem', newItem, config);
	} catch (err) {}
};

export const reduceQty = (item) => async (dispatch) => {
	try {
		const newItem = {};

		newItem.product = item.product._id;
		newItem.qty = '-1';

		dispatch({
			type: REDUCE_QTY,
			payload: newItem
		});

		await axios.post('/api/cart/updateqty', newItem, config);
	} catch (err) {}
};

export const increaseQty = (item) => async (dispatch) => {
	try {
		const newItem = {};

		newItem.product = item.product._id;
		newItem.qty = '+1';

		dispatch({
			type: INCREASE_QTY,
			payload: newItem
		});

		await axios.post('/api/cart/updateqty', newItem, config);
	} catch (err) {}
};

export const clearState = () => (dispatch) => {
	dispatch({
		type: CLEAR_STORE
	});
};
