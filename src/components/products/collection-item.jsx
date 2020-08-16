import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AuthContext } from '../../Common/context/auth-context';
import { addItem, loadCart } from '../../actions/cart';
import StarRating from '../star-rating/star-rating.component';
import WishListIcon from '../wishlist-icon/wishlist-icon';
import CustomButton from '../custom-button/custom-button.component';
import './collection-item.styles.scss';

const CollectionItem = ({ product, addItem }) => {
    const auth = useContext(AuthContext);
    const { name, price, image, discount } = product;
    let all = 0;

    if (product.rating.length > 0) {
        let c = product.rating.reduce((pre, next) => pre + next.rate, 0);
        c = c / product.rating.length;
        all = Math.round(c * 10) / 10;
    }
    return (
        <div className='collection-item'>
            <span className='col-item-rating'>
                {' '}
                <StarRating
                    size={20}
                    rate={Math.round(all)}
                    disable={true}
                />{' '}
                {all}
            </span>
            <WishListIcon product={product.id} />
            <Link
                to={`/product/${product._id}`}
                className='image'
                style={{
                    backgroundImage: `url(https://quiet-hollows-79620.herokuapp.com/${image})`
                }}
            />
            <div className='collection-footer'>
                <span className='name'>{name}</span>

                <span className={`price ${discount ? 'cut' : ''}`}>
                    $ &nbsp;{price}
                </span>
                {discount ? (
                    <span className='discount'>${price - discount}</span>
                ) : (
                    ''
                )}
            </div>
            <CustomButton
                onClick={() => {
                    auth.isLoggedIn
                        ? addItem(product)
                        : (window.location.href = '/auth-user');
                }}
                inverted
            >
                Add to cart{' '}
            </CustomButton>
        </div>
    );
};

CollectionItem.propTypes = {
    addItem: PropTypes.func.isRequired
};

export default connect(null, { addItem, loadCart })(CollectionItem);
