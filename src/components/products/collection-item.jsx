import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../../actions/cart';
import './collection-item.styles.scss';
import CustomButton from '../custom-button/custom-button.component';

const CollectionItem = ({ product, addItem }) => {
	const { name, price, image, discount } = product;
	return (
		<div className='collection-item'>
			<div
				className='image'
				style={{
					backgroundImage: `url(${image})`
				}}
			/>
			<div className='collection-footer'>
				<span className='name'>{name}</span>

				<span className={`price ${discount ? 'cut' : ''}`}>$ &nbsp;{price}</span>
				{discount ? <span className='discount'>${price - discount}</span> : ''}
			</div>
			<CustomButton onClick={() => addItem(product)} inverted>
				Add to cart{' '}
			</CustomButton>
		</div>
	);
};

CollectionItem.propTypes = {
	addItem: PropTypes.func.isRequired
};

export default connect(null, { addItem })(CollectionItem);
