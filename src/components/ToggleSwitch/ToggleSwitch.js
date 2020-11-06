import React from 'react';
import PropTypes from 'prop-types';

import classes from './ToggleSwitch.module.scss';

const ToggleSwitch = (props) => {
  return (
    <label className={classes.Switch}>
      <input
        type="checkbox"
        onChange={(e) => props.onChange(e.target.checked)}
      />
      <span className={`${classes.Slider} ${classes.Round}`}></span>
    </label>
  );
};

ToggleSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ToggleSwitch;
