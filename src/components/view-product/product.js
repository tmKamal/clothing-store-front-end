import React, { useEffect, Fragment, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { AuthContext } from '../../Common/context/auth-context';
import { FaCcVisa } from 'react-icons/fa';
import { addItem } from '../../actions/cart';
import { getProduct } from '../../actions/products';
import WishListIcon from '../wishlist-icon/wishlist-icon';
import CustomButton from '../custom-button/custom-button.component';
import { checkout } from '../../actions/order';
import StarRating from '../star-rating/star-rating.component';
import ViewReviews from '../view-reviews/view-review';
import './product.styles.scss';

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

const Product = ({
    product,
    productLoading,
    getProduct,
    addItem,
    checkout
}) => {
    const auth = useContext(AuthContext);
    let price = 1;
    let total = 1;
    let all = 0;
    let { id } = useParams();
    const [qty, changeQty] = useState(1);
    const [size, changeSize] = useState('L');
    const [modalIsOpen, setIsOpen] = useState(false);
    if (!productLoading && product.discount) {
        price = product.price - product.discount;
        total = price * qty;
    }
    const changeTotal = () => {
        total = price * qty;
    };

    const onChange = (e) => {
        if (e.target.value > product.qty) {
            changeQty(product.qty);
        } else {
            changeQty(e.target.value);
        }
        changeTotal();
    };

    if (!productLoading && product.rating.length > 0) {
        let c = product.rating.reduce((pre, next) => pre + next.rate, 0);
        c = c / product.rating.length;
        all = Math.round(c * 10) / 10;
    }

    useEffect(() => {
        getProduct(id);
    }, [getProduct, id]);

    return (
        <Fragment>
            <div className='view-product-wrapper'>
                <div className='view-product'>
                    {productLoading ? (
                        <div>Loading</div>
                    ) : (
                        <Fragment>
                            <div
                                className='product-image'
                                style={{
                                    backgroundImage: `url(${product.image})`
                                }}
                            />
                            <div className='product-details'>
                                <span className='title'>
                                    {product.category.name} - {product.name}{' '}
                                    {product.qty <= 30 ? (
                                        <span className='hot-product'>
                                            HOT ITEM
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </span>

                                <span className='review-count'>
                                    <StarRating
                                        size={20}
                                        disable={true}
                                        rate={Math.round(all)}
                                    />
                                    {product.rating.length === 0
                                        ? 'No reviews yet'
                                        : `${all} rating with ${product.rating.length} reviews`}{' '}
                                </span>
                                <br />
                                <span className='availableqty'>
                                    {product.qty <= 30 ? 'Only ' : ''}
                                    {product.qty} - Items available{' '}
                                </span>
                                <span className='price'>
                                    {product.discount ? (
                                        <span>
                                            {' '}
                                            Discounted price{' '}
                                            <span className='cutprice'>
                                                LKR {product.price}
                                            </span>
                                        </span>
                                    ) : (
                                        ''
                                    )}{' '}
                                    <span
                                        className={
                                            product.discount ? 'newprice' : ''
                                        }
                                    >
                                        LKR{' '}
                                        {product.discount
                                            ? product.price - product.discount
                                            : product.price}
                                    </span>
                                </span>

                                <span className='size'>
                                    <span>Size</span>

                                    <span
                                        className={`size-option ${
                                            size === 'S' ? 'selected' : ''
                                        }`}
                                        onClick={() => changeSize('S')}
                                    >
                                        S
                                    </span>
                                    <span
                                        className={`size-option ${
                                            size === 'M' ? 'selected' : ''
                                        }`}
                                        onClick={() => changeSize('M')}
                                    >
                                        M
                                    </span>
                                    <span
                                        className={`size-option ${
                                            size === 'L' ? 'selected' : ''
                                        }`}
                                        onClick={() => changeSize('L')}
                                    >
                                        L
                                    </span>
                                    <span
                                        className={`size-option ${
                                            size === 'XL' ? 'selected' : ''
                                        }`}
                                        onClick={() => changeSize('XL')}
                                    >
                                        XL
                                    </span>
                                    <span
                                        className={`size-option ${
                                            size === 'XXL' ? 'selected' : ''
                                        }`}
                                        onClick={() => changeSize('XXL')}
                                    >
                                        XXL
                                    </span>
                                </span>

                                <span className='qty'>
                                    Quantity{' '}
                                    <input
                                        className={`qty-input ${
                                            qty >= product.qty ? 'exceed' : ''
                                        }`}
                                        type='number'
                                        name='qty'
                                        value={qty}
                                        onChange={(e) => onChange(e)}
                                        min={1}
                                        max={product.qty}
                                    />
                                </span>
                                <div className='wrapper'>
                                    <div className='addtocart-button'>
                                        <CustomButton
                                            onClick={() => {
                                                auth.isLoggedIn
                                                    ? addItem(
                                                          product,
                                                          size,
                                                          qty
                                                      )
                                                    : (window.location.href =
                                                          '/auth-user');
                                            }}
                                        >
                                            Add to cart
                                        </CustomButton>
                                        <CustomButton
                                            inverted
                                            onClick={() => {
                                                auth.isLoggedIn
                                                    ? setIsOpen(!modalIsOpen)
                                                    : (window.location.href =
                                                          '/auth-user');
                                            }}
                                        >
                                            Buy now
                                        </CustomButton>
                                        <WishListIcon
                                            classname='wishlist-icon'
                                            product={id}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setIsOpen(false)}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div
                        className='modal-close-button'
                        onClick={() => setIsOpen(false)}
                    >
                        &#9932;
                    </div>

                    <CustomButton>
                        <FaCcVisa className='facard' size={30} /> CARD
                    </CustomButton>

                    <Link
                        to='/checkout'
                        onClick={() => checkout(product, qty, size, total)}
                    >
                        <CustomButton>CASH ON DELIVEY</CustomButton>
                    </Link>
                </Modal>

                {/* {!productLoading && product.rating.length ? (
                    <ViewReviews ratings={product.rating} />
                ) : (
                    <div className='no-reviews'>
                        <span>No reviews yet</span>
                    </div>
                )} */}

                {!productLoading ? (
                    product.rating.length ? (
                        <ViewReviews ratings={product.rating} />
                    ) : (
                        <div className='no-reviews'>
                            <span>No reviews yet</span>
                        </div>
                    )
                ) : (
                    ''
                )}
            </div>
        </Fragment>
    );
};

Product.propTypes = {
    getProduct: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    checkout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    product: state.products.product,
    productLoading: state.products.productLoading
});

export default connect(mapStateToProps, { getProduct, addItem, checkout })(
    Product
);
