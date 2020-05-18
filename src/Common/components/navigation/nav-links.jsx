import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './nav-links.scss';
import { AuthContext } from '../../context/auth-context';
import CartIcon from '../../../components/cart-icon/cart-icon';

const NavLinks = () => {
	const auth = useContext(AuthContext);

	return (
		<ul className='nav-links'>
			<li>
				<NavLink to='/users' exact>
					ALL USERS
				</NavLink>
			</li>

			{auth.isLoggedIn && (
				<li>
					<NavLink to='/new-category'>Add Category</NavLink>
				</li>
			)}

			{auth.isLoggedIn && (
				<li>
					<NavLink to='/new-product'>Add Products</NavLink>
				</li>
			)}

			{auth.isLoggedIn && (
				<li>
					<NavLink to='/wishlist'>Wishlist</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<CartIcon />
				</li>
			)}

			{!auth.isLoggedIn && (
				<li>
					<NavLink to='/auth'>AUTH</NavLink>
				</li>
			)}

			{auth.isLoggedIn && (
				<li>
					<NavLink to='/auth'>
						<button onClick={auth.logout}>LOG OUT</button>
					</NavLink>
				</li>
			)}
		</ul>
	);
};
export default NavLinks;
