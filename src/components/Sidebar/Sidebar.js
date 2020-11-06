import React, { useState } from 'react';
import './Sidebar.scss';

import SidebarItem from './SidebarItem/SidebarItem';
import Dropdown from './Dropdown/Dropdown';

const Sidebar = (props) => {
  const [showMaterialDropdown, setShowMaterialDropdown] = useState(false);
  const [showMoldDropdown, setShowMoldDropdown] = useState(false);

  const toggleMaterialDropdown = () => {
    setShowMaterialDropdown(!showMaterialDropdown);
  };

  const toggleMoldDropdown = () => {
    setShowMoldDropdown(!showMoldDropdown);
  };

  //const test = () => console.log('Click Button');

  const sidebarItems = [
    {
      type: 'sb-header',
      htmlElementType: 'button',
      name: 'Menu',
      iconClasses: 'fas fa-times',
      action: {
        clicked: () => {},
      },
    },
    {
      type: 'sb-dropdown',
      menuType: 'slide',
      htmlElementType: 'button',
      dropdownConfig: materialDropdownMenu,
      name: 'Material',
      iconClasses: 'fas fa-atom',
      action: {
        showDropdown: showMaterialDropdown,
        toggleDropdown: toggleMaterialDropdown,
        clicked: () => {},
      },
    },
    {
      type: 'sb-item',
      htmlElementType: 'link',
      name: 'Molding Department',
      iconClasses: 'fas fa-wave-square',
      action: {
        clicked: () => {}, //Show Material Modal
      },
    },
    {
      type: 'sb-item',
      htmlElementType: 'button',
      name: 'Process Setting',
      iconClasses: 'fas fa-syringe',
      action: {
        clicked: () => {}, //Show Process Modal
      },
    },
    {
      type: 'sb-dropdown',
      menuType: 'slide',
      htmlElementType: 'button',
      dropdownConfig: moldDropdownMenu,
      name: 'Mold Design',
      iconClasses: 'fas fa-cogs',
      action: {
        showDropdown: showMoldDropdown,
        toggleDropdown: toggleMoldDropdown,
        clicked: () => {},
      },
    },
    {
      type: 'sb-item',
      htmlElementType: 'link',
      name: 'Dashboard',
      iconClasses: 'fas fa-chart-line',
      action: {
        clicked: () => {},
      },
    },
    {
      type: 'sb-item',
      htmlElementType: 'link',
      name: 'Molding Cost',
      iconClasses: 'fas fa-search-dollar',
      action: {
        clicked: () => {},
      },
    },
  ];

  const sidebar = sidebarItems.map((item, idx) => {
    switch (item.type) {
      case 'sb-item':
      case 'sb-header':
        return (
          <SidebarItem
            key={item.name}
            htmlElement={item.htmlElementType}
            name={item.name}
            classes={item.iconClasses}
            showDropdown={item.action.showDropdown}
            clicked={item.action.clicked}
            toggleSidebar={props.toggle}
          />
        );
      case 'sb-dropdown':
        return (
          <Dropdown
            menuType={item.menuType}
            key={item.name}
            htmlElement={item.htmlElementType}
            name={item.name}
            classes={item.iconClasses}
            showDropdown={item.action.showDropdown}
            toggle={item.action.toggleDropdown}
            dropdownMenu={item.dropdownConfig}
            stackingContext={idx}
          />
        );
      default:
        return null;
    }
  });

  return (
    <div className={`sidebar ${props.show ? 'open' : 'close'}`}>
      <ul className="sidebar-list">{sidebar}</ul>
    </div>
  );
};

export default Sidebar;

let materialDropdownMenu = [
  { name: 'Select Material', type: 'material-select' },
  { name: 'Create Material', type: 'material-create' },
];

let moldDropdownMenu = [
  { name: 'Nozze', type: 'nozzle' },
  { name: 'Sprue', type: 'sprue' },
  { name: 'Runners', type: 'runner' },
  { name: 'Gates', type: 'gate' },
  { name: 'Cavity', type: 'cavity' },
];
