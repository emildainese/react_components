import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './Textarea.module.scss';

const Textarea = (props) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');

  let classNames = [classes.FormField, classes.Filled];

  const inputChangeHandler = (e) => {
    setValue(e.target.value);
    props.onChange(value);
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
        <label htmlFor={props.label.toLowerCase()} className={classes.Label}>
          {props.label}
        </label>
        <textarea
          className={classes.Textarea}
          id={props.label.toLowerCase()}
          value={value}
          onBlur={() => setActive(false)}
          onFocus={() => setActive(true)}
          onChange={inputChangeHandler}
        ></textarea>
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

Textarea.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  fillColor: PropTypes.string,
};

export default Textarea;
