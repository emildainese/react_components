import React from 'react';
import classes from './Nav.module.scss';

const ResponsiveNav = (props) => {
  const computedStyle = {
    top: `${props.width >= props.breakPoint ? 0 : `${props.height}rem`}`,
    height: `${
      props.width >= props.breakPoint
        ? `${props.height}rem`
        : `calc(100vh - ${props.height}rem)`
    }`,
  };

  return (
    <nav
      className={`${classes.Navbar} ${props.open ? classes.Active : ''}`}
      ref={props.navRef}
      style={{ ...mediaQuery(props) }}
    >
      {props.children}
    </nav>
  );
};

export default ResponsiveNav;

//Bug
const mediaQuery = (props) => {
  if (props.width < props.breakPoint) {
    return {
      position: 'absolute',
      top: `${props.height}rem`,
      height: `${`calc(100vh - ${props.height}rem)`}`,
      left: '-40%',
      width: '40%',
      transition: 'background-color .5s, transform .5s, top 0.0s',
      backgroundColor: '#333',
    };
  } else if (props.width >= props.breakPoint) {
    return {
      top: 0,
      height: `${props.height}rem`,
    };
  }
};
