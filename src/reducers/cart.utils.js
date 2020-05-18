import axios from 'axios';

export const addItemToCart = (cartItems, newItem) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const exsitingitem = cartItems.find((cartItem) => cartItem.product === newItem.product);

	if (exsitingitem) {
		try {
			const item = {};

			item.product = newItem.product;
			item.qty = '+1';
			axios.post('/api/cart/updateqty', item, config);
		} catch (err) {
			console.log('Error');
		}
		return cartItems.map(
			(cartItem) => (cartItem.product === newItem.product ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem)
		);
	}

	try {
		axios.post('/api/cart', newItem, config);
	} catch (err) {
		console.log('error: ' + err);
	}

	return [ ...cartItems, { ...newItem, qty: 1 } ];
};

export const reduceQuantity = (cartItems, cartItemToReduce) => {
	return cartItems.map(
		(cartItem) =>
			cartItem.product === cartItemToReduce.product ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem
	);
};

export const increaseQuantity = (cartItems, cartItemToReduce) => {
	return cartItems.map(
		(cartItem) =>
			cartItem.product === cartItemToReduce.product ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
	);
};

export const reduceCheckoutQuantity = (cartItems, cartItemToReduce) => {
	return cartItems.map(
		(cartItem) =>
			cartItem.product._id === cartItemToReduce.product ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem
	);
};

export const increaseCheckoutQuantity = (cartItems, cartItemToReduce) => {
	return cartItems.map(
		(cartItem) =>
			cartItem.product._id === cartItemToReduce.product ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
	);
};
