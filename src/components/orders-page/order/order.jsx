import React from 'react';
import OrderItem from '../order-item/order-item';
import { connect } from 'react-redux';
import { setOrderComplete } from '../../../actions/order';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import './order.style.scss';

const Order = ({ orderItem, setOrderComplete }) => {
    return (
        <div className='order-product-wrapper'>
            <div className='ordered-products'>
                {orderItem.products.map((product) => (
                    <OrderItem
                        key={product._id}
                        product={product}
                        orderId={orderItem._id}
                    />
                ))}
            </div>
            <div className='order-details'>
                {orderItem.address.map((a) => (
                    <div className='address' key='a._id'>
                        <span>{a.name}</span>
                        <span>{a.address1}</span>
                        <span>{a.address2}</span>
                        <span>{a.phone}</span>
                    </div>
                ))}
                <div className='other-details'>
                    <span>Total : {orderItem.total} LKR</span>
                    <span>{orderItem.payment}</span>
                    <button
                        onClick={() => setOrderComplete(orderItem._id)}
                        className={`btn ${
                            orderItem.orderCompleted
                                ? 'completed'
                                : 'not-completed'
                        }`}
                        disabled={orderItem.orderCompleted ? true : false}
                    >
                        {orderItem.orderCompleted
                            ? 'Completed'
                            : 'Confirm Delivery'}
                    </button>
                    <span>
                        <Moment format='YYYY/MM/DD'>{orderItem.date}</Moment>
                    </span>
                </div>
            </div>
        </div>
    );
};
Order.propTypes = {
    setOrderComplete: PropTypes.func.isRequired
};
export default connect(null, { setOrderComplete })(Order);
