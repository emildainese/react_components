import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './Basic.module.scss';

const BasicInput = (props) => {
  const [value, setValue] = useState('');

  const inputChangeHandler = (e) => {
    setValue(e.target.value);
    props.onChange(e.target.value);
  };

  return (
    <div className={classes.FormField}>
      <div className={classes.FormFieldControl}>
        <input
          type="text"
          className={`${classes.TextInput} ${value ? classes.HasValue : ''}`}
          value={value}
          onChange={inputChangeHandler}
        />
        <label
          className={classes.Label}
          htmlFor={props.label}
          style={{ ...props.labelStyle }}
        >
          {props.label}
        </label>
      </div>
    </div>
  );
};

BasicInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
};

export default BasicInput;
