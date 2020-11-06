import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './NavbarItem.module.scss';

const NavbarItem = (props) => {
  return (
    <li
      className={`${classes.NavbarListItem} `}
      style={{
        height: `${
          props.width >= props.breakPoint ? '100%' : `${props.height}rem`
        }`,
      }}
    >
      <NavLink
        to={props.to}
        activeClassName={classes.Active}
        style={{ ...mediaQuery(props) }}
      >
        {props.link}
      </NavLink>
    </li>
  );
};

NavbarItem.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  to: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default NavbarItem;

const mediaQuery = (props) => {
  if (props.width < props.breakPoint) {
    return {
      borderBottom: '1px solid rgba(0, 0, 0, .2)',
    };
  }
};
