import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './star-rating.styles.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setRate } from '../../actions/products';

const StarRating = ({ size, rate, disable, setRate }) => {
    const [rating, setRating] = useState(rate);
    const [hover, setHover] = useState(null);
    const disabled = disable;

    const setRateOf = (val) => {
        setRating(val);
        setRate(val);
    };
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingVal = i + 1;
                return (
                    <label key={i}>
                        <input
                            type='radio'
                            name='ratingstar'
                            value={ratingVal}
                            onClick={() => setRateOf(ratingVal)}
                            disabled={disabled}
                        />
                        <FaStar
                            className='star'
                            color={
                                ratingVal <= (hover || rating)
                                    ? '#ffc107'
                                    : '#efe5e9'
                            }
                            size={size}
                            onMouseEnter={() => {
                                !disabled
                                    ? setHover(ratingVal)
                                    : setHover(null);
                            }}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

StarRating.propTypes = {
    setRate: PropTypes.func.isRequired
};

export default connect(null, { setRate })(StarRating);
