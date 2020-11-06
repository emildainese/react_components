import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button';
import './SidebarItem.scss';

const SidebarItem = (props) => {
  const computedStyle = getComputedStyle(props, 0.5);

  const sidebarItem =
    props.htmlElement === 'link' ? (
      <Link to="/" className="sidebar-list-item" style={{ ...computedStyle }}>
        {props.name}
        <i onClick={() => props.clicked()} className={props.classes}></i>
      </Link>
    ) : (
      <Button
        className="sidebar-list-item"
        onClick={() => props.clicked()}
        style={{ ...computedStyle }}
      >
        {props.name}
        <i className={props.classes} onClick={props.toggleSidebar}></i>
      </Button>
    );

  return (
    <li className="sidebar-item" style={{ ...computedStyle }}>
      {sidebarItem}
    </li>
  );
};

export default SidebarItem;

const getComputedStyle = (props, transitionTime = 0.5) => {
  return props.menuType === 'push'
    ? {
        height: `${props.expand ? `${props.menuHeight}rem` : '0rem'}`,
        transition: `height ${transitionTime}s ease-out`,
      }
    : {};
};
