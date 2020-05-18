import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCartCheckout, loadCart } from '../../actions/cart';
import { selectCartItemsCount } from '../../reducers/cart.selectors';
import { ReactComponent as ShoppingIcon } from './shopping-bag.svg';
import './cart-icon.styles.css';

const CartIcon = ({ loadCartCheckout, loadCart, itemCount }) => {
	useEffect(
		() => {
			setTimeout(() => {
				loadCartCheckout();
				loadCart();
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
	loadCart: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	itemCount: selectCartItemsCount(state)
});

export default connect(mapStateToProps, { loadCartCheckout, loadCart })(CartIcon);
