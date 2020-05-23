import React, { useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { placeOrder } from '../../actions/order';
import { connect } from 'react-redux';
import { AuthContext } from '../../Common/context/auth-context';
import { FaUser, FaAddressCard, FaMobileAlt } from 'react-icons/fa';
import './checkout.style.scss';

const Checkout = ({ checkingItems, loading, placeOrder, processing }) => {
    const auth = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        address1: '',
        address2: '',
        phone: ''
    });

    const { name, address1, address2, phone } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <div className='checkout'>
            {processing === 0 ? (
                ''
            ) : (
                <Fragment>
                    {
                        {
                            1: (
                                <div className='row processing'>
                                    <div className='col-75 processing-text'>
                                        Processing
                                    </div>
                                </div>
                            ),
                            2: (
                                <div className='row processing-success'>
                                    <div className='col-75 processing-text'>
                                        Your order placed! Thank you for
                                        shopping with us!
                                    </div>
                                </div>
                            )
                        }[processing]
                    }
                </Fragment>
            )}

            <div
                className={`row ${processing !== 0 ? 'processing-margin' : ''}`}
            >
                <div className='col-75'>
                    <div className='container'>
                        <form
                            method='POST'
                            onSubmit={(e) => {
                                e.preventDefault();
                                placeOrder(
                                    checkingItems,
                                    formData,
                                    'Cash on delivery'
                                );
                            }}
                        >
                            <div className='row'>
                                <div className='col-50'>
                                    <h3>Shipping Address</h3>
                                    <label htmlFor='fname'>
                                        <FaUser></FaUser> Full Name
                                    </label>
                                    <input
                                        type='text'
                                        value={name}
                                        name='name'
                                        onChange={(e) => onChange(e)}
                                        placeholder='John M. Doe'
                                        required
                                    />
                                    <label htmlFor='phone'>
                                        <FaMobileAlt />
                                        Mobile number
                                    </label>
                                    <input
                                        type='text'
                                        value={phone}
                                        name='phone'
                                        onChange={(e) => onChange(e)}
                                        placeholder='0711235432'
                                        required
                                    />
                                    <label htmlFor='adr'>
                                        <FaAddressCard />
                                        Address
                                    </label>
                                    <input
                                        type='text'
                                        value={address1}
                                        name='address1'
                                        onChange={(e) => onChange(e)}
                                        placeholder='542 W. 15th Street'
                                        required
                                    />
                                    <label htmlFor='address2'>
                                        <FaAddressCard />
                                        Address Line 2
                                    </label>
                                    <input
                                        type='text'
                                        name='address2'
                                        value={address2}
                                        onChange={(e) => onChange(e)}
                                        placeholder='street'
                                    />
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

Checkout.propTypes = {
    placeOrder: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    checkingItems: state.order.checkingItems,
    loading: state.order.loading,
    processing: state.order.processing
});

export default connect(mapStateToProps, { placeOrder })(Checkout);
