import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './nav-links.scss';
import { AuthContext } from '../../context/auth-context';
import CartIcon from '../../../components/cart-icon/cart-icon';

const NavLinks = () => {
    const auth = useContext(AuthContext);

    return (
        <ul className='nav-links'>
            

            

            
            {auth.isLoggedIn && (
                <li>
                    <NavLink to='/orders'>My Orders</NavLink>
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
                    <NavLink to='/auth-user'>AUTH</NavLink>
                </li>
            )}

            {auth.isLoggedIn && (
                <li>
                    <NavLink to='/'>
                        <button onClick={auth.logout}>LOG OUT</button>
                    </NavLink>
                </li>
            )}
        </ul>
    );
};
export default NavLinks;
