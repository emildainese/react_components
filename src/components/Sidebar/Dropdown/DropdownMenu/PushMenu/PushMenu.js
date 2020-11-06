import React from 'react';
import './PushMenu.scss';
import DropdownItem from '../../DropdownItem/DropdownItem';

const dropdownItemHeight = 3.5;

const PushMenu = (props) => {
  const computedStyle = {
    height: `${props.expand ? `${props.menuHeight}rem` : '0rem'}`,
    transition: 'height .5s ease-out',
  };

  return (
    <ul className="dropdown-menu-list" style={{ ...computedStyle }}>
      {props.dropdownMenu.map((item, idx) => (
        <DropdownItem
          name={item.name}
          key={idx}
          height={dropdownItemHeight}
          expand={props.expand}
          menuType="push"
        />
      ))}
    </ul>
  );
};

export default PushMenu;
