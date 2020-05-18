import { GET_WISHLIST, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, GET_WISHLIST_DETAILS } from '../actions/types';

const initialState = {
	wishlistItems: [],
	wishlistDetailedItems: [],
	loading: true
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_WISHLIST:
			return {
				...state,
				wishlistItems: payload
			};
		case ADD_TO_WISHLIST:
			return {
				...state,
				wishlistItems: [ ...state.wishlistItems, payload ]
			};
		case GET_WISHLIST_DETAILS:
			return {
				...state,
				wishlistDetailedItems: payload,
				loading: false
			};
		case REMOVE_FROM_WISHLIST:
			return {
				...state,
				wishlistItems: state.wishlistItems.filter((item) => item.product !== payload.product),
				wishlistDetailedItems: state.wishlistDetailedItems.filter(
					(item) => item.product._id !== payload.product
				)
			};
		default:
			return state;
	}
}
