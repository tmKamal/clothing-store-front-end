import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector([ selectCart ], (cart) => cart.cartItems);
export const selectCheckoutItems = createSelector([ selectCart ], (cart) => cart.checkoutItems);

export const selectCartItemsCount = createSelector([ selectCartItems ], (cartItems) =>
	cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.qty, 0)
);

export const selectCartTotal = createSelector([ selectCheckoutItems ], (checkoutItems) =>
	checkoutItems.reduce(
		(accumalatedTotal, checkoutItem) =>
			accumalatedTotal + checkoutItem.qty * (checkoutItem.product.price - checkoutItem.product.discount),
		0
	)
);
