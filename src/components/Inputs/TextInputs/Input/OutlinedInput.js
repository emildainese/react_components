import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './Outlined.module.scss';

const OutlinedInput = (props) => {
  const [value, setValue] = useState('');

  const inputChangeHandler = (e) => {
    props.onChange(e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className={classes.FormField}>
      <div className={classes.FormFieldControl}>
        <input
          className={classes.FormFieldInput}
          type="text"
          placeholder=" "
          value={value}
          onChange={inputChangeHandler}
        />
        <label htmlFor={props.label} className={classes.FormFieldLabel}>
          {props.label}
        </label>
      </div>
    </div>
  );
};

OutlinedInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default OutlinedInput;
