import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './Radio.module.scss';

const Radio = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={classes.FormField}>
      <div className={classes.FormFieldControl}>
        <label className={classes.Radio} htmlFor={props.label.toLowerCase()}>
          <input
            type="radio"
            id={props.label.toLowerCase()}
            name={props.label.toLowerCase()}
            value={props.label.toLowerCase()}
            checked={checked}
            onClick={() => setChecked(!checked)}
            onChange={(e) => props.onChange(e.target.value)}
          />
          {props.label}
          <span className={classes.Checkmark}></span>
          {props.ripple && <span className={classes.Ripple}></span>}
          {props.hover && <span className={classes.Hover}></span>}
        </label>
      </div>
    </div>
  );
};

Radio.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  ripple: PropTypes.bool,
  hover: PropTypes.bool,
};

export default Radio;
