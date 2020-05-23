import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaUser, FaAddressCard, FaCity } from 'react-icons/fa';
import './checkout.style.scss';

const Checkout = ({ checkingItems, loading }) => {
    return (
        <div className='checkout'>
            <div className='row'>
                <div className='col-75'>
                    <div className='container'>
                        <form action='/action_page.php'>
                            <div className='row'>
                                <div className='col-50'>
                                    <h3>Shipping Address</h3>
                                    <label htmlFor='fname'>
                                        <FaUser></FaUser> Full Name
                                    </label>
                                    <input
                                        type='text'
                                        id='fname'
                                        name='firstname'
                                        placeholder='John M. Doe'
                                    />

                                    <label htmlFor='adr'>
                                        <FaAddressCard />
                                        Address
                                    </label>
                                    <input
                                        type='text'
                                        id='adr'
                                        name='address'
                                        placeholder='542 W. 15th Street'
                                    />
                                    <label htmlFor='adr2'>
                                        <FaAddressCard />
                                        Address Line 2
                                    </label>
                                    <input
                                        type='text'
                                        name='adr2'
                                        placeholder='street'
                                    />
                                    <label htmlFor='city'>
                                        <FaCity /> City
                                    </label>
                                    <input
                                        type='text'
                                        id='city'
                                        name='city'
                                        placeholder='New York'
                                    />

                                    <div className='row'>
                                        <div className='col-50'>
                                            <label htmlFor='state'>State</label>
                                            <input
                                                type='text'
                                                id='state'
                                                name='state'
                                                placeholder='NY'
                                            />
                                        </div>
                                        <div className='col-50'>
                                            <label htmlFor='zip'>Zip</label>
                                            <input
                                                type='text'
                                                id='zip'
                                                name='zip'
                                                placeholder='10001'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input
                                type='submit'
                                value='place order'
                                className='btn'
                            />
                        </form>
                    </div>
                </div>
                <div className='col-25'>
                    <div className='container'>
                        <h4 className='cart-checkout'>
                            <span className='cart-title'>Cart</span>{' '}
                            <span className='qty'> qty</span>
                            <span className='price'>lkr</span>
                        </h4>
                        {loading ? (
                            (window.location.href = '/')
                        ) : checkingItems.products.length > 0 ? (
                            checkingItems.products.map((product) => (
                                <p
                                    className='cart-checkout'
                                    key={product.product._id}
                                >
                                    <Link
                                        to={`/product/${product.product._id}`}
                                        className='cart-title'
                                    >
                                        {product.product.name}
                                    </Link>{' '}
                                    <span>{product.qty}</span>
                                    <span className='price'>
                                        {product.price * product.qty}
                                    </span>
                                </p>
                            ))
                        ) : (
                            <p
                                className='cart-checkout'
                                key={checkingItems.products._id}
                            >
                                <Link
                                    to={`/product/${checkingItems.products._id}`}
                                    className='cart-title'
                                >
                                    {checkingItems.products.name}
                                </Link>{' '}
                                <span>{checkingItems.qty}</span>
                                <span className='price'>
                                    {checkingItems.price * checkingItems.qty}
                                </span>
                            </p>
                        )}

                        <hr />
                        <p>
                            Total{' '}
                            <span className='price'>
                                <b>{checkingItems.total}</b>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Checkout.propTypes = {};

const mapStateToProps = (state) => ({
    checkingItems: state.order.checkingItems,
    loading: state.order.loading
});

export default connect(mapStateToProps)(Checkout);
