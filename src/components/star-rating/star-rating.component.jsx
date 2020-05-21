import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./star-rating.styles.scss";
import PropTypes from "prop-types";

const StarRating = ({ size, rate, disable }) => {
  const [rating, setRating] = useState(rate);
  const [hover, setHover] = useState(null);
  const disabled = disable;
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingVal = i + 1;
        return (
          <label>
            <input
              type='radio'
              name='ratingstar'
              value={ratingVal}
              onClick={() => setRating(ratingVal)}
              disabled={disabled}
            />
            <FaStar
              className='star'
              color={ratingVal <= (hover || rating) ? "#ffc107" : "#efe5e9"}
              size={size}
              onMouseEnter={() => setHover(ratingVal)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {};

export default StarRating;
