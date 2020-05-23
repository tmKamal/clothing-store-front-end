import React, { useState } from 'react';
import Modal from 'react-modal';
import AddReview from '../../add-review/add-review';
import './order-item.style.scss';
import PropTypes from 'prop-types';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
const OrderItem = ({ product, orderId }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    return (
        <div className='ordered-product'>
            <img src={product.product.image} className='ordered-product-img' />
            <br />
            <span className='ordered-product-name'>
                {' '}
                {product.product.name}
            </span>
            <br></br>
            <button
                className={`btn ${product.rated ? 'reviewed' : 'review'}`}
                onClick={() => setIsOpen(!modalIsOpen)}
                disabled={product.rated ? true : false}
            >
                {product.rated ? 'Reviewed' : 'Review'}
            </button>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
            >
                <div
                    className='react-modal-close-button'
                    onClick={() => setIsOpen(false)}
                >
                    &#9932;
                </div>
                <AddReview product={product.product._id} orderId={orderId} />
            </Modal>
        </div>
    );
};

OrderItem.propTypes = {};

export default OrderItem;
