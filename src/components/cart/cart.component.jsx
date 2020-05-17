import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingSpinner from '../../Common/components/UIElements/loading-spinner/loading-spinner';
import { loadCartCheckout } from '../../actions/cart';
import { selectCartTotal } from '../../reducers/cart.selectors';
import CartItem from '../cart-item/cart-item';
import './cart.styles.scss';

const Cart = ({ checkoutItems, loading, loadCartCheckout, total }) => {
	useEffect(
		() => {
			loadCartCheckout();
		},
		[ loadCartCheckout ]
	);
	return (
		<div className='checkout-page'>
			<div className='checkout-header'>
				<div className='header-block'>
					<span>Product</span>
				</div>

				<div className='header-block'>
					<span>name</span>
				</div>

				<div className='header-block'>
					<span>Quantity</span>
				</div>
				<div className='header-block'>
					<span>Size</span>
				</div>

				<div className='header-block'>
					<span>Price</span>
				</div>

				<div className='header-block'>
					<span>Remove</span>
				</div>
			</div>

			{loading === true ? (
				<Fragment> {<LoadingSpinner />} </Fragment>
			) : (
				<Fragment>
					{checkoutItems.length == 0 ? (
						<div>no products</div>
					) : (
						<Fragment>
							{checkoutItems.map((cartItem) => <CartItem key={cartItem._id} cartItem={cartItem} />)}
						</Fragment>
					)}
				</Fragment>
			)}

			<div className='total'>
				<span>TOTAL : LKR {total}</span>
			</div>
			{/* <StripeCheckoutButton price={total}/> */}
		</div>
	);
};

Cart.propTypes = {
	loadCartCheckout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	checkoutItems: state.cart.checkoutItems,
	loading: state.cart.loading,
	total: selectCartTotal(state)
});

export default connect(mapStateToProps, { loadCartCheckout })(Cart);
