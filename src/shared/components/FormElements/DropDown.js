import React, { useEffect, useState } from "react";

import './DropDown.css';

const Dropdown = () => {
    const [isActive, setIsActive] = useState(false);

    const handleDropDown = () => {
        setIsActive(!isActive);
    }

    return (
        <div className="dropbox-container">
            <div className="dropdown-select" onClick={handleDropDown}>
                {isActive ? "선택해" : "선택값"}
            </div>
            <Droplist actived={isActive}>
                <ul className='dropdown-menu'>
                    <li>주관식</li>
                    <li>객관식</li>
                    <li>체크박스</li>
                </ul>
            </Droplist>
        </div>
    )
}

const Droplist = (props) => {
    const [activedAnimation, setActivedAnimation] = useState(false);

    useEffect(() => {
        if(props.actived) setActivedAnimation(true);
        else{
            setTimeout(() => {
                setActivedAnimation(false);
            }, 400);
        }
    });

  return (
    <article className={`${props.actived ? 'dropdown-fade-in' : 'dropdown-fade-out'}`}>
        {activedAnimation && props.children}
    </article>
  );
};

export default Dropdown;
