import {
	ADD_ITEM,
	LOAD_CART,
	LOAD_CART_CHECKOUT,
	CLEAR_ITEM_FROM_CART,
	REDUCE_QTY,
	INCREASE_QTY,
	CLEAR_STORE
} from '../actions/types';
import {
	addItemToCart,
	reduceQuantity,
	reduceCheckoutQuantity,
	increaseCheckoutQuantity,
	increaseQuantity
} from './cart.utils';

const initialState = {
	cartItems: [],
	checkoutItems: [],
	loading: true
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOAD_CART_CHECKOUT:
			return {
				...state,
				checkoutItems: payload,
				loading: false
			};
		case LOAD_CART:
			return {
				...state,
				cartItems: payload,
				loading: false
			};
		case ADD_ITEM:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, payload),
				loading: true
			};
		case CLEAR_ITEM_FROM_CART:
			return {
				...state,
				cartItems: state.cartItems.filter((cartItem) => cartItem.product !== payload.product),
				checkoutItems: state.checkoutItems.filter(
					(checkoutItem) => checkoutItem.product._id !== payload.product
				)
			};
		case REDUCE_QTY:
			return {
				...state,
				cartItems: reduceQuantity(state.cartItems, payload),
				checkoutItems: reduceCheckoutQuantity(state.checkoutItems, payload)
			};
		case INCREASE_QTY: {
			return {
				...state,
				cartItems: increaseQuantity(state.cartItems, payload),
				checkoutItems: increaseCheckoutQuantity(state.checkoutItems, payload)
			};
		}
		case CLEAR_STORE:
			return {
				initialState
			};
		default:
			return state;
	}
}
