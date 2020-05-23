import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StarRating from '../star-rating/star-rating.component';
import CustomButton from '../custom-button/custom-button.component';
import { addReview } from '../../actions/products';
import { itemReviewd } from '../../actions/order';
import './add-review.style.scss';

const AddReview = ({ product, addReview, rate, orderId, itemReviewd }) => {
    const [formData, setFormData] = useState({
        comment: ''
    });
    const { comment } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const saveReview = () => {
        addReview(product, rate, comment);
    };
    return (
        <div className='add-review'>
            <div className='star-rate-in'>
                <span>Rating : {rate}</span>
                <StarRating size={40} />
            </div>
            <div className='comment'>
                <span>Comment </span>
                <span>
                    <textarea
                        type='text'
                        name='comment'
                        value={comment}
                        rows='4'
                        onChange={(e) => onChange(e)}
                    />

                    <CustomButton
                        onClick={() => {
                            saveReview();
                            itemReviewd(product, orderId);
                        }}
                    >
                        Save
                    </CustomButton>
                </span>
            </div>
        </div>
    );
};

AddReview.propTypes = {
    addReview: PropTypes.func.isRequired,
    itemReviewd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    rate: state.products.rate
});
export default connect(mapStateToProps, { addReview, itemReviewd })(AddReview);
