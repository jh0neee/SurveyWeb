import React from 'react';
import ReactDOM from 'react-dom';

import './SideDrawer.css';

const SideDrawer = (props) => {
    const drawerContent = <aside className='side-drawer'>{props.children}</aside>

    return ReactDOM.createPortal(drawerContent, document.getElementById('drawer'))
};

export default SideDrawer;