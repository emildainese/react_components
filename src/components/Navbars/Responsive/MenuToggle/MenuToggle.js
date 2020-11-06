import React from 'react';
import PropTypes from 'prop-types';
import Hamburger from '../../Hamburger/Hamburger';
import classes from './MenuToggle.module.scss';

const MenuToggle = (props) => {
  return (
    <div
      className={`${classes.MenuToggle} ${props.open ? classes.Active : ''}`}
      style={{ ...mediaQuery(props) }}
    >
      <Hamburger
        type="spin"
        style={{ color: 'white' }}
        onClick={props.toggleSidebar}
      />
    </div>
  );
};

MenuToggle.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default MenuToggle;

const mediaQuery = (props) => {
  if (props.width < props.breakPoint) {
    return {
      display: 'block',
    };
  }
  return;
};
