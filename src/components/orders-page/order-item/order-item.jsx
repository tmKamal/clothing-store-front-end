import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FaCheck } from 'react-icons/fa';
import AddReview from '../../add-review/add-review';
import './order-item.style.scss';

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
            <Link to={`product/${product.product._id}`}>
                <img
                    src={product.product.image}
                    className='ordered-product-img'
                    alt='prodcut'
                />
            </Link>
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
                {product.rated ? (
                    <Fragment>
                        <FaCheck color='white' /> &nbsp; Reviewed
                    </Fragment>
                ) : (
                    'Review'
                )}
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

export default OrderItem;
