import axios from 'axios';

import { GET_PRODUCT, GET_PRODUCTS, PRODUCT_ERROR, CLEAR_PRODUCTS, CLEAR_PRODUCT } from './types';

//GET PRODUCTS BY CATEGORY
export const getProducts = (catId) => async (dispatch) => {
	dispatch({
		type: CLEAR_PRODUCTS
	});
	try {
		const res = await axios.get(`/api/product/category/${catId}`);
		dispatch({
			type: GET_PRODUCTS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const getProduct = (prodId) => async (dispatch) => {
	dispatch({
		type: CLEAR_PRODUCT
	});
	try {
		const res = await axios.get(`/api/product/${prodId}`);
		dispatch({
			type: GET_PRODUCT,
			payload: res.data.product
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_ERROR,
			payload: { msg: err.response.statusText }
		});
	}
};
