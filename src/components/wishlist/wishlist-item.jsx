import React, { useContext, Fragment } from 'react';
import './wishlist-item.style.scss';
import { connect } from 'react-redux';

import { AuthContext } from '../../Common/context/auth-context';

import { addItem } from '../../actions/cart';
import PropTypes from 'prop-types';
import CustomButton from '../custom-button/custom-button.component';

import { removeFromWishList } from '../../actions/wishlist';

const WishListItem = ({ product, removeFromWishList, addItem }) => {
    const { _id, image, name } = product;
    const auth = useContext(AuthContext);

    return (
        <Fragment>
            <div className='wishlist-item'>
                <div className='image-container'>
                    <img src={image} alt='item' />
                </div>
                <span className='name'>{name}</span>
                <div className='addtocart-button'>
                    <CustomButton
                        onClick={() => {
                            auth.isLoggedIn
                                ? addItem(product, 'M', 1)
                                : (window.location.href = '/auth-user');
                        }}
                    >
                        Add to cart
                    </CustomButton>
                </div>
                <div
                    className='remove-button'
                    onClick={() => removeFromWishList(_id)}
                >
                    &#10005;
                </div>
            </div>
        </Fragment>
    );
};

WishListItem.propTypes = {
    removeFromWishList: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired
};
export default connect(null, { removeFromWishList, addItem })(WishListItem);
