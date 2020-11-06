import React from 'react';
import './DropdownItem.scss';

const DropdownItem = (props) => {
  const computedStyle =
    props.menuType === 'push'
      ? pushMenuStyle(props, 0.5)
      : slideMenuStyle(props, 0.5);

  return (
    <li className="dropdown-menu-item" style={{ ...computedStyle }}>
      <button style={{ ...computedStyle }}>{props.name}</button>
    </li>
  );
};

export default DropdownItem;

const pushMenuStyle = (props, transitionTime) => {
  return {
    height: `${props.expand ? `${props.height}rem` : 0}`,
    visibility: `${props.expand ? 'visible' : 'none'}`,
    opacity: `${props.expand ? 1 : 0}`,
    color: `${props.expand ? '#fafafa' : '#222'}`,
    transition: `height ${transitionTime}s ease-out, 
                 visibility ${transitionTime}s ease-out, 
                 opacity ${transitionTime - 0.2}s ease-out .1s, 
                 background-color ${transitionTime}s ease-out, 
                 color ${transitionTime}s ease-out`,
  };
};

const slideMenuStyle = (props, transitionTime) => {
  return {
    height: `${props.height}rem`,
    transition: `background-color ${transitionTime}s ease-out`,
  };
};
