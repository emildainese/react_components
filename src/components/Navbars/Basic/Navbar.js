import React from 'react';
import Logo from '../Logo/Logo';
import Hamburger from '../Hamburger/Hamburger';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.scss';

const navLinks = [
  { link: 'Home', to: '/home' },
  { link: 'Register', to: '/register' },
  { link: 'Login', to: '/login' },
];

const Navbar = (props) => {
  return (
    <Nav height={props.height} show={props.show}>
      <Hamburger type="spin" color="#fafafa" onClick={props.toggle} />
      <Logo logo="Logos" />
      <MainNavigation navLinks={navLinks} />
    </Nav>
  );
};

export default Navbar;

const Nav = (props) => {
  return (
    <header
      className={`${classes.Navbar} ${props.show ? classes.ToggleSidebar : ''}`}
    >
      <nav
        className={classes.Nav}
        style={{ height: `${props.height ? props.height : '3.5rem'}` }}
      >
        {props.children}
      </nav>
    </header>
  );
};

const MainNavigation = (props) => {
  return (
    <div className={classes.Navigation}>
      {props.navLinks.map((link, idx) => (
        <NavLink
          key={idx}
          exact
          to={link.to}
          className={classes.NavLink}
          activeClassName={classes.Active}
        >
          {link.link}
        </NavLink>
      ))}
    </div>
  );
};
