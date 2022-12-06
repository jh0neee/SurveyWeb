import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = (props) => {
    return <ul className='nav-links' >
        <li onClick={props.onClick}>
            <NavLink to='/' exact>Home</NavLink>
        </li>
        <li onClick={props.onClick}>
            <NavLink to='/survey' exact>Reserch</NavLink>
        </li>
        <li onClick={props.onClick}>
            <NavLink to='/survey/request'>설문요청</NavLink>
        </li>
        <li onClick={props.onClick}>
            <NavLink to='/auth'>로그인</NavLink>
        </li>
    </ul>;
}
 
export default NavLinks;