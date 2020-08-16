import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ReactComponent as WishIcon } from './wishicon.svg';
import { connect } from 'react-redux';
import './wishlist-icon.style.scss';
import { addToWishlist, removeFromWishList } from '../../actions/wishlist';
import { AuthContext } from '../../Common/context/auth-context';

const WishListIcon = ({
    product,
    addToWishlist,
    removeFromWishList,
    wishlistItems
}) => {
    let cls = 'wish';
    const auth = useContext(AuthContext);
    const history = useHistory();

    wishlistItems.map((wishlistItem) => {
        if (product === wishlistItem.product) {
            cls = 'wished';
        }
    });
    return (
        <div className='WishListIcon'>
            {auth.isLoggedIn ? (
                <WishIcon
                    className={cls}
                    onClick={() =>
                        cls === 'wished'
                            ? removeFromWishList(product)
                            : addToWishlist(product)
                    }
                />
            ) : (
                <WishIcon
                    className='wish'
                    onClick={() => history.push('/auth-user')}
                />
            )}
        </div>
    );
};

WishListIcon.propTypes = {
    addToWishlist: PropTypes.func.isRequired,
    removeFromWishList: PropTypes.func.isRequired,
    wishlistItems: PropTypes.array
};

const mapStateToProps = (state) => ({
    wishlistItems: state.wishlist.wishlistItems
});

export default connect(mapStateToProps, { addToWishlist, removeFromWishList })(
    WishListIcon
);
