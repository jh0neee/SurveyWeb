import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import CloseIcon from "../../../asset/image/close.svg";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  
  const openDrawer = () => {
    setDrawerIsOpen(true);
  }
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  }

  return (
    <React.Fragment>
      {drawerIsOpen && (
        <SideDrawer>
          <button className="main-navigation__drawer-btn" onClick={closeDrawer}>
            <img src={CloseIcon} alt='close' />
          </button>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">서베이</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
