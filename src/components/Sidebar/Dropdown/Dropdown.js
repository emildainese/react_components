import React, { Fragment } from 'react';
import './Dropdown.scss';
import PushMenu from './DropdownMenu/PushMenu/PushMenu';
import SlideMenu from './DropdownMenu/SlideMenu/SlideMenu';
import DropdownToggle from './DropdownToggle/DropdownToggle';
import BlockMenu from './DropdownMenu/BlockMenu/BlockMenu';

const elementHeight = 3.5;

const Dropdown = (props) => {
  let menuHeight = props.dropdownMenu.length * elementHeight;

  let dropdownMenu = null;
  let computedStyle = {};

  switch (props.menuType) {
    case 'slide':
      computedStyle = slideMenuStyle(props, menuHeight);
      dropdownMenu = (
        <SlideMenu
          dropdownMenu={props.dropdownMenu}
          slide={props.showDropdown}
          stroke={menuHeight}
          zIndex={props.stackingContext}
        />
      );
      break;
    case 'push':
      computedStyle = pushMenuStyle(props, menuHeight);
      dropdownMenu = (
        <PushMenu
          dropdownMenu={props.dropdownMenu}
          expand={props.showDropdown}
          menuHeight={menuHeight}
        />
      );
      break;
    case 'block':
      computedStyle = blockMenuStyle(props, menuHeight);
      dropdownMenu = (
        <BlockMenu dropdownMenu={props.dropdownMenu} menuHeight={menuHeight} />
      );
      break;
    default:
      throw new Error('Invalid Dropdown Menu Type');
  }

  return (
    <Fragment>
      <DropdownToggle {...props} />
      <div className="dropdown-menu" style={{ ...computedStyle }}>
        {dropdownMenu}
      </div>
    </Fragment>
  );
};

export default Dropdown;

const pushMenuStyle = (props, menuHeight) => {
  return {
    visibility: `${props.showDropdown ? 'visible' : 'hidden'}`,
    height: `${props.showDropdown ? `${menuHeight}rem` : 0}`,
    backgroundColor: '#222',
  };
};

const slideMenuStyle = (props, menuHeight) => {
  return {
    position: 'relative',
    height: `${props.showDropdown ? `${menuHeight}rem` : 0}`,
  };
};

const blockMenuStyle = (props, menuHeight) => {
  return {
    display: `${props.showDropdown ? 'block' : 'none'}`,
    visibility: `${props.showDropdown ? 'visible' : 'hidden'}`,
    height: `${props.showDropdown ? `${menuHeight}rem` : 0}`,
  };
};
