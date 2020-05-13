import React from 'react';
import { Link } from 'react-router-dom';
import './category-item.scss';


const CategoryItem = (props) => {
	console.log(props);
	return (
		<Link className={`menu-item`} to={`/cat/${props.id}`} key={props.id}>
			<div
				className='background-img'
				style={{
					backgroundImage: `url(http://localhost:9000/${props.image})`
				}}
			/>
			<div className='content'>
				<h1 className='title'>{props.name}</h1>
				<span className='subtitle'>SHOP NOW</span>
			</div>
		</Link>
	);

};

export default CategoryItem;
