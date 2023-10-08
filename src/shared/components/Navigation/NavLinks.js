import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className='nav-links'>
      <li onClick={props.onClick}>
        <NavLink to='/'>홈</NavLink>
      </li>
      <li onClick={props.onClick}>
        <NavLink to={"/survey"}>설문하기</NavLink>
      </li>
      <li onClick={props.onClick}>
        <NavLink to={"/post/new"}>새 글 쓰기</NavLink>
      </li>
      {!auth.isLoggedIn && (
        <li onClick={props.onClick}>
          <NavLink to='/auth'>로그인</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li onClick={props.onClick}>
          <button onClick={auth.logout}>로그아웃</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
