import React from 'react';

import DropdownItem from '../../DropdownItem/DropdownItem';
const dropdownItemHeight = 3.5;

const BlockMenu = (props) => {
  return (
    <ul className="dropdown-menu-list">
      {props.dropdownMenu.map((item, idx) => (
        <DropdownItem
          name={item.name}
          key={idx}
          height={dropdownItemHeight}
          menuType="block"
        />
      ))}
    </ul>
  );
};

export default BlockMenu;
