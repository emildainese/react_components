import React from 'react';
import PropTypes from 'prop-types';
import classes from './Checkbox.module.scss';

const Checkbox = (props) => {
  return (
    <div className={classes.FormField}>
      <div className={classes.FormFieldControl}>
        <label className={classes.Checkbox} htmlFor={props.label.toLowerCase()}>
          {props.label}
          <input
            type="checkbox"
            id={props.label.toLowerCase()}
            value={props.label.toLowerCase()}
            onChange={(e) => props.onChange(e.target.checked)}
          />
          <span className={classes.Checkmark}></span>
          {props.ripple && <span className={classes.Ripple}></span>}
          {props.hover && <span className={classes.Hover}></span>}
        </label>
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  ripple: PropTypes.bool,
  hover: PropTypes.bool,
};

export default Checkbox;
