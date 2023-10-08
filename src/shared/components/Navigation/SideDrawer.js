import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const drawerContent = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit>
      <aside className='side-drawer'>{props.children}</aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(
    drawerContent,
    document.getElementById("drawer")
  );
};

export default SideDrawer;
