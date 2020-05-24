import React from 'react';
import Review from './review';
import './view-review.style.scss';

const ViewReviews = ({ ratings }) => {
    return (
        <div className='container view-reviews'>
            <div className='row'>
                {ratings.map((rating) => (
                    <Review key={rating._id} rating={rating}></Review>
                ))}
            </div>
        </div>
    );
};

export default ViewReviews;
