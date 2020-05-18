import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCartCheckout, loadCart } from '../../actions/cart';
import { getWishlist, getWishlistDetails } from '../../actions/wishlist';
import { selectCartItemsCount } from '../../reducers/cart.selectors';
import { ReactComponent as ShoppingIcon } from './shopping-bag.svg';
import './cart-icon.styles.css';

const CartIcon = ({ loadCartCheckout, loadCart, itemCount, getWishlist, getWishlistDetails }) => {
	useEffect(
		() => {
			setTimeout(() => {
				loadCartCheckout();
				loadCart();
				getWishlist();
				getWishlistDetails();
			}, 1000);
		},
		[ loadCartCheckout, loadCart ]
	);
	return (
		<Link to='/cart' className='cart-icon'>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{itemCount}</span>
		</Link>
	);
};

CartIcon.propTypes = {
	loadCartCheckout: PropTypes.func.isRequired,
	loadCart: PropTypes.func.isRequired,
	getWishlist: PropTypes.func.isRequired,
	getWishlistDetails: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	itemCount: selectCartItemsCount(state)
});

export default connect(mapStateToProps, { loadCartCheckout, loadCart, getWishlist, getWishlistDetails })(CartIcon);
