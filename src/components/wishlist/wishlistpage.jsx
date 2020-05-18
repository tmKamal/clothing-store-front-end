import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getWishlistDetails, removeFromWishList } from '../../actions/wishlist';
import LoadingSpinner from '../../Common/components/UIElements/loading-spinner/loading-spinner';
import WishListItem from './wishlist-item';
import PropTypes from 'prop-types';
import './wishlistpage.style.scss';

function WishListPage ({ wishlistDetails, loading, getWishlistDetails, removeFromWishList }) {
	useEffect(
		() => {
			getWishlistDetails();
		},
		[ getWishlistDetails ]
	);
	return (
		<div className='wishlist-page'>
			{loading === true ? (
				<Fragment>
					{' '}
					<LoadingSpinner />{' '}
				</Fragment>
			) : (
				<Fragment>
					{wishlistDetails.length == 0 ? (
						<div>no products</div>
					) : (
						<Fragment>
							<div className='wishlist-header'>
								<div className='header-block'>
									<span>Product</span>
								</div>

								<div className='header-block'>
									<span>name</span>
								</div>

								<div className='header-block'>
									<span>Add</span>
								</div>
							</div>
							{wishlistDetails.map((wishItem) => (
								<WishListItem key={wishItem.product._id} product={wishItem.product} />
							))}
						</Fragment>
					)}
				</Fragment>
			)}
		</div>
	);
}

WishListPage.propTypes = {
	getWishlistDetails: PropTypes.func.isRequired,
	removeFromWishList: PropTypes.func.isRequired,
	wishlistDetails: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
	wishlistDetails: state.wishlist.wishlistDetailedItems,
	loading: state.wishlist.loading
});
export default connect(mapStateToProps, { getWishlistDetails, removeFromWishList })(WishListPage);
