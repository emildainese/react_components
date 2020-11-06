import React from 'react';
import PropTypes from 'prop-types';
import classes from './Selected.module.scss';

const Selected = (props) => {
  const toggleMenu = (e) => {
    if (!e.target.classList.contains(`${classes.Times}`)) {
      props.toggleActive();
    }
  };

  const reset = () => {
    props.setActive(false);
    props.reset();
  };

  return (
    <div
      className={`${classes.Selected} ${props.active ? classes.Active : ''}`}
      onClick={toggleMenu}
    >
      {props.value ? props.value : props.placeholder}
      {props.clearable && (
        <i className={`fas fa-times ${classes.Times}`} onClick={reset}></i>
      )}
      <i
        className={`fa fa-caret-down ${classes.Arrow} ${
          props.active ? classes.Active : ''
        }`}
        style={{ color: `${props.arrowColor}` }}
      ></i>
    </div>
  );
};

Selected.propTypes = {
  reset: PropTypes.func,
  toggleActive: PropTypes.func.isRequired,
  clearable: PropTypes.bool,
  setActive: PropTypes.func,
  active: PropTypes.bool.isRequired,
  arrowColor: PropTypes.string,
  value: PropTypes.string,
};

export default Selected;
