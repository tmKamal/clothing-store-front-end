import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const Product = ({ props }) => {
	let { id } = useParams();
	return <div>{id}</div>;
};

Product.propTypes = {};

export default Product;
