import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/products';
import CollectionItem from './collection-item';
import LoadingSpinner from '../../Common/components/UIElements/loading-spinner/loading-spinner';
import './productsByCat.style.scss';

const ProductsByCat = ({ getProducts, products: { prds, loading } }) => {
	let { id } = useParams();
	useEffect(
		() => {
			getProducts(id);
		},
		[ getProducts, id ]
	);
	let a = null;
	if (!loading) {
		a = Object.values(prds);
	}

	return (
		<Fragment>
			{loading ? (
				<LoadingSpinner />
			) : (
				<Fragment>
					<h1 className='text primary'>Products</h1>
					{a.length === 0 ? (
						<div>No products</div>
					) : (
						<div className='flex-container'>
							{a.map((product) => product.map((k) => <CollectionItem key={k.id} product={k} />))}
						</div>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

ProductsByCat.propTypes = {
	getProducts: PropTypes.func.isRequired,
	products: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	products: state.products
});

export default connect(mapStateToProps, { getProducts })(ProductsByCat);
