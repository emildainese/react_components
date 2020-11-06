import React from 'react';
import './DropdownToggle.scss';
import Button from '../../../Button/Button';

const DropdownToggle = (props) => {
  return (
    <li className="sidebar-item dropdown-toggle-menu">
      <Button
        className="sidebar-list-item"
        onClick={() => props.toggle()}
        ripple
      >
        <span className="dropdown-toggle">
          {props.name}
          {props.showDropdown ? (
            <i className="fas fa-caret-up"></i>
          ) : (
            <i className="fas fa-caret-down"></i>
          )}
        </span>
        <i className={props.classes}></i>
      </Button>
    </li>
  );
};

export default DropdownToggle;
