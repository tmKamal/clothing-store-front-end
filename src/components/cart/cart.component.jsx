import React, { Fragment, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingSpinner from '../../Common/components/UIElements/loading-spinner/loading-spinner';
import { loadCartCheckout } from '../../actions/cart';
import { selectCartTotal } from '../../reducers/cart.selectors';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item';
import { checkout } from '../../actions/order';
import { AuthContext } from '../../Common/context/auth-context';
import './cart.styles.scss';

const Cart = ({
    checkoutItems,
    loading,
    loadCartCheckout,
    total,
    checkout
}) => {
    useEffect(() => {
        setTimeout(() => {
            loadCartCheckout();
        }, 500);
    }, [loadCartCheckout]);
    const auth = useContext(AuthContext);

    return (
        <div className='checkout-page'>
            {auth.isLoggedIn ? (
                <Fragment>
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
                            {checkoutItems.length === 0 ? (
                                <div>no products</div>
                            ) : (
                                <Fragment>
                                    {checkoutItems.map((cartItem) => (
                                        <CartItem
                                            key={cartItem._id}
                                            cartItem={cartItem}
                                        />
                                    ))}
                                </Fragment>
                            )}
                            <div className='total'>
                                <span>TOTAL : LKR {total}</span>
                            </div>
                            {/* <StripeCheckoutButton price={total}/> */}

                            
                                <Link
                                    to='/checkout'
                                    onClick={() =>
                                        checkout(
                                            checkoutItems,
                                            null,
                                            null,
                                            total
                                        )
                                    }
                                >
                                    {' '}<CustomButton>Buy now</CustomButton>
                                    
                                </Link>
                            
                        </Fragment>
                    )}
                </Fragment>
            ) : (
                ' '
            )}
        </div>
    );
};

Cart.propTypes = {
    loadCartCheckout: PropTypes.func.isRequired,
    checkout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    checkoutItems: state.cart.checkoutItems,
    loading: state.cart.loading,
    total: selectCartTotal(state)
});

export default connect(mapStateToProps, { loadCartCheckout, checkout })(Cart);
