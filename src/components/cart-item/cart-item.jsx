import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearItemFromCart, reduceQty, increaseQty } from '../../actions/cart';
import './cart-item.scss';

const CartItem = ({ cartItem, clearItemFromCart, reduceQty, increaseQty }) => {
    let availableqty;
    const { size, qty } = cartItem;
    const { name, price, image, discount } = cartItem.product;

    if (qty < cartItem.product.qty) {
        availableqty = qty;
    } else {
        availableqty = cartItem.product.qty;
    }

    return (
        <div className='checkout-item'>
            <Link
                to={`product/${cartItem.product._id}`}
                className='image-container'
            >
                <img
                    src={`https://quiet-hollows-79620.herokuapp.com/${image}`}
                    alt='item'
                />
            </Link>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div
                    className='arrow'
                    onClick={() =>
                        qty > 1 ? reduceQty(cartItem) : alert('cant')
                    }
                >
                    &#10094;
                </div>
                <span className='value'>{qty}</span>
                <div
                    className='arrow'
                    onClick={() =>
                        availableqty < cartItem.product.qty
                            ? increaseQty(cartItem)
                            : alert('you reached the maximum')
                    }
                >
                    &#10095;
                </div>
            </span>
            <span className='price'>{size}</span>
            <span className='price'>
                {discount ? qty * (price - discount) : qty * price}
            </span>
            <div
                className='remove-button'
                onClick={() => clearItemFromCart(cartItem)}
            >
                &#10005;
            </div>
        </div>
    );
};

CartItem.propTypes = {
    clearItemFromCart: PropTypes.func.isRequired,
    reduceQty: PropTypes.func.isRequired,
    increaseQty: PropTypes.func.isRequired
};

export default connect(null, { clearItemFromCart, reduceQty, increaseQty })(
    CartItem
);
