import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
    const auth = useContext(AuthContext)

    return <ul className='nav-links' >
        <li onClick={props.onClick}>
            <NavLink to='/' exact>Home</NavLink>
        </li>
        <li onClick={props.onClick}>
            <NavLink to='/survey' exact>Reserch</NavLink>
        </li>
        <li onClick={props.onClick}>
            <NavLink to='/survey/request' exact>Request</NavLink>
        </li>
        {!auth.isLoggedIn && <li onClick={props.onClick}>
            <NavLink to='/auth'>Login</NavLink>
        </li>}
        {auth.isLoggedIn && <li onClick={props.onClick}>
            <button onClick={auth.logout}>Logout</button>    
        </li>}
    </ul>;
}
 
export default NavLinks;