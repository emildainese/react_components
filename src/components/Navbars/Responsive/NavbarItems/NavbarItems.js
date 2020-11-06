import React from 'react';
import PropTypes from 'prop-types';

import classes from './NavbarItems.module.scss';

const NavbarItems = (props) => {
  return (
    <ul className={classes.NavbarList} style={{ ...mediaQuery(props) }}>
      {props.children}
    </ul>
  );
};

NavbarItems.propTypes = {
  navbarItems: PropTypes.array,
};

export default NavbarItems;

const mediaQuery = (props) => {
  if (props.width < props.breakPoint) {
    return {
      flexDirection: 'column',
    };
  }
  return;
};
