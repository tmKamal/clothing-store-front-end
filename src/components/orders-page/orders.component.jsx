import React from 'react';
import PropTypes from 'prop-types';
import { getOrderedItems } from '../../actions/order';
import Order from './order/order';
import { connect } from 'react-redux';
import './orderspage.style.scss';

const OrdersPage = ({ props, getOrderedItems, orderedItems, loading }) => {
    if (loading) {
        setTimeout(() => {
            getOrderedItems();
        }, 1000);
    }

    return (
        <div className='order-page'>
            {orderedItems.map((item) => (
                <Order key={item._id} orderItem={item} />
            ))}
        </div>
    );
};

OrdersPage.propTypes = {
    getOrderedItems: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    orderedItems: state.order.orderedItems,
    loading: state.order.orderLoading
});

export default connect(mapStateToProps, { getOrderedItems })(OrdersPage);
