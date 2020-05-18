import React from 'react';
import './wishlist-item.style.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeFromWishList } from '../../actions/wishlist';

const WishListItem = ({ product, removeFromWishList }) => {
	const { _id, image, name } = product;
	return (
		<div className='wishlist-item'>
			<div className='image-container'>
				<img src={image} alt='item' />
			</div>
			<span className='name'>{name}</span>

			<div className='remove-button' onClick={() => removeFromWishList(_id)}>
				&#10005;
			</div>
		</div>
	);
};

WishListItem.propTypes = {
	removeFromWishList: PropTypes.func.isRequired
};
export default connect(null, { removeFromWishList })(WishListItem);
