import { combineReducers } from 'redux';
import products from './products';
import cart from './cart';
import wishlist from './wishlist';

export default combineReducers({
	products,
	cart,
	wishlist
});
