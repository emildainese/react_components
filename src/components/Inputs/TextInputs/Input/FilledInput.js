import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './Filled.module.scss';

const FilledInput = (props) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');

  let classNames = [classes.FormField, classes.Filled];

  const inputChangeHandler = (e) => {
    props.onChange(e.target.value);
    setValue(e.target.value);
    setActive(true);
  };

  if (active) {
    classNames = [...classNames, classes.Active];
  } else {
    classNames = classNames.filter((className) => className !== classes.Active);
    classNames =
      value === ''
        ? classNames.filter((className) => className !== classes.Filled)
        : [...classNames, classes.Filled];
  }

  return (
    <div className={classNames.join(' ')}>
      <div className={classes.FormFieldControl}>
        <label
          htmlFor={props.label.toLowerCase()}
          className={classes.FormFieldLabel}
        >
          {props.label}
        </label>
        <input
          type="text"
          className={classes.FormFieldInput}
          value={value}
          onChange={inputChangeHandler}
          onBlur={() => setActive(false)}
          onFocus={() => setActive(true)}
        />
        <span
          className={classes.FillColor}
          style={{
            backgroundColor: `${props.fillColor ? props.fillColor : '#eee'}`,
          }}
        ></span>
      </div>
    </div>
  );
};

FilledInput.propsType = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  fillColor: PropTypes.string,
};

export default FilledInput;
