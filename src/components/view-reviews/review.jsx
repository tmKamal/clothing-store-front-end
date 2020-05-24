import React from 'react';
import StarRating from '../star-rating/star-rating.component';
import './review.style.scss';

const Review = ({ rating }) => {
    return (
        <div className='col-md-6 rating-component'>
            <div className='row'>
                <div
                    className='col-4 user-image'
                    style={{
                        backgroundImage: `url(${rating.userId.image})`
                    }}
                ></div>
                <div className='col-8'>
                    {' '}
                    <span className='row'>
                        <span className='col-12 username'>
                            {rating.userId.name}{' '}
                            <span className='rating'>
                                - {rating.rate} star rating
                            </span>
                        </span>
                        <span className='col-12 rating'>
                            <StarRating rate={rating.rate} disable={true} />
                        </span>
                    </span>
                    <span className='row comment'>{rating.comment}</span>
                </div>
            </div>
        </div>
    );
};

export default Review;
