import axios from 'axios';

import { ADD_ITEM } from './types';

const userid = '5eb97b59fea3144078e01d05'; //set user id

export const loadCart = () => async (dispatch) => {};

export const addItem = (item) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const newItem = {};
		newItem.user = userid;
		newItem.product = item._id;
		newItem.size = 'xl';
		newItem.qty = 1;

		const res = await axios.post('/api/cart', newItem, config);
		console.log('added');
	} catch (err) {}
};
