import React, { useState, useRef } from 'react';

import { useWindowSize } from '../../../hooks/windowSize';
import Header from './Header/Header';
import Logo from '../Logo/Logo';
import NavbarItems from './NavbarItems/NavbarItems';
import NavbarItem from './NavbarItem/NavbarItem';
import MenuToggle from './MenuToggle/MenuToggle';
import ResponsiveNav from './ResponsiveNav/ResponsiveNav';

const Navbar = React.memo((props) => {
  const [open, setOpen] = useState(false);
  const navRef = useRef();
  const { width } = useWindowSize(navRef, 991);

  const toggleSidebar = (open) => {
    setOpen(!open);
  };

  return (
    <Header height={props.height}>
      <Logo logo="Logo" />
      <ResponsiveNav
        width={width}
        height={props.height}
        breakPoint={991}
        open={open}
      >
        <NavbarItems width={width} breakPoint={991}>
          {navbar.map((item, idx) => (
            <NavbarItem
              key={idx}
              link={item.link}
              to={item.to}
              width={width}
              breakPoint={991}
              height={props.height}
            />
          ))}
        </NavbarItems>
      </ResponsiveNav>
      <MenuToggle
        toggleSidebar={toggleSidebar}
        open={open}
        width={width}
        breakPoint={991}
      />
    </Header>
  );
});

export default Navbar;

const navbar = [
  { link: 'Home', to: '/home' },
  { link: 'About', to: '/about' },
  { link: 'Team', to: '/team' },
  { link: 'Service', to: '/service' },
];
