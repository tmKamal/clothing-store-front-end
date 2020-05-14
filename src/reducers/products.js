import { GET_PRODUCT, GET_PRODUCTS, PRODUCT_ERROR, CLEAR_PRODUCTS } from '../actions/types';

const initialState = {
	product: null,
	prds: [],
	loading: true,
	errors: {}
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PRODUCT:
			return {
				...state,
				product: payload,
				loading: false
			};
		case GET_PRODUCTS:
			return {
				...state,
				prds: payload,
				loading: false
			};
		case CLEAR_PRODUCTS:
			return {
				...state,
				prds: [],
				loading: true
			};
		case PRODUCT_ERROR:
			return {
				...state,
				prds: [],
				errors: payload,
				loading: false
			};
		default:
			return state;
	}
}
