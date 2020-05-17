import axios from 'axios';

import { ADD_ITEM, LOAD_CART, LOAD_CART_CHECKOUT, CLEAR_ITEM_FROM_CART, REDUCE_QTY, INCREASE_QTY } from './types';

let userid; //set user id
const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};
export const loadCart = () => async (dispatch) => {
	if (window.localStorage.getItem('adminId') !== null) {
		userid = localStorage.getItem('adminId');
	} else {
		window.location.href = '/auth';
	}
	try {
		const body = {};
		body.user = userid;

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
	if (window.localStorage.getItem('adminId') !== null) {
		userid = localStorage.getItem('adminId');
	} else {
		window.location.href = '/auth';
	}
	try {
		const body = {};
		body.user = userid;

		const res = await axios.post('/api/cart/loadcheckout', body, config);

		dispatch({
			type: LOAD_CART_CHECKOUT,
			payload: res.data
		});
	} catch (err) {}
};

export const addItem = (item, size = 'm') => async (dispatch) => {
	if (window.localStorage.getItem('adminId') !== null) {
		userid = localStorage.getItem('adminId');
	} else {
		window.location.href = '/auth';
	}
	loadCart();
	try {
		const newItem = {};
		newItem.user = userid;
		newItem.product = item._id;
		newItem.size = size;
		newItem.qty = 1;

		dispatch({
			type: ADD_ITEM,
			payload: newItem
		});
	} catch (err) {}
};

export const clearItemFromCart = (item) => async (dispatch) => {
	if (window.localStorage.getItem('adminId') !== null) {
		userid = localStorage.getItem('adminId');
	} else {
		window.location.href = '/auth';
	}
	try {
		const newItem = {};
		newItem.user = userid;
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
	if (window.localStorage.getItem('adminId') !== null) {
		userid = localStorage.getItem('adminId');
	} else {
		window.location.href = '/auth';
	}
	try {
		const newItem = {};
		newItem.user = userid;
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
	if (window.localStorage.getItem('adminId') !== null) {
		userid = localStorage.getItem('adminId');
	} else {
		window.location.href = '/auth';
	}
	try {
		const newItem = {};
		newItem.user = userid;
		newItem.product = item.product._id;
		newItem.qty = '+1';

		dispatch({
			type: INCREASE_QTY,
			payload: newItem
		});

		await axios.post('/api/cart/updateqty', newItem, config);
	} catch (err) {}
};
