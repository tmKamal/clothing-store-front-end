import { ADD_ITEM } from '../actions/types';

const initialState = {
	cartItems: [],
	loading: true
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ADD_ITEM:
			return {
				...state,
				cartItems: [ ...state.cartItems, action.payload ]
			};
		default:
			return state;
	}
}
